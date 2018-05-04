import compose from '../../src/utils/compose';

test('simple example', () => {
  const toUpperCase = a => a.toUpperCase();
  const slice = a => a.slice(0, 5);
  const reverse = a =>
    a
      .split('')
      .reverse()
      .join('');
  const composed = compose(reverse, slice, toUpperCase);

  expect(composed('hello world')).toEqual('OLLEH');
});
