/**
 *	index.js: grunt-jsonfile/tasks
 *
 *  @module grunt-jsonfile/tasks
 *
 *//*
 *  © 2020, slashlib.org.
 *
 *  tasks/index.js  is  distributed  WITHOUT ANY WARRANTY;  without even the
 *  implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 */
"use strict";

/**
 *  Module initializer
 *  @ignore
 */
const _m = {
  jsonfile:         require( "./jsonfile" )
};

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = {
  RUNTASKJSONFILE:  "runTaskJSONFile"
};

// Module exports:
Object.defineProperty( module.exports, _STRINGS.RUNTASKJSONFILE,  {
  value:    _m.jsonfile.runTaskJSONFile,
  writable: false, enumerable: true, configurable: false });
