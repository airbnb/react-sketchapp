/* @flow */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render, View } from '../src';
import designSystem from './designSystem';
import type { DesignSystem } from './designSystem';

import Palette from './components/Palette';
import TypeSpecimen from './components/TypeSpecimen';
import Section from './components/Section';

const Document = ({ system }: { system: DesignSystem }) =>
  <View>
    <Section title="Type Styles">
      <View>
        { Object.keys(system.fonts).map(name =>
          <TypeSpecimen name={name} style={system.fonts[name]} />)
        }
      </View>
    </Section>

    <Section title="Color">
      <Palette colors={system.colors} />
    </Section>
  </View>;

const onRun = (context: any) => {
  render(
    <Document
      system={designSystem}
    />
  , context);
};

module.exports = onRun;
