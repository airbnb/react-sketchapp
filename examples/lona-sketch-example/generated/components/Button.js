import React from 'react';
import { Text, View, StyleSheet, TextStyles } from 'react-sketchapp';

import colors from '../colors';
import textStyles from '../textStyles';

export default class Button extends React.Component {
  render() {
    let Text$text;
    let Text$textStyle;
    let View$backgroundColor;
    Text$textStyle = textStyles.button;
    View$backgroundColor = 'transparent';

    if (this.props.primary) {
      View$backgroundColor = colors.deeppurple600;
      Text$textStyle = textStyles.buttonPrimary;
    }
    Text$text = this.props.text;
    return (
      <View style={[styles.view, { backgroundColor: View$backgroundColor }]}>
        <Text style={[styles.text, Text$textStyle]}>{Text$text}</Text>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingRight: 25,
    paddingBottom: 8,
    paddingLeft: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.deeppurple600,
    height: 36,
  },
  text: { textAlign: 'center', ...TextStyles.get('button') },
});
