/* @flow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { keys } from 'ramda';
import { render } from '../src';
import designSystem from './designSystem';

import Palette from './components/Palette';
import View from './components/View';
import TypeSpecimen from './components/TypeSpecimen';
import Section from './components/Section';

const Document = ({ fonts, colors }: any) =>
  <View>
    <Section title="Type Styles">
      <View>
        { keys(fonts).map(name =>
          <TypeSpecimen name={name} style={fonts[name]} />)
        }
      </View>
    </Section>

    <Section title="Color">
      <Palette colors={colors} />
    </Section>
  </View>;

const onRun = (context: any) => {
  render(
    <Document
      fonts={designSystem.fonts}
      colors={designSystem.colors}
    />
  , context);
};

module.exports = onRun;
