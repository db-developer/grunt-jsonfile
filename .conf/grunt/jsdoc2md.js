/**
 *  © 2020, db-developer.
 *  Licensed under the MIT license.
 */

// Note: This is used for running tests only!
module.exports = function ( grunt, options ) {
  return {
    api: {
      src:      `${ options.LIBDIR }/**/*.js`,
      dest:     `${ options.APIDIR }/`,
      options: {
        index: {
          dest: `${ options.APIDIR }/../api.index.md`
        }
      }
    }
  };
};
