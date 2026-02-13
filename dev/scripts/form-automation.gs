/**
 * Google Apps Script - RARS Form Automation
 *
 * Install this script on the MASTER Google Sheet (the one SheetMonkey writes to).
 *
 * When a new form submission arrives, this script:
 *   1. Reads the "Form Type" to determine which form was submitted
 *   2. Copies the row to the appropriate separate Google Sheet
 *   3. Reads the "Email" tab in that sheet to get the recipient list
 *   4. Sends email notifications to those recipients
 *   5. Generates a filled PDF for membership applications
 *   6. Optionally posts to Discord
 *
 * SETUP: See form-automation-setup.md for full instructions.
 */

// ============================================================================
// CONFIGURATION
// ============================================================================

// Each form type maps to a separate Google Sheet by spreadsheet ID.
// Each of these spreadsheets must have a tab called "Email" with
// email addresses in column A, starting at row 2 (row 1 is the header).
var FORM_ROUTING = {
  "Contact": {
    spreadsheetId: "",  // TODO: Paste your Contact Us spreadsheet ID here
    subject: "RARS Website: New Contact Form Submission",
    generatePdf: false
  },

  "Membership Application": {
    spreadsheetId: "",  // TODO: Paste your Membership spreadsheet ID here
    subject: "RARS Website: New Membership Application",
    generatePdf: true
  },

  "Elmer Request": {
    spreadsheetId: "",  // TODO: Paste your Elmer Request spreadsheet ID here
    subject: "RARS Website: New Elmer Request",
    generatePdf: false
  }
};

// Google Doc template ID for membership application PDF
// Create a Google Doc template with {{placeholders}} - see setup guide
var MEMBERSHIP_TEMPLATE_ID = "";  // TODO: Paste your Google Doc template ID here

// Google Drive folder ID to save generated PDFs
var PDF_FOLDER_ID = "";           // TODO: Paste your Drive folder ID here

// From name shown in notification emails
var FROM_NAME = "RARS Website";

// Discord webhook URL (optional - leave empty to disable)
var DISCORD_WEBHOOK_URL = "";

// Name of the tab in the master sheet where SheetMonkey writes submissions
var MASTER_SHEET_NAME = "Sheet1";

// Name of the tab in each destination spreadsheet that holds email addresses
var EMAIL_TAB_NAME = "Email";

// ============================================================================
// TRIGGER SETUP - Run this function ONCE to install the trigger
// ============================================================================

function installTrigger() {
  // Remove any existing triggers to avoid duplicates
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === "onSheetChange") {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger("onSheetChange")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onChange()
    .create();

  Logger.log("Trigger installed successfully.");
}

// ============================================================================
// MAIN HANDLER
// ============================================================================

function onSheetChange(e) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var masterSheet = ss.getSheetByName(MASTER_SHEET_NAME);

    if (!masterSheet) {
      Logger.log("Master sheet '" + MASTER_SHEET_NAME + "' not found.");
      return;
    }

    var lastRow = masterSheet.getLastRow();
    if (lastRow < 2) return;

    // Read headers and the newest row
    var lastCol = masterSheet.getLastColumn();
    var headers = masterSheet.getRange(1, 1, 1, lastCol).getValues()[0];

    // Find or create the "Notified" column
    var notifiedCol = headers.indexOf("Notified") + 1; // 1-indexed
    if (notifiedCol === 0) {
      // Column doesn't exist yet — add it
      notifiedCol = lastCol + 1;
      masterSheet.getRange(1, notifiedCol).setValue("Notified").setFontWeight("bold");
      headers.push("Notified");
    }

    // Check if this row was already notified
    var notifiedValue = masterSheet.getRange(lastRow, notifiedCol).getValue().toString().trim().toUpperCase();
    if (notifiedValue === "TRUE" || notifiedValue === "YES") {
      Logger.log("Row " + lastRow + " already notified. Skipping.");
      return;
    }

    var rowData = masterSheet.getRange(lastRow, 1, 1, lastCol).getValues()[0];

    // Build a key-value object from the row
    var submission = {};
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i].toString().trim();
      var value = rowData[i] !== undefined ? rowData[i].toString().trim() : "";
      if (header && header !== "Notified") {
        submission[header] = value;
      }
    }

    // Skip if this row looks empty
    if (!submission["Name"] && !submission["Email"]) return;

    // Determine the form type
    var formType = submission["Form Type"] || "";
    var routing = FORM_ROUTING[formType];

    if (!routing) {
      Logger.log("Unknown form type: '" + formType + "'. Skipping.");
      return;
    }

    // --- Step 1: Copy row to the destination spreadsheet ---
    var destLastRow = copyToDestinationSheet(routing.spreadsheetId, headers, rowData);

    // --- Step 2: Read recipients from the "Email" tab in the destination sheet ---
    var recipients = getRecipientsFromSheet(routing.spreadsheetId);

    if (recipients.length === 0) {
      Logger.log("No recipients found in Email tab for " + formType + ". Skipping notifications.");
      return;
    }

    // --- Step 3: Generate PDF (membership only) ---
    var pdfBlob = null;
    if (routing.generatePdf && MEMBERSHIP_TEMPLATE_ID) {
      pdfBlob = generateMembershipPdf(submission);
    }

    // --- Step 4: Send email notifications ---
    var sheetUrl = "https://docs.google.com/spreadsheets/d/" + routing.spreadsheetId;
    sendEmailNotifications(recipients, routing.subject, formType, submission, pdfBlob, sheetUrl);

    // --- Step 5: Send Discord notification (optional) ---
    sendDiscordNotification(formType, submission);

    // --- Step 6: Mark as notified on both sheets ---
    masterSheet.getRange(lastRow, notifiedCol).setValue("TRUE");
    markDestinationNotified(routing.spreadsheetId, destLastRow);

    Logger.log("Processed " + formType + " from " + (submission["Name"] || "unknown") +
               " → notified: " + recipients.join(", "));

  } catch (error) {
    Logger.log("Error in onSheetChange: " + error.toString());
  }
}

// ============================================================================
// SHEET ROUTING
// ============================================================================

/**
 * Copies a submission row to the first tab of the destination spreadsheet.
 * Creates a header row if the sheet is empty.
 * Returns the row number of the newly added row.
 */
function copyToDestinationSheet(spreadsheetId, headers, rowData) {
  var destSS = SpreadsheetApp.openById(spreadsheetId);
  var destSheet = destSS.getSheets()[0]; // First tab (the data tab, not "Email")

  // If the sheet is empty, add headers first
  if (destSheet.getLastRow() === 0) {
    // Include "Notified" column in headers
    var destHeaders = headers.slice();
    if (destHeaders.indexOf("Notified") === -1) {
      destHeaders.push("Notified");
    }
    destSheet.appendRow(destHeaders);
    destSheet.getRange(1, 1, 1, destHeaders.length).setFontWeight("bold");
  }

  destSheet.appendRow(rowData);
  var newRow = destSheet.getLastRow();
  Logger.log("Copied submission to spreadsheet: " + spreadsheetId + " (row " + newRow + ")");
  return newRow;
}

/**
 * Marks a row as notified in the destination spreadsheet.
 * Finds the "Notified" column by header name.
 */
function markDestinationNotified(spreadsheetId, row) {
  var destSS = SpreadsheetApp.openById(spreadsheetId);
  var destSheet = destSS.getSheets()[0];
  var headers = destSheet.getRange(1, 1, 1, destSheet.getLastColumn()).getValues()[0];

  var notifiedCol = headers.indexOf("Notified") + 1;
  if (notifiedCol === 0) {
    // Add the column if it doesn't exist
    notifiedCol = destSheet.getLastColumn() + 1;
    destSheet.getRange(1, notifiedCol).setValue("Notified").setFontWeight("bold");
  }

  destSheet.getRange(row, notifiedCol).setValue("TRUE");
}

// ============================================================================
// RECIPIENT LOOKUP
// ============================================================================

/**
 * Reads email addresses from the "Email" tab in a destination spreadsheet.
 * Expects email addresses in column A, rows 2 through the last row.
 * Returns an array of non-empty email strings.
 */
function getRecipientsFromSheet(spreadsheetId) {
  var destSS = SpreadsheetApp.openById(spreadsheetId);
  var emailSheet = destSS.getSheetByName(EMAIL_TAB_NAME);

  if (!emailSheet) {
    Logger.log("No '" + EMAIL_TAB_NAME + "' tab found in spreadsheet: " + spreadsheetId);
    return [];
  }

  var lastRow = emailSheet.getLastRow();
  if (lastRow < 2) return []; // Only header or empty

  // Read column A from row 2 to the last row
  var emailRange = emailSheet.getRange(2, 1, lastRow - 1, 1).getValues();
  var recipients = [];

  for (var i = 0; i < emailRange.length; i++) {
    var email = emailRange[i][0].toString().trim();
    if (email && email.indexOf("@") > -1) {
      recipients.push(email);
    }
  }

  return recipients;
}

// ============================================================================
// PDF GENERATION (Membership Applications)
// ============================================================================

/**
 * Fills a Google Doc template with submission data and converts to PDF.
 * Returns the PDF as a Blob (for email attachment).
 * Also saves a copy to the configured Google Drive folder.
 *
 * Template placeholders: {{Name}}, {{Callsign}}, {{Email}}, etc.
 */
function generateMembershipPdf(submission) {
  try {
    var templateFile = DriveApp.getFileById(MEMBERSHIP_TEMPLATE_ID);
    var callsign = submission["Callsign"] || (submission["Name"] || "Unknown").replace(/[^a-zA-Z0-9]/g, "_");
    var dateStamp = getDayMonthYear(); // DD-MM-YYYY
    var copyName = callsign + "_" + dateStamp + "_Application";
    var copyFile = templateFile.makeCopy(copyName);
    var copyDoc = DocumentApp.openById(copyFile.getId());
    var body = copyDoc.getBody();

    // Replace all placeholders with submission data
    var placeholders = {
      "{{Name}}": submission["Name"] || "",
      "{{Callsign}}": submission["Callsign"] || "N/A",
      "{{License Class}}": submission["License Class"] || "N/A",
      "{{ARRL Member}}": submission["ARRL Member"] || "N/A",
      "{{Email}}": submission["Email"] || "",
      "{{Street Address}}": submission["Street Address"] || "N/A",
      "{{City State Zip}}": submission["City State Zip"] || "N/A",
      "{{Home Phone}}": submission["Home Phone"] || "N/A",
      "{{Cell Phone}}": submission["Cell Phone"] || "N/A",
      "{{Radio History}}": submission["Radio History"] || "",
      "{{Operating Habits}}": submission["Operating Habits"] || "N/A",
      "{{Frequencies and Modes}}": submission["Frequencies and Modes"] || "N/A",
      "{{Emergency Capabilities}}": submission["Emergency Capabilities"] || "N/A",
      "{{Goals}}": submission["Goals"] || "N/A",
      "{{Planned Activities}}": submission["Planned Activities"] || "N/A",
      "{{Date}}": submission["Submitted"] || new Date().toLocaleDateString()
    };

    for (var placeholder in placeholders) {
      body.replaceText(escapeRegex(placeholder), placeholders[placeholder]);
    }

    copyDoc.saveAndClose();

    // Convert the filled doc to PDF (same naming convention as the doc)
    var pdfBlob = DriveApp.getFileById(copyFile.getId()).getAs("application/pdf");
    pdfBlob.setName(copyName + ".pdf");

    // Save PDF to Drive folder
    if (PDF_FOLDER_ID) {
      var folder = DriveApp.getFolderById(PDF_FOLDER_ID);
      folder.createFile(pdfBlob);
      Logger.log("PDF saved to Drive: " + pdfFileName);
    }

    // Delete the temporary Google Doc copy
    DriveApp.getFileById(copyFile.getId()).setTrashed(true);

    return pdfBlob;

  } catch (error) {
    Logger.log("Error generating PDF: " + error.toString());
    return null;
  }
}

// ============================================================================
// EMAIL NOTIFICATIONS
// ============================================================================

/**
 * Sends formatted email notifications to the recipients list.
 * Attaches PDF if one was generated.
 */
function sendEmailNotifications(recipients, subject, formType, submission, pdfBlob, sheetUrl) {
  var body = buildPlainTextBody(formType, submission, sheetUrl);
  var htmlBody = buildHtmlBody(formType, submission, sheetUrl);

  for (var j = 0; j < recipients.length; j++) {
    var recipient = recipients[j];

    var emailOptions = {
      to: recipient,
      subject: subject,
      body: body,
      htmlBody: htmlBody,
      name: FROM_NAME
    };

    if (pdfBlob) {
      emailOptions.attachments = [pdfBlob];
    }

    MailApp.sendEmail(emailOptions);
  }

  Logger.log("Email sent for " + formType + " to " + recipients.join(", "));
}

function buildPlainTextBody(formType, submission, sheetUrl) {
  var lines = [];
  lines.push("New " + formType + " submission from the RARS website:");
  lines.push("");
  lines.push("----------------------------------------");

  for (var key in submission) {
    if (submission[key] && key !== "Form Type") {
      lines.push(key + ": " + submission[key]);
    }
  }

  lines.push("----------------------------------------");
  lines.push("");

  if (formType === "Membership Application") {
    lines.push("A filled membership application PDF is attached to this email.");
    lines.push("");
  }

  lines.push("View all submissions: " + sheetUrl);
  lines.push("");
  lines.push("This is an automated notification from www.rowanars.net");

  return lines.join("\n");
}

function buildHtmlBody(formType, submission, sheetUrl) {
  var html = [];
  html.push("<div style='font-family: Arial, sans-serif; max-width: 600px;'>");
  html.push("<h2 style='color: #1A478A; border-bottom: 2px solid #E87A1E; padding-bottom: 8px;'>");
  html.push("New " + formType + "</h2>");

  if (formType === "Membership Application") {
    html.push("<p style='background: #f0f7ff; padding: 10px; border-left: 4px solid #1A478A; margin: 16px 0;'>");
    html.push("A filled membership application PDF is attached to this email.");
    html.push("</p>");
  }

  html.push("<table style='width: 100%; border-collapse: collapse; margin-top: 16px;'>");

  for (var key in submission) {
    if (submission[key] && key !== "Form Type") {
      html.push("<tr>");
      html.push("<td style='padding: 8px 12px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top; width: 35%; color: #333;'>");
      html.push(escapeHtml(key));
      html.push("</td>");
      html.push("<td style='padding: 8px 12px; border-bottom: 1px solid #eee; color: #555;'>");
      html.push(escapeHtml(submission[key]).replace(/\n/g, "<br>"));
      html.push("</td>");
      html.push("</tr>");
    }
  }

  html.push("</table>");
  html.push("<p style='margin-top: 16px;'>");
  html.push("<a href='" + sheetUrl + "' style='display: inline-block; padding: 8px 16px; background: #1A478A; color: #fff; text-decoration: none; border-radius: 4px;'>View All Submissions</a>");
  html.push("</p>");
  html.push("<p style='margin-top: 20px; font-size: 12px; color: #999;'>");
  html.push("Automated notification from <a href='https://www.rowanars.net'>www.rowanars.net</a>");
  html.push("</p>");
  html.push("</div>");

  return html.join("");
}

// ============================================================================
// DISCORD NOTIFICATIONS (Optional)
// ============================================================================

function sendDiscordNotification(formType, submission) {
  if (!DISCORD_WEBHOOK_URL) return;

  var fields = [];
  for (var key in submission) {
    if (submission[key] && key !== "Form Type" && key !== "Submitted") {
      fields.push({
        name: key,
        value: submission[key].substring(0, 1024),
        inline: submission[key].length < 50
      });
    }
  }

  var payload = {
    embeds: [{
      title: "New " + formType,
      color: 1722250,
      fields: fields,
      footer: { text: "www.rowanars.net" },
      timestamp: new Date().toISOString()
    }]
  };

  var options = {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(DISCORD_WEBHOOK_URL, options);
  Logger.log("Discord notification sent. Response: " + response.getResponseCode());
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getDateStamp() {
  var d = new Date();
  var month = ("0" + (d.getMonth() + 1)).slice(-2);
  var day = ("0" + d.getDate()).slice(-2);
  return d.getFullYear() + "-" + month + "-" + day;
}

function getDayMonthYear() {
  var d = new Date();
  var day = ("0" + d.getDate()).slice(-2);
  var month = ("0" + (d.getMonth() + 1)).slice(-2);
  return day + "-" + month + "-" + d.getFullYear();
}
