import { makeAttributedString } from './hacksForJSONImpl';
import { generateID } from './models';

export function makeTextLayer(frame, text, color) {
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
    style: {
      _class: 'style',
      endDecorationType: 0,
      miterLimit: 10,
      startDecorationType: 0,
      textStyle: {
        _class: 'textStyle',
        encodedAttributes: {
          NSColor: {
            _archive: 'YnBsaXN0MDDUAQIDBAUGHyBYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoKUHCBEVHFUkbnVsbNQJCgsMDQ4PEFVOU1JHQlxOU0NvbG9yU3BhY2VfEBJOU0N1c3RvbUNvbG9yU3BhY2VWJGNsYXNzTxAnMC4xODc4NDEzOTc3IDAuNTE1ODY0MTU4MiAwLjIyNjcyNzI0ODEAEAGAAoAE0hIMExRUTlNJRBABgAPSFhcYGVokY2xhc3NuYW1lWCRjbGFzc2VzXE5TQ29sb3JTcGFjZaIaG1xOU0NvbG9yU3BhY2VYTlNPYmplY3TSFhcdHldOU0NvbG9yoh0bXxAPTlNLZXllZEFyY2hpdmVy0SEiVHJvb3SAAQAIABEAGgAjAC0AMgA3AD0AQwBMAFIAXwB0AHsApQCnAKkAqwCwALUAtwC5AL4AyQDSAN8A4gDvAPgA/QEFAQgBGgEdASIAAAAAAAACAQAAAAAAAAAjAAAAAAAAAAAAAAAAAAABJA=='
          },
          MSAttributedStringFontAttribute: {
            _archive: 'YnBsaXN0MDDUAQIDBAUGJidYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoKkHCA0XGBkaGyJVJG51bGzSCQoLDFYkY2xhc3NfEBpOU0ZvbnREZXNjcmlwdG9yQXR0cmlidXRlc4AIgALTDg8JEBMWV05TLmtleXNaTlMub2JqZWN0c6IREoADgASiFBWABYAGgAdfEBNOU0ZvbnRTaXplQXR0cmlidXRlXxATTlNGb250TmFtZUF0dHJpYnV0ZSNALAAAAAAAAF8QEC5TRk5TVGV4dC1NZWRpdW3SHB0eH1okY2xhc3NuYW1lWCRjbGFzc2VzXxATTlNNdXRhYmxlRGljdGlvbmFyeaMeICFcTlNEaWN0aW9uYXJ5WE5TT2JqZWN00hwdIyRfEBBOU0ZvbnREZXNjcmlwdG9yoiUhXxAQTlNGb250RGVzY3JpcHRvcl8QD05TS2V5ZWRBcmNoaXZlctEoKVRyb290gAEACAARABoAIwAtADIANwBBAEcATABTAHAAcgB0AHsAgwCOAJEAkwCVAJgAmgCcAJ4AtADKANMA5gDrAPYA/wEVARkBJgEvATQBRwFKAV0BbwFyAXcAAAAAAAACAQAAAAAAAAAqAAAAAAAAAAAAAAAAAAABeQ=='
          },
          NSParagraphStyle: {
            _archive: 'YnBsaXN0MDDUAQIDBAUGICFYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoKUHCBMXHVUkbnVsbNUJCgsMDQ4PEBESWk5TVGFiU3RvcHNbTlNBbGlnbm1lbnRcTlNUZXh0QmxvY2tzXxAfTlNBbGxvd3NUaWdodGVuaW5nRm9yVHJ1bmNhdGlvblYkY2xhc3OAABAEgAIQAYAE0hQNFRZaTlMub2JqZWN0c6CAA9IYGRobWiRjbGFzc25hbWVYJGNsYXNzZXNXTlNBcnJheaIaHFhOU09iamVjdNIYGR4fXxAQTlNQYXJhZ3JhcGhTdHlsZaIeHF8QD05TS2V5ZWRBcmNoaXZlctEiI1Ryb290gAEACAARABoAIwAtADIANwA9AEMATgBZAGUAcgCUAJsAnQCfAKEAowClAKoAtQC2ALgAvQDIANEA2QDcAOUA6gD9AQABEgEVARoAAAAAAAACAQAAAAAAAAAkAAAAAAAAAAAAAAAAAAABHA=='
          },
          NSKern: 0.03402778
        }
      }
    },
    attributedString: makeAttributedString(text, null),
    // {
    //   _class: MSAttributedString,
    //   archivedAttributedString: {
    //     _archive: YnBsaXN0MDDUAQIDBAUGaWpYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoK8QGwcIDxAeHyAhIiwvNTg8REVGR0hMUFFYXGBjZVUkbnVsbNMJCgsMDQ5YTlNTdHJpbmdWJGNsYXNzXE5TQXR0cmlidXRlc4ACgBqAA18QD015IGhvdCBob3QgQUJDRNMREgoTGB1XTlMua2V5c1pOUy5vYmplY3RzpBQVFheABIAFgAaAB6QZGhscgAiADIAUgBWAGV8QEE5TUGFyYWdyYXBoU3R5bGVfEB9NU0F0dHJpYnV0ZWRTdHJpbmdGb250QXR0cmlidXRlVk5TS2VybldOU0NvbG9y1SMkJSYKJygpKitaTlNUYWJTdG9wc1tOU0FsaWdubWVudFxOU1RleHRCbG9ja3NfEB9OU0FsbG93c1RpZ2h0ZW5pbmdGb3JUcnVuY2F0aW9ugAAQBIAJEAGAC9ISCi0uoIAK0jAxMjNaJGNsYXNzbmFtZVgkY2xhc3Nlc1dOU0FycmF5ojI0WE5TT2JqZWN00jAxNjdfEBBOU1BhcmFncmFwaFN0eWxlojY00go5OjtfEBpOU0ZvbnREZXNjcmlwdG9yQXR0cmlidXRlc4ATgA3TERIKPUBDoj4/gA6AD6JBQoAQgBGAEl8QE05TRm9udFNpemVBdHRyaWJ1dGVfEBNOU0ZvbnROYW1lQXR0cmlidXRlI0AsAAAAAAAAXxAQLlNGTlNUZXh0LU1lZGl1bdIwMUlKXxATTlNNdXRhYmxlRGljdGlvbmFyeaNJSzRcTlNEaWN0aW9uYXJ50jAxTU5fEBBOU0ZvbnREZXNjcmlwdG9yok80XxAQTlNGb250RGVzY3JpcHRvciM/oWwW1ILOp9RSU1QKVSpWV1VOU1JHQlxOU0NvbG9yU3BhY2VfEBJOU0N1c3RvbUNvbG9yU3BhY2VPECcwLjE4Nzg0MTM5NzcgMC41MTU4NjQxNTgyIDAuMjI2NzI3MjQ4MQCAFoAY0lkKWltUTlNJRBABgBfSMDFdXlxOU0NvbG9yU3BhY2WiXzRcTlNDb2xvclNwYWNl0jAxYWJXTlNDb2xvcqJhNNIwMUtkoks00jAxZmdfEBJOU0F0dHJpYnV0ZWRTdHJpbmeiaDRfEBJOU0F0dHJpYnV0ZWRTdHJpbmdfEA9OU0tleWVkQXJjaGl2ZXLRa2xUcm9vdIABAAgAEQAaACMALQAyADcAVQBbAGIAawByAH8AgQCDAIUAlwCeAKYAsQC2ALgAugC8AL4AwwDFAMcAyQDLAM0A4AECAQkBEQEcAScBMwFAAWIBZAFmAWgBagFsAXEBcgF0AXkBhAGNAZUBmAGhAaYBuQG8AcEB3gHgAeIB6QHsAe4B8AHzAfUB9wH5Ag8CJQIuAkECRgJcAmACbQJyAoUCiAKbAqQCrQKzAsAC1QL/AwEDAwMIAw0DDwMRAxYDIwMmAzMDOANAA0MDSANLA1ADZQNoA30DjwOSA5cAAAAAAAACAQAAAAAAAABtAAAAAAAAAAAAAAAAAAADmQ==
    //   }
    // },
    automaticallyDrawOnUnderlyingPath: false,
    dontSynchroniseWithSymbol: false,
    glyphBounds: '{{0, 0}, {116, 17}}',
    heightIsClipped: false,
    lineSpacingBehaviour: 2,
    textBehaviour: 0
  };
}


