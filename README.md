# Shopify Lead Popup with Google Sheets

This project adds a Shopify theme section popup that collects email and/or mobile number leads and saves them into a Google Sheet through Google Apps Script.

## Files

```text
sections/mobile-popup-google-sheet.liquid
google-apps-script/Code.gs
```

## Features

- Shopify editable popup section
- Email field ON/OFF
- Mobile field ON/OFF
- Required/optional email and mobile controls
- Country code dropdown, default India +91
- Privacy/policy checkbox ON/OFF
- Selected page display options
- Fast submit UX using `navigator.sendBeacon` with fetch fallback
- Saves to Google Sheets through Apps Script

## Shopify installation

1. Go to Shopify Admin.
2. Open **Online Store → Themes → Edit code**.
3. Open **Sections**.
4. Add a new section named:

```text
mobile-popup-google-sheet
```

5. Paste the full code from:

```text
sections/mobile-popup-google-sheet.liquid
```

6. Save.
7. Go to **Online Store → Customize**.
8. Add section **Lead Popup Google Sheet**.
9. Add your Google Apps Script Web App URL and Google Sheet ID.

## Google Apps Script installation

1. Open your Google Sheet.
2. Go to **Extensions → Apps Script**.
3. Delete old code.
4. Paste the full code from:

```text
google-apps-script/Code.gs
```

5. Save.
6. Deploy as a web app:

```text
Deploy → New deployment → Web app
Execute as: Me
Who has access: Anyone
Deploy
```

7. Copy the Web App URL.
8. Paste it into the Shopify section setting **Google Apps Script Web App URL**.

## Google Sheet

The Apps Script will automatically create/use a tab named:

```text
Leads Final
```

Columns created:

```text
Timestamp | Created Date | Created Time | Email | Country | Country Code | Mobile | Full Mobile | Page URL | Page Path | Source | Popup Title | Policy Accepted | Policy Text | User Agent | Browser Submitted At | Shopify Payload Version | Apps Script Version | Raw Payload
```

## Git upload commands

```bash
git init
git add .
git commit -m "Add Shopify lead popup with Google Sheets integration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shopify-lead-popup-google-sheet.git
git push -u origin main
```

## Notes

After updating Apps Script later, always create a new deployment version:

```text
Deploy → Manage deployments → Edit pencil icon → Version → New version → Deploy
```

Then paste the new Web App URL into Shopify if it changes.
