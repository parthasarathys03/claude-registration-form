// ─────────────────────────────────────────────────────────────
//  Claude Code Meetup — Google Sheets Integration
//  Deploy this as a Google Apps Script Web App
//
//  SETUP STEPS:
//  1. Go to https://script.google.com → New Project
//  2. Paste this entire file, replacing the default code
//  3. Click Deploy → New Deployment → Web App
//     - Execute as: Me
//     - Who has access: Anyone
//  4. Copy the Web App URL
//  5. Paste it into index.html → const SHEETS_URL = 'YOUR_URL_HERE'
//  6. Commit & push
// ─────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data  = JSON.parse(e.postData.contents);

    // Write header row on first submission
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'First Name', 'Last Name', 'Email',
        'Experience Level', 'Interested Features',
        'Work / Study', 'Company Size', 'Role',
        'LinkedIn', 'GitHub',
        'Something Interesting',
        'Agreed to Terms', 'Newsletter', 'Speaker Interest'
      ]);
      sheet.getRange(1, 1, 1, 15).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data['_timestamp']                    || new Date().toISOString(),
      data['First Name']                    || '',
      data['Last Name']                     || '',
      data['Email']                         || '',
      data['Claude Code Experience Level']  || '',
      data['Interested Features']           || '',
      data['Work or Study']                 || '',
      data['Company Size']                  || '',
      data['Role']                          || '',
      data['LinkedIn Profile']              || '',
      data['GitHub Username']               || '',
      data['Something Interesting']         || '',
      data['Agree to Event Terms']          || '',
      data['Newsletter Signup']             || '',
      data['Speaker Interest']              || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
