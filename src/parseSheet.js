const parseSheet = async ({
  googleSheetsInstance,
  auth,
  spreadsheetId,
}) => {
  const sheetsData = await googleSheetsInstance.spreadsheets.get({
    auth,
    spreadsheetId: spreadsheetId,
  });

  console.log('Successfully fetched spreadsheet data');

  const result = {};

  for (const sheet of sheetsData.data.sheets) {
    const sheetData = await googleSheetsInstance.spreadsheets.values.get({
      auth,
      spreadsheetId: spreadsheetId,
      range: sheet.properties.title,
    });

    const sheetName = sheet.properties.title;

    console.log(`Parsing sheet ${sheetName}...`);

    const rows = sheetData.data.values;
    if (rows.length > 0) {
      rows.forEach((row, rowIndex) => {
        if (rowIndex > 0) {
          row.forEach((cell, cellIndex) => {
            if (cellIndex > 0) {
              if (!result[rows[0][cellIndex]]) {
                result[rows[0][cellIndex]] = {};
              }
              if (!result[rows[0][cellIndex]][sheetName]) {
                result[rows[0][cellIndex]][sheetName] = {};
              }
              result[rows[0][cellIndex]][sheetName][row[0]] = cell;
            }
          });
        }
      });
    }

    console.log(`Parsing sheet ${sheet.properties.title} is done!`);
  }

  console.log(`All data have parsed: ${JSON.stringify(result, null, 2)}`);

  return result;
};

module.exports = parseSheet;
