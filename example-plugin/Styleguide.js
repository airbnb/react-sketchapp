/* @flow */
/* eslint-disable react/jsx-filename-extension, import/no-named-as-default-member */

import React from 'react';
import { render, View } from '../src';
import designSystem from './designSystem';
import type { DesignSystem } from './designSystem';

import Palette from './components/Palette';
import TypeSpecimen from './components/TypeSpecimen';
import Section from './components/Section';
import SharedStyles from '../src/components/SharedStyles';

const Document = ({ system }: { system: DesignSystem }) =>
  <View>
    <Section title="Type Styles">
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
    </Section>

    <Section title="DLS Color Palette">
      <Palette colors={system.colors} />
    </Section>
  </View>;

const onRun = (context: any) => {
  render(
    <SharedStyles styles={designSystem.fonts} clearExistingStyles>
      <Document
        system={designSystem}
      />
    </SharedStyles>
  , context);
};

module.exports = onRun;
