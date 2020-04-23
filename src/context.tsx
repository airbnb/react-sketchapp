import * as React from 'react';
import * as PropTypes from 'prop-types';

import { Style } from './stylesheet/types';

const initialArtboardState = {
  width: 0,
  height: 0,
  scale: 1,
  fontScale: 1,
};

export const ArtboardContext = React.createContext({
  state: initialArtboardState,
});

export const useWindowDimensions = () => {
  const { state } = React.useContext(ArtboardContext);
  const { width, height, scale, fontScale } = state || {};

  return { width, height, scale, fontScale };
};

const ArtboardPropTypes = {
  viewport: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    name: PropTypes.string,
    scale: PropTypes.number,
    fontScale: PropTypes.number,
  }),
  children: PropTypes.node,
};

type ArtboardProps = PropTypes.InferProps<typeof ArtboardPropTypes> & {
  children: any;
  style?: Style;
};

export const ArtboardProvider = ({ children, viewport, style }: ArtboardProps) => {
  if (!viewport) {
    return children;
  }

  const { state: oState } = React.useContext(ArtboardContext);

  const state = {
    ...oState,
    width: viewport.width || (style || {}).width || oState.width,
    height: viewport.height || (style || {}).height || oState.height,
    scale: viewport.scale || oState.scale,
    fontScale: viewport.fontScale || oState.scale,
  };

  return <ArtboardContext.Provider value={{ state }}>{children}</ArtboardContext.Provider>;
};
