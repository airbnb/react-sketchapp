import sha1 from 'js-sha1';
import { getSketchVersion } from './getSketchVersion';
import sketchMethod from '../jsonUtils/sketchImpl/makeImageDataFromUrl';
import nodeMethod from '../jsonUtils/nodeImpl/makeImageDataFromUrl';

const makeImageDataFromUrl = (url?: string): { data: string; sha1: string } => {
  const data = getSketchVersion() === 'NodeJS' ? nodeMethod(url) : sketchMethod(url);

  return {
    data,
    sha1: sha1(data),
  };
};

export default makeImageDataFromUrl;
