/**
 *  © 2020, db-developer.
 *  Licensed under the MIT license.
 */

// Note: This is used for running tests only!
module.exports = function ( grunt, options ) {
  return {
    api: {
      options: {
        index: {
          dest: `${ options.APIDIR }/../api.index.md`
        }
      },
      files: [{ src: `${ options.LIBDIR }/**/*.js`, dest: `${ options.APIDIR }/` }]
    }
  };
};
