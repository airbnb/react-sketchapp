// @flow
/*
 * Sketch JavaScript core implementation can't handle `{}("")` and it
 * results in a TypeError. This script removes those instances and allows
 * the script to compile correctly.
*/
const fs = require('fs');

// Location of asm.js yoga-layout file
const filePath = './node_modules/yoga-layout/build/Release/nbind.js';
// Regex for {}("")
const contentToReplacce = /\{\}\(""\)/g;
const replacement = '{}';
const fileEncoding = 'utf8';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return console.error(err); //eslint-disable-line
  }

  const result = data.replace(contentToReplacce, replacement);
  fs.writeFile(filePath, result, fileEncoding, (error) => {
    if (error) {
      return console.error(error); //eslint-disable-line
    }
    //eslint-disable-next-line
    return console.log("Successfully fixed yoga-layout asm.js file");
  });

  //eslint-disable-next-line
  return console.log("Successfully read yoga-layout asm.js file");
});
