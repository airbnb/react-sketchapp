import { colors, spacing, fontFamily, typeRamp } from '../../designSystem';

export default {
  formElement: {
    marginBottom: spacing.Medium,
  },
  label: {
    display: 'block',
    fontFamily,
    marginBottom: spacing.Small,
    fontSize: typeRamp.Medium - 2,
  },
  textbox: {
    boxSizing: 'border-box',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.Grey,
    backgroundColor: colors.White,
    fontFamily,
    fontSize: typeRamp.Medium,
    lineHeight: typeRamp.Medium,
    padding: spacing.Medium,
    width: 300,
  },
};
