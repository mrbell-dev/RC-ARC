# Form Notification Script Setup Guide

This guide walks you through setting up the Google Apps Script that sends email (and optionally Discord) notifications when forms are submitted on the RARS website.

## Overview

The RARS website has three forms that submit to a Google Sheet via SheetMonkey:

- **Contact Form** (`/pages/contact/`)
- **Membership Application** (`/pages/membership/`)
- **Elmer Request** (`/pages/elmer/`)

Each form includes a hidden `Form Type` field so the script can route notifications to the right people.

## Setup Instructions

### Step 1: Open Your Google Sheet

Open the Google Sheet that SheetMonkey writes form submissions to.

### Step 2: Open Apps Script

1. Click **Extensions** in the menu bar
2. Click **Apps Script**
3. A new tab will open with the script editor

### Step 3: Paste the Script

1. Select all the default code in the editor and delete it
2. Open `form-notification.gs` (in this same folder) and copy the entire contents
3. Paste it into the Apps Script editor

### Step 4: Update the Configuration

Find the `NOTIFICATION_RULES` section near the top of the script. Update the email addresses for each form type:

```javascript
var NOTIFICATION_RULES = {
  "Contact": {
    recipients: [
      "rustyutahn@yahoo.com"
      // Add more: "another@email.com"
    ],
    subject: "RARS Website: New Contact Form Submission"
  },

  "Membership Application": {
    recipients: [
      "rustyutahn@yahoo.com"
      // "secretary@email.com"
    ],
    subject: "RARS Website: New Membership Application"
  },

  "Elmer Request": {
    recipients: [
      "rustyutahn@yahoo.com"
      // "elmer-coordinator@email.com"
    ],
    subject: "RARS Website: New Elmer Request"
  }
};
```

To send to multiple people, add more email strings to the `recipients` array:

```javascript
recipients: [
  "person1@email.com",
  "person2@email.com",
  "person3@email.com"
]
```

### Step 5: (Optional) Add Discord Webhook

To also send notifications to a Discord channel:

1. In Discord, go to **Server Settings > Integrations > Webhooks**
2. Click **New Webhook**
3. Choose the channel you want notifications posted to
4. Click **Copy Webhook URL**
5. In the script, find the `DISCORD_WEBHOOK_URL` line and paste the URL between the quotes:

```javascript
var DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/your-id/your-token";
```

When configured, Discord notifications will be sent automatically alongside emails.

### Step 6: Save the Script

Click the **disk icon** in the toolbar or press **Ctrl + S** (Cmd + S on Mac).

### Step 7: Install the Trigger

1. In the function dropdown at the top of the editor, select **`installTrigger`**
2. Click the **Run** button (play/triangle icon)
3. A permissions dialog will appear:
   - Click **Review permissions**
   - Select your Google account
   - You may see "Google hasn't verified this app" -- click **Advanced**, then **Go to (project name) (unsafe)**
   - Click **Allow**

### Step 8: Verify the Trigger

1. Click the **clock icon** on the left sidebar (Triggers)
2. You should see one trigger listed: `onSheetChange` with event type **On change**

### Step 9: Test It

1. Submit a test form on the website (any of the three forms)
2. Check your email for the notification
3. If Discord is configured, check the Discord channel as well

## How It Works

1. A visitor fills out a form on the website
2. The form POSTs to SheetMonkey, which adds a new row to the Google Sheet
3. The new row triggers the `onSheetChange` function
4. The script reads the `Form Type` column to determine which form was submitted
5. Based on the form type, it looks up the notification rules (recipients and subject line)
6. It sends a formatted HTML email to each recipient
7. If a Discord webhook URL is configured, it also posts an embed to the Discord channel

## Troubleshooting

- **No emails received:** Check the Triggers page (clock icon) to make sure the trigger is installed. Also check your spam folder.
- **Permissions error:** Re-run `installTrigger` and approve permissions again.
- **Wrong people getting notified:** Check the `NOTIFICATION_RULES` configuration and make sure the form's hidden `Form Type` field matches the key in the rules.
- **Discord not working:** Verify the webhook URL is correct and the webhook hasn't been deleted in Discord.
- **Gmail sending limits:** Free Gmail accounts can send ~100 emails/day. Google Workspace accounts can send ~1,500/day.

## Files

- `form-notification.gs` -- The Google Apps Script to paste into Apps Script
- `form-notification-setup.md` -- This setup guide
