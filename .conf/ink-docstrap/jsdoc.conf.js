/**
 *  © 2020, db-developer.
 *  Licensed under the MIT license.
 */
"use strict";

function jsdocconf() {
  const pkgjson    = require( "../../package.json" );

  return {
    tags: {
      allowUnknownTags: true
    },
    plugins:    [ "plugins/markdown" ],
    templates:  {
      includeDate:  false,
      "systemName": `${ pkgjson.name }`,
      "logoFile": "",
      "cleverLinks": false,
      "monospaceLinks": false,
      "dateFormat": "ddd MMM Do YYYY",
      "outputSourceFiles":  true,
      "outputSourcePath":   true,
      "footer":             `<center>api docs ${ pkgjson.name } version ${ pkgjson.version }</center>`,
      "copyright":          "copyright © 2020 db.developer@gmx.de",
      "navType":            "vertical",
      "theme": "slate",
      "linenums": true,
      "collapseSymbols": false,
      "inverseNav": true,
      "protocol": "html://",
      "methodHeadingReturns": false
    },
    markdown: {
      "parser": "gfm",
      "hardwrap": true
    }
  };
}

module.exports = jsdocconf()
