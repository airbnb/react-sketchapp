import { StyleSheet } from 'react-primitives';
import { spacing, fontFamily } from '../../designSystem';

export default {
  formElement: {
    marginBottom: spacing.Medium
  },
  label: {
    display: 'block',
    fontFamily: fontFamily,
    marginBottom: spacing.Small,
    fontSize: 14,
  },
  textbox: {
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    fontFamily: fontFamily,
    fontSize: 16,
    lineHeight: 14,
    padding: spacing.Medium,
    width: 260,
  }
};