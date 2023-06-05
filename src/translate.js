const { google } = require('googleapis');
const parseSheet = require('./parseSheet');
const writeData = require('./writeData');

/**
 * 
 * @param {string} keyFilePath
 * @param {string} spreadsheetId
 * @param {string} outputPath
 * @param {Function} outputFileName
 *    @param {string} lngCode
 *    @return {string}
 * @param {string} outputFileExtension
 */
const translate = async ({
  keyFilePath,
  spreadsheetId,
  outputPath,
  outputFileName,
  outputFileExtension,
}) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
  });

  const authClientObject = await auth.getClient();

  const googleSheetsInstance = google.sheets({ version: 'v4', auth: authClientObject });

  const parsedData = await parseSheet({ googleSheetsInstance, auth, spreadsheetId });

  writeData(parsedData, {
    outputPath,
    outputFileName,
    outputFileExtension,
  });

  console.log('Done!');
}

module.exports = translate;
