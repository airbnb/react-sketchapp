const program = require('commander');
const { createNewSketchFile, writeSketchFile, generateId } = require('sketch-file');

import renderDocument from './renderDocument';

let outFile;

program
  .version('0.1.0')
  .arguments('[out]')
  .action(out => {
    outFile = out;
  })
  .parse(process.argv);

if (!outFile) {
  console.log('Missing output file!');
  program.help();
}

console.log('writing to', outFile);

async function modifySketchTemplate(layers, textStyles) {
  const sketchDoc = createNewSketchFile(generateId(outFile));

  sketchDoc.document.layerTextStyles.objects = textStyles;
  sketchDoc.pages[0].layers = sketchDoc.pages[0].layers.concat(layers);

  if (outFile) {
    await writeSketchFile(sketchDoc, outFile);
  }
}

const { layers, textStyles } = renderDocument();

modifySketchTemplate(layers, textStyles);
