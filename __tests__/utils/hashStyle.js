import hashStyle from '../../src/utils/hashStyle';

jest.mock('../../src/utils/murmurHash');

test('hashStyle', () => {
  const style = { foo: true, bar: true };
  expect(hashStyle(style)).toEqual('{"bar":true,"foo":true}');
});
