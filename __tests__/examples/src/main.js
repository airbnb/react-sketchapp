import * as React from 'react';
import sketch from 'sketch';
import { render, Document, Page } from 'react-sketchapp';

import { Document as BasicSetup } from '../../../examples/basic-setup/src/my-command';
import { Document as BasicSvg } from '../../../examples/basic-svg/src/my-command';
import { Document as Colors } from '../../../examples/colors/src/main';
import { App as Emotion } from '../../../examples/emotion/src/my-command';
import { Page as FormValidation } from '../../../examples/form-validation/src/main';

import formValidationData from '../../../examples/form-validation/src/data';

const pages = [
  {
    component: BasicSetup,
    name: 'Basic Setup',
    data: {
      colors: {
        Haus: '#F3F4F4',
        Night: '#333',
        Sur: '#96DBE4',
        'Sur Dark': '#24828F',
        Peach: '#EFADA0',
        'Peach Dark': '#E37059',
        Pear: '#93DAAB',
        'Pear Dark': '#2E854B',
      },
    },
  },
  {
    component: BasicSvg,
    name: 'Basic Svg',
  },
  {
    component: Colors,
    name: 'Colors',
    data: {
      colors: ['#01FFD8', '#C137E3', '#8702ED'],
      steps: 50,
    },
  },
  {
    component: Emotion,
    name: 'Emotion',
  },
  {
    component: FormValidation,
    name: 'Form Validation',
    data: {
      sessions: formValidationData,
    },
  },
];

const App = () => (
  <Document>
    {pages.map(({ name, component: Component, data }) => (
      <Page key={name} name={name}>
        <Component {...data} />
      </Page>
    ))}
  </Document>
);

export default () => {
  render(<App />, sketch.getSelectedDocument());
};
