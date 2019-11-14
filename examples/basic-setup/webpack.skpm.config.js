module.exports = config => {
  // eslint-disable-next-line no-param-reassign
  config.node = {
    console: false,
    global: false,
    process: true,
    __filename: 'mock',
    __dirname: 'mock',
    Buffer: false,
    setImmediate: false,
  };
};
