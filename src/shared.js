/* @flow */

export const alignment = {
  left: 0,
  right: 1,
  center: 2,
  full: 3,
};

export const initialize = (context: any): any => {
  const doc = context.document;
  const page = doc.currentPage();
  const artboard = page.currentArtboard();
  const selection = context.selection;

  return { doc, page, artboard, selection };
};

export const utils = {
  createLabel(frame: any, text: string): any {
    const label = NSTextField.alloc().initWithFrame(frame);
    label.setStringValue(text);
    label.setSelectable(false);
    label.setEditable(false);
    label.setBezeled(false);
    label.setDrawsBackground(false);
    return label;
  },

  dump(obj: any) {
    log('#####################################################################################');
    log(`## Dumping object ${obj}`);
    log(`## obj class is: ${obj.className()}`);
    log('#####################################################################################');
    log('obj.properties:');
    log(obj.class().mocha().properties());
    log('obj.propertiesWithAncestors:');
    log(obj.class().mocha().propertiesWithAncestors());
    log('obj.classMethods:');
    log(obj.class().mocha().classMethods());
    log('obj.classMethodsWithAncestors:');
    log(obj.class().mocha().classMethodsWithAncestors());
    log('obj.instanceMethods:');
    log(obj.class().mocha().instanceMethods());
    log('obj.instanceMethodsWithAncestors:');
    log(obj.class().mocha().instanceMethodsWithAncestors());
    log('obj.protocols:');
    log(obj.class().mocha().protocols());
    log('obj.protocolsWithAncestors:');
    log(obj.class().mocha().protocolsWithAncestors());
    log('obj.treeAsDictionary():');
    log(obj.treeAsDictionary());
  },
};

export type LayerFrame = {
  layer: any,
  padding?: number,
  backgroundColor?: string,
  locked?: boolean,
}
export const drawLayerFrame = ({
  layer,
  padding = 10,
  locked = false,
  backgroundColor = '#ffffff',
}: LayerFrame) => {
  const props = {
    name: `${layer.name()} BG`,
    x: layer.frame().x() - padding,
    y: layer.frame().y() - padding,
    width: layer.frame().width() + (padding * 2),
    height: layer.frame().height() + (padding * 2),
    locked,
    backgroundColor,
  };

  return drawRectangle(props);
};

export type Artboard = {
  name?: string,
  children?: any,
  paddingTop?: number,
  paddingRight?: number,
  paddingBottom?: number,
  paddingLeft?: number,
  backgroundColor?: string,
};
export const drawArtboard = (props: Artboard) => {
  const artboard = MSArtboardGroup.alloc().init();

  const x = props.x || 0;
  const y = props.y || 0;
  const paddingTop = props.paddingTop || 0;
  const paddingRight = props.paddingRight || 0;
  const paddingBottom = props.paddingBottom || 0;
  const paddingLeft = props.paddingLeft || 0;
  // const children = props.children || [];

  if (props.name) {
    artboard.setName(props.name);
  }

  if (props.children) {
    artboard.addLayers(props.children);
    // const childBounds = MSLayerGroup.groupBoundsForLayers(props.children);
    // artboard.frame = frameFromProps({
    //   x,
    //   y,
    //   width: childBounds.size.width + paddingLeft + paddingRight,
    //   height: childBounds.size.height + paddingTop + paddingBottom,
    // });
  }

  if (props.backgroundColor) {
    const background = colorFromString(props.backgroundColor);
    artboard.setBackgroundColor(background);
    artboard.hasBackgroundColor = true;
  }

  // if (props.paddingRight) {
  //   const frame = artboard.frame();
  //   frame.x = frame.x() - props.paddingRight;
  //   frame.width = frame.width() + props.paddingRight;
  // }
  //
  // if (props.paddingBottom) {
  //   const frame = artboard.frame();
  //   frame.y = frame.y() - props.paddingBottom;
  //   frame.height = frame.height() + props.paddingBottom;
  // }

  return artboard;
};

export type Frame = {
  x: number,
  y: number,
  width: number,
  height: number,
};

export const frameFromProps = ({ x, y, width, height }: Frame): any =>
  MSRect.rectWithRect(NSMakeRect(x, y, width, height));

// returns MSColor
export const colorFromString = (string: string): MSColor => {
  const str = NSString.stringWithFormat('%@', string);
  const c = str.colorFromHexColor();
  return MSColor.colorWithNSColor(c);
};

export const shapeGroup = (shape: any, props: { backgroundColor?: string, name?: string }) => {
  const group = MSShapeGroup.shapeWithPath(shape);
  const style = group.style().addStylePartOfType(0);
  style.color = colorFromString(props.backgroundColor || '#000');

  if (props.name) {
    group.name = props.name;
  }

  return group;
};

export type Rect = {
  name?: string,
  x: number,
  y: number,
  width: number,
  height: number,
  radius?: number,
  locked?: boolean,
  backgroundColor?: string,
}

export const drawRectangle = (props: Rect): any => {
  const rect = MSRectangleShape.alloc().init();
  rect.frame = frameFromProps(props);

  if (props.radius) {
    rect.cornerRadiusFloat = props.radius;
  }

  const layer = shapeGroup(rect, props);

  if (props.locked) {
    layer.setIsLocked(true);
  }

  return layer;
};

export type Oval = {
  name?: string,
  x: number,
  y: number,
  width: number,
  height: number,
  locked?: boolean,
  backgroundColor?: string,
}

export const drawOval = (props: Oval) => {
  const oval = MSOvalShape.alloc().init();
  oval.frame = frameFromProps(props);

  const layer = shapeGroup(oval, props);

  if (props.locked) {
    layer.setIsLocked(true);
  }

  return layer;
};

export type Group = {
  name?: string,
  x?: number,
  y?: number,
  locked?: boolean,
  clickThrough?: boolean,
  children: any[],
}
export const drawGroup = (props: Group): any => {
  const layer = MSLayerGroup.alloc().init();

  if (props.name) {
    layer.name = props.name;
  }

  layer.addLayers(props.children);
  layer.resizeToFitChildrenWithOption(1);

  if (props.x) {
    const frame = layer.frame();
    frame.setX(frame.x() + props.x);
  }

  if (props.y) {
    const frame = layer.frame();
    frame.setY(frame.y() + props.y);
  }

  if (props.locked) {
    layer.setIsLocked(true);
  }

  if (props.clickThrough) {
    layer.setHasClickThrough(true);
  }

  return layer;
};

export const addLayerToGroup = (group: any, layer: any) => {
  group.addLayers([
    layer,
  ]);
  return group;
};

export type Text = {
  name?: string,
  value: string,
  uppercase?: boolean,
  fontFamily: string,
  fontSize: number,
  color?: string,
  lineHeight?: number,
  opacity?: number,
  x?: number,
  y?: number,
  letterSpacing?: number,
  align?: 'left' | 'right' | 'center' | 'full',
  locked?: boolean,
}
export const drawText = (props: Text): any => {
  const layer = MSTextLayer.alloc().init();

  let value = props.value;
  if (props.uppercase) {
    value = props.value.toUpperCase();
  }

  layer.setStringValue(value);

  layer.setName(props.name || value);

  const font = NSFont.fontWithName_size(props.fontFamily, props.fontSize);
  layer.setFont(font);

  if (props.color) {
    layer.setTextColor(colorFromString(props.color));
  }

  if (props.lineHeight) {
    layer.setLineHeight(props.lineHeight);
  }

  if (props.x) {
    const frame = layer.frame();
    frame.setX(props.x);
  }

  if (props.y) {
    const frame = layer.frame();
    frame.setY(props.y);
  }

  if (props.letterSpacing) {
    layer.setCharacterSpacing(props.letterSpacing);
  }

  if (props.align) {
    layer.setTextAlignment(alignment[props.align]);
  }

  if (props.locked) {
    layer.setIsLocked(true);
  }

  if (props.opacity) {
    layer.style().contextSettings().opacity = props.opacity;
  }

  return layer;
};

export const addTextStyleFromLayer = (styles: any, layer: any) =>
  styles.addSharedStyleWithName_firstInstance(layer.name(), layer.style());

export function compact<T>(arr: Array<T>): Array<T> {
  return arr.filter(x => x !== undefined);
}
