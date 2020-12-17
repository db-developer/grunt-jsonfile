/**
 *  © 2020, db-developer.
 *  Licensed under the MIT license.
 */

module.exports = function ( grunt, options ) {
  return {
    api: {
      src: [ `${ options.LIBDIR }/**/*.js`, "README.md" ],
      options: {
        destination:  `${ options.DOCSDIR }/api.html`,
        template :    "node_modules/ink-docstrap/template",
        configure:    `${ options.CONFDIR }/ink-docstrap/jsdoc.conf.js`,
      }
    }
  }
};
