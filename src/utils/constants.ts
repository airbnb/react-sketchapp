export const INHERITABLE_FONT_STYLES = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'textAlign',
  'textDecoration',
  'textShadowColor',
  'textShadowOffset',
  'textShadowOpacity',
  'textShadowRadius',
  'textShadowSpread',
  'textTransform',
  'letterSpacing',
  'lineHeight',
  'writingDirection',
  'paragraphSpacing',
] as const;

// Only components that are allowed as children of <Text> components
export const VALID_TEXT_CHILDREN_TYPES = ['text', 'sketch_text'];
