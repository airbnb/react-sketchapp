import { makeAttributedString, makeTextStyle } from './hacksForJSONImpl';
import { generateID } from './models';

export function makeTextLayer(frame, text, textStyle) {
  return {
    _class: 'text',
    do_objectID: generateID(),
    // exportOptions: {
    //   _class: 'exportOptions',
    //   exportFormats: [],
    //   includedLayerIds: [],
    //   layerOptions: 0,
    //   shouldTrim: false
    // },
    frame: frame,
    isFlippedHorizontal: false,
    isFlippedVertical: false,
    isLocked: false,
    isVisible: true,
    layerListExpandedType: 0,
    name: text,
    nameIsFixed: false,
    resizingType: 0,
    rotation: 0,
    shouldBreakMaskChain: false,
    // It works to omit this entirely
    // style: {
    //   _class: 'style',
    //   endDecorationType: 0,
    //   miterLimit: 10,
    //   startDecorationType: 0,
    //   // The text style seems to just mirror the attributed string, so it's faster to not set it
    //   // textStyle: makeTextStyle(textStyle),
    // },
    attributedString: makeAttributedString(text, textStyle),
    // {
    //   _class: MSAttributedString,
    //   archivedAttributedString: {
    //     _archive: YnBsaXN0MDDUAQIDBAUGaWpYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoK8QGwcIDxAeHyAhIiwvNTg8REVGR0hMUFFYXGBjZVUkbnVsbNMJCgsMDQ5YTlNTdHJpbmdWJGNsYXNzXE5TQXR0cmlidXRlc4ACgBqAA18QD015IGhvdCBob3QgQUJDRNMREgoTGB1XTlMua2V5c1pOUy5vYmplY3RzpBQVFheABIAFgAaAB6QZGhscgAiADIAUgBWAGV8QEE5TUGFyYWdyYXBoU3R5bGVfEB9NU0F0dHJpYnV0ZWRTdHJpbmdGb250QXR0cmlidXRlVk5TS2VybldOU0NvbG9y1SMkJSYKJygpKitaTlNUYWJTdG9wc1tOU0FsaWdubWVudFxOU1RleHRCbG9ja3NfEB9OU0FsbG93c1RpZ2h0ZW5pbmdGb3JUcnVuY2F0aW9ugAAQBIAJEAGAC9ISCi0uoIAK0jAxMjNaJGNsYXNzbmFtZVgkY2xhc3Nlc1dOU0FycmF5ojI0WE5TT2JqZWN00jAxNjdfEBBOU1BhcmFncmFwaFN0eWxlojY00go5OjtfEBpOU0ZvbnREZXNjcmlwdG9yQXR0cmlidXRlc4ATgA3TERIKPUBDoj4/gA6AD6JBQoAQgBGAEl8QE05TRm9udFNpemVBdHRyaWJ1dGVfEBNOU0ZvbnROYW1lQXR0cmlidXRlI0AsAAAAAAAAXxAQLlNGTlNUZXh0LU1lZGl1bdIwMUlKXxATTlNNdXRhYmxlRGljdGlvbmFyeaNJSzRcTlNEaWN0aW9uYXJ50jAxTU5fEBBOU0ZvbnREZXNjcmlwdG9yok80XxAQTlNGb250RGVzY3JpcHRvciM/oWwW1ILOp9RSU1QKVSpWV1VOU1JHQlxOU0NvbG9yU3BhY2VfEBJOU0N1c3RvbUNvbG9yU3BhY2VPECcwLjE4Nzg0MTM5NzcgMC41MTU4NjQxNTgyIDAuMjI2NzI3MjQ4MQCAFoAY0lkKWltUTlNJRBABgBfSMDFdXlxOU0NvbG9yU3BhY2WiXzRcTlNDb2xvclNwYWNl0jAxYWJXTlNDb2xvcqJhNNIwMUtkoks00jAxZmdfEBJOU0F0dHJpYnV0ZWRTdHJpbmeiaDRfEBJOU0F0dHJpYnV0ZWRTdHJpbmdfEA9OU0tleWVkQXJjaGl2ZXLRa2xUcm9vdIABAAgAEQAaACMALQAyADcAVQBbAGIAawByAH8AgQCDAIUAlwCeAKYAsQC2ALgAugC8AL4AwwDFAMcAyQDLAM0A4AECAQkBEQEcAScBMwFAAWIBZAFmAWgBagFsAXEBcgF0AXkBhAGNAZUBmAGhAaYBuQG8AcEB3gHgAeIB6QHsAe4B8AHzAfUB9wH5Ag8CJQIuAkECRgJcAmACbQJyAoUCiAKbAqQCrQKzAsAC1QL/AwEDAwMIAw0DDwMRAxYDIwMmAzMDOANAA0MDSANLA1ADZQNoA30DjwOSA5cAAAAAAAACAQAAAAAAAABtAAAAAAAAAAAAAAAAAAADmQ==
    //   }
    // },
    automaticallyDrawOnUnderlyingPath: false,
    dontSynchroniseWithSymbol: false,
    // I haven't fully figured out the meaning of glyphBounds
    //glyphBounds: '{{0, 0}, {116, 17}}',
    heightIsClipped: false,
    lineSpacingBehaviour: 2,
    textBehaviour: 1
  };
}


