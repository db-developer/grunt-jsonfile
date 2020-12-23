/**
 *	lib.js: grunt-jsonfile
 *
 *  @module grunt-jsonfile/lib
 *
 *//*
 *  © 2020, slashlib.org.
 *
 *  index.js  is distributed WITHOUT ANY WARRANTY; without even the implied
 *  warranty  of  MERCHANTABILITY  or  FITNESS  FOR  A PARTICULAR  PURPOSE.
 *
 *//* eslint-disable-next-line */
"use strict";

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = {
  ISNUMBER:         "isNumber",
  ISSTRING:         "isString"
};

/**
 *  Returns true if value is of type string.
 *
 *  @param    {any} value - To be tested for being a string.
 *  @returns  true, if value is of type string; false otherwise.
 */
function isString( value ) {
  return ( typeof value === 'string' ) || ( value instanceof String );
}

/**
 *  Returns true if value is of type number.
 *
 *  @param    {any} value - To be tested for being a number.
 *  @Returns  true, if value is of type number; false otherwise.
 */
function isNumber( value ) {
  return ! isNaN( parseFloat( value )) && isFinite( value );
}


/* eslint-disable */
// Module exports:
Object.defineProperty( module.exports, _STRINGS.ISNUMBER,       {
       value:    isNumber,
       writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.ISSTRING,       {
       value:    isString,
       writable: false, enumerable: true, configurable: false });
/* eslint-enable */
