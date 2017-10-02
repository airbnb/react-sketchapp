/* eslint-disable global-require */
let ReactSketch;

describe('public API', () => {
  beforeEach(() => {
    // jest.resetModules();
    jest.mock('../src/jsonUtils/hacksForJSONImpl');
    ReactSketch = require('../src');
  });

  it('exports render', () => {
    expect(ReactSketch.render).toBeDefined();
  });
  it('exports renderToJSON', () => {
    expect(ReactSketch.renderToJSON).toBeDefined();
  });
  it('exports StyleSheet', () => {
    expect(ReactSketch.StyleSheet).toBeDefined();
  });
  it('exports Document', () => {
    expect(ReactSketch.Document).toBeDefined();
  });
  it('exports Page', () => {
    expect(ReactSketch.Page).toBeDefined();
  });
  it('exports Artboard', () => {
    expect(ReactSketch.Artboard).toBeDefined();
  });
  it('exports Image', () => {
    expect(ReactSketch.Image).toBeDefined();
  });
  it('exports RedBox', () => {
    expect(ReactSketch.RedBox).toBeDefined();
  });
  it('exports Text', () => {
    expect(ReactSketch.Text).toBeDefined();
  });
  it('exports TextStyles', () => {
    expect(ReactSketch.TextStyles).toBeDefined();
  });
  it('exports View', () => {
    expect(ReactSketch.View).toBeDefined();
  });
  it('exports Platform', () => {
    expect(ReactSketch.Platform).toBeDefined();
  });
});
