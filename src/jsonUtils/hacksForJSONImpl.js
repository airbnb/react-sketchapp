
// We need native macOS fonts and colors for these hacks so import the old utils
import normalizeColor from 'normalize-css-color';
import findFont from '../utils/findFont';
import { TEXT_ALIGN } from '../utils/applyTextStyleToLayer';

// Awkwardly we encode then immediatly decode the JSON, but seems like
function encodeSketchJSON(sketchObj) {
  const encoded = MSJSONDataArchiver.archiveStringWithRootObject_error_(sketchObj, null);
  return JSON.parse(encoded);
}


function makeParagraphStyle(textStyle) {
  const pStyle = NSMutableParagraphStyle.alloc().init();

  if (textStyle.lineHeight !== undefined) {
    pStyle.minimumLineHeight = textStyle.lineHeight;
    pStyle.maximumLineHeight = textStyle.lineHeight;
  }

  if (textStyle.textAlign) {
    pStyle.textAlign = TEXT_ALIGN[textStyle.textAlign];
  }

  return pStyle;
}

// This shouldn't need to call into Sketch, but it does currently, which is bad for perf :(
export function makeAttributedString(string, textStyle) {
  const font = findFont(textStyle);

  const color = normalizeColor.rgba(normalizeColor(textStyle.color || 'black'));

  const attribs = {
    MSAttributedStringFontAttribute: font.fontDescriptor(),
    NSParagraphStyle: makeParagraphStyle(textStyle),
    NSColor: NSColor.colorWithDeviceRed_green_blue_alpha(color.r / 255, color.g / 255, color.b / 255, color.a),
  };

  if (textStyle.letterSpacing !== undefined) {
    attribs.NSKern = textStyle.letterSpacing;
  }

  const attribStr = NSAttributedString.attributedStringWithString_attributes_(string, attribs);
  const msAttribStr = MSAttributedString.alloc().initWithAttributedString(attribStr);

  return encodeSketchJSON(msAttribStr);
}


// I think this is not needed anymore. rm?
/*
function makeTextStyle(textStyle) {

  const pStyle = makeParagraphStyle(textStyle);

  const font = findFont(textStyle);
  // layer.setFont(font);

  // if (textStyle.color !== undefined) {
  //   layer.setTextColor(convertToColor(textStyle.color));
  // }


  // if (style && style.opacity !== undefined) {
  //   layer.style().contextSettings().opacity = style.opacity; //eslint-disable-line
  // }


  // note european spelling :P
  //layer.setTextBehaviour(TextBehaviour.Fixed);

  const value = {
    _class: 'textStyle',
    encodedAttributes: {
      // NSColor: encodeSketchJSON(NSColor.redColor()),
      // NSColor: {
      //   _archive: 'YnBsaXN0MDDUAQIDBAUGHyBYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoKUHCBEVHFUkbnVsbNQJCgsMDQ4PEFVOU1JHQlxOU0NvbG9yU3BhY2VfEBJOU0N1c3RvbUNvbG9yU3BhY2VWJGNsYXNzTxAnMC4xODc4NDEzOTc3IDAuNTE1ODY0MTU4MiAwLjIyNjcyNzI0ODEAEAGAAoAE0hIMExRUTlNJRBABgAPSFhcYGVokY2xhc3NuYW1lWCRjbGFzc2VzXE5TQ29sb3JTcGFjZaIaG1xOU0NvbG9yU3BhY2VYTlNPYmplY3TSFhcdHldOU0NvbG9yoh0bXxAPTlNLZXllZEFyY2hpdmVy0SEiVHJvb3SAAQAIABEAGgAjAC0AMgA3AD0AQwBMAFIAXwB0AHsApQCnAKkAqwCwALUAtwC5AL4AyQDSAN8A4gDvAPgA/QEFAQgBGgEdASIAAAAAAAACAQAAAAAAAAAjAAAAAAAAAAAAAAAAAAABJA=='
      // },
      MSAttributedStringFontAttribute: encodeSketchJSON(font),
      // MSAttributedStringFontAttribute: {
      //   _archive: 'YnBsaXN0MDDUAQIDBAUGJidYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoKkHCA0XGBkaGyJVJG51bGzSCQoLDFYkY2xhc3NfEBpOU0ZvbnREZXNjcmlwdG9yQXR0cmlidXRlc4AIgALTDg8JEBMWV05TLmtleXNaTlMub2JqZWN0c6IREoADgASiFBWABYAGgAdfEBNOU0ZvbnRTaXplQXR0cmlidXRlXxATTlNGb250TmFtZUF0dHJpYnV0ZSNALAAAAAAAAF8QEC5TRk5TVGV4dC1NZWRpdW3SHB0eH1okY2xhc3NuYW1lWCRjbGFzc2VzXxATTlNNdXRhYmxlRGljdGlvbmFyeaMeICFcTlNEaWN0aW9uYXJ5WE5TT2JqZWN00hwdIyRfEBBOU0ZvbnREZXNjcmlwdG9yoiUhXxAQTlNGb250RGVzY3JpcHRvcl8QD05TS2V5ZWRBcmNoaXZlctEoKVRyb290gAEACAARABoAIwAtADIANwBBAEcATABTAHAAcgB0AHsAgwCOAJEAkwCVAJgAmgCcAJ4AtADKANMA5gDrAPYA/wEVARkBJgEvATQBRwFKAV0BbwFyAXcAAAAAAAACAQAAAAAAAAAqAAAAAAAAAAAAAAAAAAABeQ=='
      // },
      NSParagraphStyle: encodeSketchJSON(pStyle),
      // NSParagraphStyle: {
      //   _archive: 'YnBsaXN0MDDUAQIDBAUGICFYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoKUHCBMXHVUkbnVsbNUJCgsMDQ4PEBESWk5TVGFiU3RvcHNbTlNBbGlnbm1lbnRcTlNUZXh0QmxvY2tzXxAfTlNBbGxvd3NUaWdodGVuaW5nRm9yVHJ1bmNhdGlvblYkY2xhc3OAABAEgAIQAYAE0hQNFRZaTlMub2JqZWN0c6CAA9IYGRobWiRjbGFzc25hbWVYJGNsYXNzZXNXTlNBcnJheaIaHFhOU09iamVjdNIYGR4fXxAQTlNQYXJhZ3JhcGhTdHlsZaIeHF8QD05TS2V5ZWRBcmNoaXZlctEiI1Ryb290gAEACAARABoAIwAtADIANwA9AEMATgBZAGUAcgCUAJsAnQCfAKEAowClAKoAtQC2ALgAvQDIANEA2QDcAOUA6gD9AQABEgEVARoAAAAAAAACAQAAAAAAAAAkAAAAAAAAAAAAAAAAAAABHA=='
      // },
      NSKern: 0.03402778,
    }
  };

  if (textStyle.textTransform) {
    value.encodedAttributes.MSAttributedStringTextTransformAttribute = TEXT_TRANSFORM[textStyle.textTransform] * 1;
  }

  return value;
}
*/
