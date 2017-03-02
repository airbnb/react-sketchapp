import jsonRenderers from './jsonRenderers';

export function translateJSONToLayer(json) {
  const decoded = MSJSONDictionaryUnarchiver.alloc().initForReadingFromDictionary(json).decodeRoot();
  const mutableClass = decoded.class().mutableClass();
  log("decoded for class " + mutableClass);
  log(decoded);
  log("model");
  const model = mutableClass.alloc().initWithImmutableModelObject(decoded);
  log(model);
  return model;
}

export const renderToSketchJSON = (node: TreeNode) => {

  const { type, style, textStyle, layout, value, props, children } = node;
  const Renderer = jsonRenderers[type];
  if (type !== 'artboard' && type !== 'view') {
    // Temporary broken hata
    log(`invalid type ${type}`);
    return null;    
  }
  if (Renderer == null) {
    throw new Error(`Could not find renderer for type '${type}'`);
  }

  const renderer = new Renderer();
  const groupLayer = renderer.renderGroupLayer(layout, style, textStyle, props, value);
  const backingLayers = renderer.renderBackingLayers(layout, style, textStyle, props, value);

  const sublayers = children.map(child => renderToSketchJSON(child));

  log("groupData:");
  log(groupLayer);
  // return testData;

  // Filter out anything null, undefined
  const layers = [...sublayers, ...backingLayers].filter(l => l);
  log("sublayers:");
  log(layers);

  return {...groupLayer};
}


