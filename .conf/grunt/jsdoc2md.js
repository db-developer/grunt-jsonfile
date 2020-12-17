/**
 *  © 2020, db-developer.
 *  Licensed under the MIT license.
 */

// Note: This is used for running tests only!
module.exports = function ( grunt, options ) {
  return {
    api: {
      files: [{ src: `${ options.LIBDIR }/**/*.js`, dest: `${ options.APIDIR }/` }]
    }
  };
};
