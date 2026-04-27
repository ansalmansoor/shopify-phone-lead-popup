# Shopify Mobile Number Popup With Google Sheet

This project adds a Shopify popup modal that collects a customer mobile number, asks the customer to accept a policy checkbox, and sends the lead data to Google Sheets using Google Apps Script.

## Features

- Shopify theme section
- Popup image option
- Editable heading, text, button, and policy text
- Mobile number validation
- Privacy Policy link
- Google Sheet ID setting
- Google Apps Script Web App URL setting
- Show popup on selected pages only
- Options for home page, product pages, collection pages, cart page, custom pages, all pages, or specific URL paths
- Saves submitted leads to Google Sheet

## Project Files

```text
shopify-mobile-popup-google-sheet/
├── README.md
├── sections/
│   └── mobile-popup-google-sheet.liquid
└── google-apps-script/
    └── Code.gs
```

## Step 1: Create Google Sheet

Create a new Google Sheet.

Create a sheet tab named:

```text
Leads
```

Add these columns in row 1:

```text
Date | Mobile | Page | Source | Popup Title | Policy Accepted | Policy Text
```

Copy your Google Sheet ID from the URL.

Example:

```text
https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
```

Only copy this part:

```text
YOUR_SHEET_ID_HERE
```

## Step 2: Add Google Apps Script Backend

Open your Google Sheet.

Go to:

```text
Extensions → Apps Script
```

Delete the default code and paste the code from:

```text
google-apps-script/Code.gs
```

## Step 3: Deploy Google Apps Script

In Apps Script, click:

```text
Deploy → New deployment
```

Select:

```text
Type: Web app
Execute as: Me
Who has access: Anyone
```

Click Deploy.

Copy the Web App URL. You will paste this URL into the Shopify section settings.

## Step 4: Add Shopify Section File

In Shopify admin, go to:

```text
Online Store → Themes → Edit code
```

Open the `sections` folder.

Click:

```text
Add a new section
```

Name the file:

```text
mobile-popup-google-sheet
```

Paste the full code from:

```text
sections/mobile-popup-google-sheet.liquid
```

Save the file.

## Step 5: Add Section in Shopify Theme Customizer

Go to:

```text
Online Store → Themes → Customize
```

Click:

```text
Add section → Mobile Number Popup
```

Fill these settings:

```text
Google Apps Script Web App URL
Google Sheet ID
Privacy Policy link
Popup image
Heading
Popup text
Button text
```

## Step 6: Show Popup on Selected Pages

The section has a setting called:

```text
Show popup on
```

Available options:

```text
All pages
Home page only
All product pages
All collection pages
Cart page only
All custom pages
Specific URL paths only
```

### Example: Show only on selected URLs

Choose:

```text
Show popup on → Specific URL paths only
```

Then add one URL path per line:

```text
/
/collections/navratri-collections
/products/cream-royal-blue-combo-onam-special-kerala-kasavu-handwork-lehenga-choli
/pages/contact
```

Use only the URL path, not the full domain.

Correct:

```text
/collections/navratri-collections
```

Wrong:

```text
https://stanwellskids.in/collections/navratri-collections
```

## Step 7: Test the Popup

Open your selected page in an incognito/private browser window.

Enter a 10-digit mobile number.

Accept the policy checkbox.

Submit the form.

Check your Google Sheet. A new row should be added to the `Leads` tab.

## Important Notes

### Popup does not show again after submit

By default, the section uses browser `localStorage` to avoid showing the popup again after successful submission.

To test again, either:

- Use incognito/private browser
- Clear browser site data
- Change the section setting `Show only once after submit`

### Popup closed but not submitted

If the customer closes the popup, it will not show again in the same browser session. It may show again in a new session.

### Google Apps Script permission

The first time you deploy the script, Google may ask you to authorize spreadsheet access. Allow the permission for your own Google account.

## Git Upload Commands

From your computer terminal, run:

```bash
git init
git add .
git commit -m "Add Shopify mobile popup Google Sheet integration"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace:

```text
YOUR_GITHUB_REPOSITORY_URL
```

with your GitHub repo URL.

## Security Note

This setup is good for basic lead collection. The Google Apps Script Web App URL is public because Shopify frontend needs to send data to it. Do not put private Shopify Admin API tokens or secret keys inside the Shopify section code.

