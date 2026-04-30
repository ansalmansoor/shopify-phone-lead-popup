const SHEET_NAME = "Leads Final";
const APPS_SCRIPT_VERSION = "apps-script-final-v6";

const HEADERS = [
  "Timestamp",
  "Created Date",
  "Created Time",
  "Email",
  "Country",
  "Country Code",
  "Mobile",
  "Full Mobile",
  "Page URL",
  "Page Path",
  "Source",
  "Popup Title",
  "Policy Accepted",
  "Policy Text",
  "User Agent",
  "Browser Submitted At",
  "Shopify Payload Version",
  "Apps Script Version",
  "Raw Payload"
];

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({
        success: false,
        message: "No post data received",
        apps_script_version: APPS_SCRIPT_VERSION
      });
    }

    const rawPayload = e.postData.contents;
    const data = JSON.parse(rawPayload);
    const sheetId = cleanValue(data.sheet_id);

    if (!sheetId) {
      return jsonResponse({
        success: false,
        message: "Google Sheet ID missing",
        apps_script_version: APPS_SCRIPT_VERSION,
        received_data: data
      });
    }

    const spreadsheet = SpreadsheetApp.openById(sheetId);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
    }

    setupHeaders(sheet);

    const now = new Date();
    const timezone = Session.getScriptTimeZone();

    const timestamp = Utilities.formatDate(now, timezone, "dd/MM/yyyy HH:mm:ss");
    const createdDate = Utilities.formatDate(now, timezone, "dd/MM/yyyy");
    const createdTime = Utilities.formatDate(now, timezone, "HH:mm:ss");

    const email = cleanValue(data.email);
    const country = cleanValue(data.country_label);
    const countryCode = cleanValue(data.country_code);
    const mobile = cleanValue(data.mobile);
    const fullMobile = cleanValue(data.full_mobile) || buildFullMobile(countryCode, mobile);
    const pageUrl = cleanValue(data.page);
    const pagePath = cleanValue(data.page_path) || getPagePath(pageUrl);
    const source = cleanValue(data.source) || "Shopify Lead Popup";
    const popupTitle = cleanValue(data.popup_title);
    const policyAccepted = cleanValue(data.policy_accepted) || "No";
    const policyText = cleanValue(data.policy_text);
    const userAgent = cleanValue(data.user_agent);
    const browserSubmittedAt = cleanValue(data.browser_submitted_at);
    const shopifyPayloadVersion = cleanValue(data.shopify_payload_version);

    const row = [
      timestamp,
      createdDate,
      createdTime,
      email,
      country,
      countryCode,
      mobile,
      fullMobile,
      pageUrl,
      pagePath,
      source,
      popupTitle,
      policyAccepted,
      policyText,
      userAgent,
      browserSubmittedAt,
      shopifyPayloadVersion,
      APPS_SCRIPT_VERSION,
      rawPayload
    ];

    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setNumberFormat("@");
    sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([row]);
    formatSheet(sheet);

    return jsonResponse({
      success: true,
      message: "Lead saved successfully",
      sheet_name: SHEET_NAME,
      apps_script_version: APPS_SCRIPT_VERSION
    });

  } catch (error) {
    return jsonResponse({
      success: false,
      message: error.toString(),
      apps_script_version: APPS_SCRIPT_VERSION
    });

  } finally {
    try {
      lock.releaseLock();
    } catch (err) {}
  }
}

function setupHeaders(sheet) {
  const maxColumns = sheet.getMaxColumns();

  if (maxColumns < HEADERS.length) {
    sheet.insertColumnsAfter(maxColumns, HEADERS.length - maxColumns);
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setNumberFormat("@");
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  headerRange.setVerticalAlignment("middle");
  headerRange.setBackground("#D9E1F2");

  sheet.setFrozenRows(1);
}

function formatSheet(sheet) {
  const lastRow = sheet.getLastRow();

  if (lastRow < 1) return;

  sheet.getRange(1, 1, lastRow, HEADERS.length).setNumberFormat("@");
  sheet.getRange(1, 1, lastRow, HEADERS.length).setVerticalAlignment("middle");

  const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  headerRange.setBackground("#D9E1F2");

  sheet.autoResizeColumns(1, HEADERS.length);
  sheet.setColumnWidth(19, 500);
}

function buildFullMobile(countryCode, mobile) {
  if (!mobile) return "";
  if (!countryCode) return mobile;
  return countryCode + mobile;
}

function getPagePath(pageUrl) {
  if (!pageUrl) return "";

  try {
    return new URL(pageUrl).pathname;
  } catch (error) {
    return "";
  }
}

function cleanValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  return String(value).trim();
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return jsonResponse({
    success: true,
    message: "Shopify Lead Popup Apps Script is working",
    sheet_name: SHEET_NAME,
    apps_script_version: APPS_SCRIPT_VERSION
  });
}
