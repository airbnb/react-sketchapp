module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '/__tests__/jest/.*\\.(j|t)sx?$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/_book',
    '<rootDir>/lib',
    '<rootDir>/scratch',
    '<rootDir>/template',
    '<rootDir>/src',
    '<rootDir>/docs',
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
