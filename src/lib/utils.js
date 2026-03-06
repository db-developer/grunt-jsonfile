/**
 *	lib/utils.js: grunt-jsonfile
 *
 *  @module grunt-jsonfile/utils
 *
 *//*
 *  © 2026, db-developer.
 *
 *  Distributed  WITHOUT  ANY WARRANTY;  without  even the  implied
 *  warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */
"use strict";

/**
 *  Determines whether the given value is a plain object literal.
 *
 *  This function strictly detects plain object literals (e.g. `{ ... }`).
 *  It excludes arrays, dates, maps, sets, class instances, buffers,
 *  and all other non-plain object types.
 *
 *  ⚠ Objects created via `Object.create(null)` are NOT considered plain
 *  objects by this implementation because their prototype is `null`.
 *
 *  @example
 *    isPlainObject({})                  // true
 *    isPlainObject(Object.create(null)) // false
 *    isPlainObject([])                  // false
 *    isPlainObject(new Date())          // false
 * 
 *  @function module:grunt-jsonfile/utils.isPlainObject
 *  @param    {*} value - The value to test.
 *  @returns  {boolean} Returns `true` if `value` is a non-null object whose
 *                      prototype is exactly `Object.prototype`; otherwise `false`.
 */
module.exports.isPlainObject = function isPlainObject( value ) {
  if ( typeof value !== "object" || value === null ) {
       return false;
  }
  else return Object.getPrototypeOf( value ) === Object.prototype;
}

/**
 *  Determines whether a given value is a JavaScript primitive.
 *
 *  A value is considered primitive if it is `null` or if its
 *  `typeof` is neither `"object"` nor `"function"`.
 *
 *  This includes:
 *  - `string`
 *  - `number`
 *  - `boolean`
 *  - `bigint`
 *  - `symbol`
 *  - `undefined`
 *  - `null`
 *
 *  Note that boxed primitives (e.g. `new String("x")`) are
 *  objects and therefore not considered primitive.
 *
 *  @function module:grunt-jsonfile/utils.isPrimitive
 *  @param {*} value - The value to test.
 *  @returns {boolean} Returns `true` if the value is primitive; otherwise `false`.
 */
module.exports.isPrimitive = function isPrimitive( value ) {
  return ( value === null ) || ( typeof value !== "object" && typeof value !== "function" );
}

/**
 *  Determines whether a given value represents a JavaScript string.
 *
 *  This function returns `true` for:
 *    - String primitives (`typeof value === "string"`)
 *    - Boxed String objects created via `new String(...)`
 *
 *  The helper is intentionally tolerant in order to support both:
 *
 *    1. Validation of existing JSON data structures.
 *    2. Validation of values that are not yet serialized but are
 *       intended to be written into JSON output.
 *
 *  While boxed String objects are not valid JSON values themselves,
 *  they may occur in pre-serialization processing pipelines. This
 *  function therefore treats them as strings to ensure consistent
 *  handling before JSON conversion.
 *
 *  Note:
 *    - JSON itself only supports string primitives.
 *    - `new String("x")` is considered an object in JavaScript,
 *      but will serialize to a string when passed to `JSON.stringify`.
 *
 *  @function module:grunt-jsonfile/utils.isString
 *  @param    {*} value - The value to test.
 *  @returns  {boolean} Returns `true` if the value is a string primitive
 *                      or a boxed `String` instance; otherwise `false`.
 */
module.exports.isString = function isString( value ) {
  return ( typeof value === 'string' ) || ( value instanceof String );
}
