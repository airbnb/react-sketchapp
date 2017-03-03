
// This shouldn't need to call into Sketch, but it does currently :(
export function makeAttributedString(string, font) {
  const attribStr = NSAttributedString.attributedStringWithString_font_(string, font);
  const msAttribStr = MSAttributedString.alloc().initWithAttributedString(attribStr);
  // This is kinda ugly, but works :/
  const encoded = MSJSONDataArchiver.archiveStringWithRootObject_error_(msAttribStr, null);
  return JSON.parse(encoded);
}
