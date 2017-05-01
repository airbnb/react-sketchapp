import { StyleSheet } from 'react-primitives';
import { colors, spacing, fontFamily, typeRamp } from '../../designSystem';

export default {
  formElement: {
    marginBottom: spacing.Medium
  },
  label: {
    display: 'block',
    fontFamily: fontFamily,
    marginBottom: spacing.Small,
    fontSize: typeRamp.Medium - 2,
  },
  textbox: {
    boxSizing: 'border-box',
    backgroundColor: colors.White,
    fontFamily: fontFamily,
    fontSize: typeRamp.Medium,
    lineHeight: typeRamp.Medium,
    padding: spacing.Medium,
    width: 300,
  }
};