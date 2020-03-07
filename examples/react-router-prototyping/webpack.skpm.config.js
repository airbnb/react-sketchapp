/* eslint-disable no-param-reassign */
/* eslint-disable func-names */

/**
 * Function that mutates original webpack config.
 * Supports asynchronous changes when promise is returned.
 *
 * @param {object} config - original webpack config.
 * @param {boolean} isPluginCommand - wether the config is for a plugin command or a resource
 */
module.exports = function (config) {
  /* you can change config here */

  config.resolve = {
    ...config.resolve,
    extensions: [...config.resolve.extensions, '.jsx'],
  };

};
