/*
 *	options/index.js: grunt-jsonfile
 *
 *  © 2020, slashlib.org.
 *
 *  options/index.js  is distributed WITHOUT ANY WARRANTY;  without even the
 *  implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 *//* eslint-disable-next-line */
"use strict";

const _m        = { jsonfile:   require( "./jsonfile" ) };
const _STRINGS  = { GETOPTIONS: "getOptions" };

/* eslint-disable */
// Module exports:
Object.defineProperty( module.exports, _STRINGS.GETOPTIONS, {
       value:    _m.jsonfile.getOptions,
       writable: false, enumerable: true, configurable: false });
/* eslint-enable */
