/* @flow */
/* eslint-disable react/jsx-filename-extension, import/no-named-as-default-member */

import React from 'react';
import { render, TextStyles, View } from '../src';
import designSystem from './designSystem';
import type { DesignSystem } from './designSystem';
import type { SketchContext } from '../src/types';

import Label from './components/Label';
import Palette from './components/Palette';
import Section from './components/Section';
import TypeSpecimen from './components/TypeSpecimen';

const borders = () => {
  const result = [];
  for (let top = 0; top < 4; top += 1) {
    for (let right = 0; right < 4; right += 1) {
      for (let bottom = 0; bottom < 4; bottom += 1) {
        for (let left = 0; left < 4; left += 1) {
          result.push({
            borderColor: 'red',
            height: 24,
            width: 24,
            borderTopWidth: top,
            borderRightWidth: right,
            borderBottomWidth: bottom,
            borderLeftWidth: left,
            marginRight: 8,
          });
        }
      }
    }
  }
  return result;
};

const Document = ({ system }: { system: DesignSystem }) =>
  <View>
    <View
      name="Intro"
      style={{ width: 420, marginBottom: system.spacing * 4 }}
    >
      <Label>
        This is an example react-sketchapp document, showing how to
        render a styleguide from a data representation of your design system.
      </Label>
    </View>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      { borders().map(border =>
        <View
          style={border}
        />)
      }
    </View>

    <Section title="Type Styles">
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
      { Object.keys(system.fonts).map(name =>
        <TypeSpecimen name={name} style={system.fonts[name]} />)
      }
    </Section>

    <Section title="Color Palette">
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
      <Palette colors={system.colors} />
    </Section>
  </View>;

const onRun = (context: SketchContext) => {
  TextStyles.create({
    context,
    clearExistingStyles: true,
  }, designSystem.fonts);

  render(
    <Document
      system={designSystem}
    />
  , context);
};

module.exports = onRun;
