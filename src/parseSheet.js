const parseSheet = async ({
  googleSheetsInstance,
  auth,
  spreadsheetId,
}) => {

  const sheetsData = await googleSheetsInstance.spreadsheets.get({
    auth,
    spreadsheetId: spreadsheetId,
  });

  const result = {};

  for (const sheet of sheetsData.data.sheets) {
    const sheetData = await googleSheetsInstance.spreadsheets.values.get({
      auth,
      spreadsheetId: spreadsheetId,
      range: sheet.properties.title,
    });

    const sheetName = sheet.properties.title;

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
  }

  return result;
};

module.exports = parseSheet;
