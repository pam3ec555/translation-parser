const fs = require(`fs`);

const getFileTemplate = (data) => JSON.stringify(data, null, 2);

/**
 * 
 * @param {Object} data
 * @param {string} outputPath
 * @param {Function} outputFileName
 *    @param {string} lngCode
 *    @return {string}
 * @param {string} outputFileExtension
 */
const writeData = (data, {
  outputPath,
  outputFileName,
  outputFileExtension,
}) => {
  console.log(`Writing data to ${outputPath}, ${data}`);
  for (let [lngCode, phrases] of Object.entries(data)) {
    fs.writeFileSync(
      `${outputPath}/${outputFileName(lngCode)}.${outputFileExtension}`,
      getFileTemplate(phrases),
    );
  }
}

module.exports = writeData;
