import sortObjectKeys from '../../../src/utils/sortObjectKeys';

test('simple example', () => {
  const a = {
    foo: true,
    bar: true,
    qux: true,
    baz: true,
  };

  const b = {
    bar: true,
    baz: true,
    foo: true,
    qux: true,
  };

  expect(sortObjectKeys(a)).toEqual(b);
});
