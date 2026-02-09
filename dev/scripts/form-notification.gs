/**
 * Google Apps Script - Form Submission Email Notification
 *
 * SETUP INSTRUCTIONS:
 * 1. Open the Google Sheet that SheetMonkey writes to
 * 2. Go to Extensions > Apps Script
 * 3. Delete any existing code and paste this entire script
 * 4. Update the NOTIFICATION_RULES below with actual email addresses
 * 5. Click the disk icon to save
 * 6. Run the "installTrigger" function once (Run > Run function > installTrigger)
 *    - It will ask for permissions - click "Allow"
 * 7. That's it! New form submissions will trigger email notifications automatically
 *
 * HOW IT WORKS:
 * - When a new row is added to the sheet, the onFormSubmit trigger fires
 * - The script reads the "Form Type" column to determine which form was submitted
 * - Based on the form type, it sends an email to the configured recipients
 * - Each form type can notify different people
 *
 * NOTES:
 * - SheetMonkey adds rows to the sheet, which triggers the onEdit event
 * - The "Form Type" hidden field distinguishes: "Contact", "Membership Application", "Elmer Request"
 * - Gmail sending limits: ~100/day for free accounts, ~1500/day for Workspace
 */

// ============================================================================
// CONFIGURATION - Update these with actual email addresses
// ============================================================================

var NOTIFICATION_RULES = {
  // Contact form submissions
  "Contact": {
    recipients: [
      "rustyutahn@yahoo.com"         // Club contact email
      // Add more: "another@email.com"
    ],
    subject: "RARS Website: New Contact Form Submission"
  },

  // Membership application submissions
  "Membership Application": {
    recipients: [
      "rustyutahn@yahoo.com"         // Club contact
      // "secretary@email.com"        // Secretary gets membership apps
    ],
    subject: "RARS Website: New Membership Application"
  },

  // Elmer request submissions
  "Elmer Request": {
    recipients: [
      "rustyutahn@yahoo.com"         // Club contact
      // "elmer-coordinator@email.com" // Elmer program coordinator
    ],
    subject: "RARS Website: New Elmer Request"
  },

  // Fallback for any form without a recognized Form Type
  "_default": {
    recipients: [
      "rustyutahn@yahoo.com"
    ],
    subject: "RARS Website: New Form Submission"
  }
};

// From name shown in the notification emails
var FROM_NAME = "RARS Website";

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

  // Install a new onChange trigger
  ScriptApp.newTrigger("onSheetChange")
    .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
    .onChange()
    .create();

  Logger.log("Trigger installed successfully.");
}

// ============================================================================
// MAIN HANDLER - Fires when the sheet changes
// ============================================================================

function onSheetChange(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();

    // Ignore if sheet is empty or only has headers
    if (lastRow < 2) return;

    // Get the header row and the last (newest) row
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var rowData = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Build a key-value object from the row
    var submission = {};
    for (var i = 0; i < headers.length; i++) {
      var header = headers[i].toString().trim();
      var value = rowData[i] !== undefined ? rowData[i].toString().trim() : "";
      if (header) {
        submission[header] = value;
      }
    }

    // Skip if this row looks empty (no name or email)
    if (!submission["Name"] && !submission["Email"]) return;

    // Determine the form type
    var formType = submission["Form Type"] || "_default";

    // Look up notification rules
    var rules = NOTIFICATION_RULES[formType] || NOTIFICATION_RULES["_default"];

    // Build the email body
    var body = buildEmailBody(formType, submission);
    var htmlBody = buildHtmlEmailBody(formType, submission);

    // Send to each recipient
    for (var j = 0; j < rules.recipients.length; j++) {
      var recipient = rules.recipients[j].trim();
      if (recipient) {
        MailApp.sendEmail({
          to: recipient,
          subject: rules.subject,
          body: body,
          htmlBody: htmlBody,
          name: FROM_NAME
        });
      }
    }

    Logger.log("Notification sent for " + formType + " to " + rules.recipients.join(", "));

    // Send Discord notification if webhook URL is configured
    sendDiscordNotification(formType, submission);

  } catch (error) {
    Logger.log("Error in onSheetChange: " + error.toString());
  }
}

// ============================================================================
// EMAIL BODY BUILDERS
// ============================================================================

function buildEmailBody(formType, submission) {
  var lines = [];
  lines.push("New " + formType + " submission from the RARS website:");
  lines.push("");
  lines.push("----------------------------------------");

  // List all fields
  for (var key in submission) {
    if (submission[key]) {
      lines.push(key + ": " + submission[key]);
    }
  }

  lines.push("----------------------------------------");
  lines.push("");
  lines.push("This is an automated notification from www.rowanars.net");

  return lines.join("\n");
}

function buildHtmlEmailBody(formType, submission) {
  var html = [];
  html.push("<div style='font-family: Arial, sans-serif; max-width: 600px;'>");
  html.push("<h2 style='color: #1A478A; border-bottom: 2px solid #E87A1E; padding-bottom: 8px;'>");
  html.push("New " + formType + "</h2>");
  html.push("<table style='width: 100%; border-collapse: collapse; margin-top: 16px;'>");

  for (var key in submission) {
    if (submission[key]) {
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
  html.push("<p style='margin-top: 20px; font-size: 12px; color: #999;'>");
  html.push("Automated notification from <a href='https://www.rowanars.net'>www.rowanars.net</a>");
  html.push("</p>");
  html.push("</div>");

  return html.join("");
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ============================================================================
// OPTIONAL: Discord Webhook Notification
// ============================================================================

/**
 * To also send notifications to a Discord channel:
 * 1. In Discord, go to Server Settings > Integrations > Webhooks
 * 2. Create a new webhook for the channel you want notifications in
 * 3. Copy the webhook URL
 * 4. Uncomment and update the DISCORD_WEBHOOK_URL below
 * 5. Uncomment the sendDiscordNotification() call in onSheetChange()
 *
 * Or, run this as a standalone function by calling sendToDiscord() manually.
 */

var DISCORD_WEBHOOK_URL = ""; // TODO: Paste your Discord webhook URL here

function sendDiscordNotification(formType, submission) {
  if (typeof DISCORD_WEBHOOK_URL === "undefined" || !DISCORD_WEBHOOK_URL) {
    Logger.log("Discord webhook URL not configured, skipping.");
    return;
  }

  var fields = [];
  for (var key in submission) {
    if (submission[key] && key !== "Form Type" && key !== "Submitted") {
      fields.push({
        name: key,
        value: submission[key].substring(0, 1024), // Discord field limit
        inline: submission[key].length < 50
      });
    }
  }

  var payload = {
    embeds: [{
      title: "New " + formType,
      color: 1722250, // RARS blue (#1A478A)
      fields: fields,
      footer: {
        text: "www.rowanars.net"
      },
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
