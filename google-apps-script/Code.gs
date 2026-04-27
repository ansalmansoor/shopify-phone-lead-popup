function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const sheetId = data.sheet_id;
    const sheetName = "Leads";

    if (!sheetId) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: "Sheet ID missing"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);

    if (!sheet) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          message: "Sheet tab not found"
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    sheet.appendRow([
      new Date(),
      data.mobile || "",
      data.page || "",
      data.source || "Shopify Popup",
      data.popup_title || "",
      data.policy_accepted || "No",
      data.policy_text || ""
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({
        success: true
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
