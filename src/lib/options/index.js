/**
 *	index.js: grunt-jsonfile/options
 *
 *  @module grunt-jsonfile/options
 *
 *//*
 *  © 2020, slashlib.org.
 *
 *  options/index.js  is distributed WITHOUT ANY WARRANTY;  without even the
 *  implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 */
"use strict";

/**
 *  Module initializer
 *  @ignore
 */
const _m = {
  jsonfile:   require( "./jsonfile" )
};

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = {
  GETOPTIONS: "getOptions"
};

// Module exports:
Object.defineProperty( module.exports, _STRINGS.GETOPTIONS, {
  value:    _m.jsonfile.getOptions,
  writable: false, enumerable: true, configurable: false });
