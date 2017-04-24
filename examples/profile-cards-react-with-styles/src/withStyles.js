import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import { css, withStyles, ThemeProvider } from 'react-with-styles';
import { StyleSheet } from 'react-sketchapp';

import theme from './theme';

const Interface = {
  create(styleHash) {
    return StyleSheet.create(styleHash);
  },

  resolve(styles) {
    return { style: styles };
  },
};

ThemedStyleSheet.registerDefaultTheme(theme);
ThemedStyleSheet.registerInterface(Interface);

export { css, withStyles, ThemeProvider, ThemedStyleSheet };
