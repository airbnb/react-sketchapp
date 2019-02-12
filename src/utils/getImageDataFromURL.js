// @flow
import getSketchVersion from './getSketchVersion';
import sketchMethod from '../jsonUtils/sketchImpl/makeImageDataFromUrl';
import nodeMethod from '../jsonUtils/nodeImpl/makeImageDataFromUrl';

const makeImageDataFromUrl = (url: string): { data: string, sha1: string } => {
  if (getSketchVersion() === 'NodeJS') {
    return nodeMethod(url);
  }
  return sketchMethod(url);
};

export default makeImageDataFromUrl;
