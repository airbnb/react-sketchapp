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

const SUCCESS_MESSAGE = 'Successfully fixed yoga-layout asm.js file';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    return fs.readFile(filePath, 'utf8', (err2, data2) => {
      if (err2) {
        return console.error(err2); //eslint-disable-line
      }

      const result = data2.replace(contentToReplacce, replacement);
      return fs.writeFile(filePath, result, fileEncoding, (error) => {
        if (error) {
          return console.error(error); //eslint-disable-line
        }
        //eslint-disable-next-line
        return console.log(SUCCESS_MESSAGE);
      });
    });
  }

  const result = data.replace(contentToReplacce, replacement);
  fs.writeFile(filePath, result, fileEncoding, (error) => {
    if (error) {
      return console.error(error); //eslint-disable-line
    }
    //eslint-disable-next-line
    return console.log(SUCCESS_MESSAGE);
  });

  //eslint-disable-next-line
  return console.log("Reading yoga-layout asm.js file...");
});
