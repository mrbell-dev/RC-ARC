# Form Automation Setup Guide

This guide walks you through setting up the Google Apps Script that:

1. **Routes** form submissions to separate Google Sheets by form type
2. **Sends email notifications** to recipients listed in each sheet's "Email" tab
3. **Generates a filled PDF** for membership applications and saves it to Google Drive
4. **Prevents duplicate notifications** using a "Notified" column
5. **Optionally posts** to a Discord channel

## Overview

```
Website Form → SheetMonkey → Master Sheet → Apps Script:
                                              ├── Copies row to destination spreadsheet
                                              ├── Reads "Email" tab for recipients
                                              ├── Sends email notification
                                              ├── Generates PDF (membership only)
                                              ├── Posts to Discord (optional)
                                              └── Marks row as "Notified" = TRUE
```

## Prerequisites

- The Google Sheet that SheetMonkey writes to (the "master sheet")
- Three separate Google Sheets (one each for Contact, Membership, Elmer)
- A Google account with access to Google Drive and Google Docs

---

## Step 1: Set Up Destination Spreadsheets

You need three separate Google Sheets — one for each form type. Each sheet needs an **"Email" tab** that lists who should be notified.

### For each spreadsheet (Contact, Membership, Elmer):

1. Open the spreadsheet
2. The **first tab** is where submission data will be copied (can be empty — headers are created automatically)
3. Create a second tab and name it exactly **Email**
4. In the "Email" tab:
   - **Row 1 (header):** Type `Email` in cell A1
   - **Row 2+:** Add one email address per row in column A

Example "Email" tab:

| A |
|---|
| Email |
| president@example.com |
| secretary@example.com |

### Get the Spreadsheet IDs

For each of your three spreadsheets:

1. Open the spreadsheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/XXXXXXXXXX/edit`
3. Copy the long string between `/d/` and `/edit` — that's the **Spreadsheet ID**

You'll need all three IDs for Step 4.

---

## Step 2: Set Up the Google Doc Template (Membership PDF)

The script uses a Google Doc as a template for membership application PDFs. It replaces `{{placeholder}}` tags with the applicant's data, then converts it to PDF.

### Create the Template

1. Open the Google Doc you created for the membership application
2. Wherever the form has a blank line, replace it with the matching placeholder tag

Here are the placeholders to use (these match the web form field names exactly):

| PDF Form Field | Placeholder Tag |
|---|---|
| Name & Call | `{{Name}}` `{{Callsign}}` |
| Class | `{{License Class}}` |
| ARRL Member? | `{{ARRL Member}}` |
| Street Address | `{{Street Address}}` |
| City, State, Zip | `{{City State Zip}}` |
| Phone: Home | `{{Home Phone}}` |
| Cell | `{{Cell Phone}}` |
| Email | `{{Email}}` |
| Short history of Amateur Radio life | `{{Radio History}}` |
| General operating habits | `{{Operating Habits}}` |
| Frequencies/modes able to use | `{{Frequencies and Modes}}` |
| Capabilities/limitations for emergency | `{{Emergency Capabilities}}` |
| Three goals in Amateur Radio | `{{Goals}}` |
| Three activities for next six months | `{{Planned Activities}}` |
| Date (Received by section) | `{{Date}}` |

### Example

Where the PDF has:

```
Name & Call__________________________________ Class_______ ARRL Member?________
```

Your Google Doc template should have:

```
Name & Call: {{Name}} {{Callsign}}    Class: {{License Class}}    ARRL Member? {{ARRL Member}}
```

### Important

- Placeholders must use straight curly braces `{{ }}`, not smart/curly quotes
- Spelling and spacing must match exactly

### Get the Template ID

1. Open your Google Doc template
2. Look at the URL: `https://docs.google.com/document/d/XXXXXXXXXX/edit`
3. Copy the long string between `/d/` and `/edit` — that's the **Template ID**

### Generated PDF Naming

The generated PDF will be named: `Callsign_DD-MM-YYYY_Application.pdf`

If the applicant has no call sign, their name is used instead (e.g., `John_Smith_13-02-2026_Application.pdf`).

---

## Step 3: Create a Google Drive Folder for PDFs

1. In Google Drive, create a new folder (e.g., "RARS Membership PDFs")
2. Open the folder
3. Look at the URL: `https://drive.google.com/drive/folders/XXXXXXXXXX`
4. Copy the long string after `/folders/` — that's the **Folder ID**

---

## Step 4: Install the Apps Script

1. Open your **master** Google Sheet (the one SheetMonkey writes to)
2. Click **Extensions > Apps Script**
3. Delete any existing code in the editor
4. If the old notification script is installed, click the **clock icon** (Triggers) on the left sidebar and delete any existing triggers
5. Open `form-automation.gs` (in this same folder) and copy the entire contents
6. Paste it into the Apps Script editor

---

## Step 5: Configure the Script

Find the `CONFIGURATION` section at the top and fill in these values:

### Spreadsheet IDs

Paste the spreadsheet ID for each form type:

```javascript
var FORM_ROUTING = {
  "Contact": {
    spreadsheetId: "paste-your-contact-spreadsheet-id-here",
    ...
  },
  "Membership Application": {
    spreadsheetId: "paste-your-membership-spreadsheet-id-here",
    ...
  },
  "Elmer Request": {
    spreadsheetId: "paste-your-elmer-spreadsheet-id-here",
    ...
  }
};
```

### Template and Folder IDs

```javascript
var MEMBERSHIP_TEMPLATE_ID = "paste-your-google-doc-template-id-here";
var PDF_FOLDER_ID = "paste-your-drive-folder-id-here";
```

### Master Sheet Tab Name

If your master sheet tab isn't called "Sheet1", update this:

```javascript
var MASTER_SHEET_NAME = "Sheet1";
```

### Discord Webhook (Optional)

To send notifications to a Discord channel:

1. In Discord, go to **Server Settings > Integrations > Webhooks**
2. Create a new webhook and copy the URL
3. Paste it in the script:

```javascript
var DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/your-id/your-token";
```

Leave it empty to disable Discord notifications.

---

## Step 6: Save and Install the Trigger

1. Click the **disk icon** to save (or Ctrl+S)
2. In the function dropdown at the top of the editor, select **`installTrigger`**
3. Click the **Run** button (play icon)
4. A permissions dialog will appear:
   - Click **Review permissions**
   - Select your Google account
   - You may see "Google hasn't verified this app" — click **Advanced**, then **Go to (project name) (unsafe)**
   - Click **Allow**

---

## Step 7: Verify the Trigger

1. Click the **clock icon** on the left sidebar (Triggers)
2. You should see: `onSheetChange` with event type **On change**

---

## Step 8: Test It

1. Submit a test form on the website (any of the three forms)
2. Check your **master sheet** — you should see the new row with a "Notified" column set to `TRUE`
3. Check the **destination spreadsheet** — the row should be copied there, also marked `TRUE`
4. Check your **email** — the recipients listed in the "Email" tab should receive a notification
5. For membership submissions:
   - The email should have an attached PDF
   - The PDF should be saved in your Google Drive folder
   - The PDF should be named like `KJ4XYZ_13-02-2026_Application.pdf`
6. If Discord is configured, check the channel for the notification
7. **Edit a row** in the master sheet — verify that no duplicate notification is sent (the "Notified" column prevents this)

---

## How It Works

1. A visitor fills out a form on the RARS website
2. The form POSTs to SheetMonkey, which adds a row to the master Google Sheet
3. The `onChange` trigger fires the `onSheetChange` function
4. The script checks the "Notified" column — if already `TRUE`, it stops (prevents duplicates from edits)
5. The script reads the "Form Type" column to identify the form
6. The row is copied to the matching destination spreadsheet
7. The "Email" tab in that spreadsheet is read to get the recipient list
8. For membership applications: a Google Doc template is copied, filled with the applicant's data, converted to PDF, emailed as an attachment, and saved to Google Drive
9. Email notifications are sent to all recipients, including a "View All Submissions" link to the destination spreadsheet
10. If a Discord webhook is configured, a notification is posted there too
11. Both the master sheet and destination sheet rows are marked `Notified = TRUE`

---

## Managing Recipients

To change who gets notified for a form type, just edit the **"Email" tab** in that form's spreadsheet. No code changes needed.

- **Add a recipient:** Add their email in a new row in column A
- **Remove a recipient:** Delete their row
- **Temporarily disable:** Clear the cell (don't leave the text, just make it blank)

---

## Troubleshooting

| Problem | Solution |
|---|---|
| No emails received | Check Triggers page (clock icon). Check spam folder. Verify the "Email" tab has addresses starting at row 2. |
| Permissions error | Re-run `installTrigger` and approve permissions. The script needs access to external spreadsheets. |
| Wrong people notified | Check the "Email" tab in the destination spreadsheet. |
| Duplicate notifications | Check that the "Notified" column exists and isn't being cleared. |
| Row not copied to destination | Verify the spreadsheet ID is correct. Check Apps Script logs (Executions in left sidebar). |
| PDF not generated | Verify `MEMBERSHIP_TEMPLATE_ID` and `PDF_FOLDER_ID` are set. Check Apps Script logs. |
| PDF has `{{placeholders}}` still | The placeholder tag in the Google Doc doesn't match exactly. Check for typos, extra spaces, or curly quote characters (must be straight `{{ }}`). |
| Unknown form type in logs | Verify the hidden `Form Type` field in the website form matches the key in `FORM_ROUTING` exactly. |
| Discord not working | Verify the webhook URL. Check that the webhook hasn't been deleted in Discord. |
| Gmail sending limits | Free Gmail: ~100 emails/day. Google Workspace: ~1,500/day. |

---

## Files

- `form-automation.gs` — The Google Apps Script (paste into the Apps Script editor on your master sheet)
- `form-automation-setup.md` — This setup guide
