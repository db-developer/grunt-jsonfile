/**
 *	lib/tasks/jsonfile.js: grunt-jsonfile/tasks
 *
 *  Internal implementation of the tasks handling logic for
 *  grunt-jsonfile.
 *
 *  ⚠ This module is NOT part of the public API surface.
 *  It may change at any time without semver guarantees.
 *
 *  External consumers MUST use `grunt-jsonfile/tasks` instead.
 *
 *  @module grunt-jsonfile/tasks/jsonfile
 *
 *//*
 *  © 2026, db-developer.
 *
 *  Distributed  WITHOUT  ANY WARRANTY;  without  even the  implied
 *  warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */
"use strict";

const options = require( "../options" );
const utils   = require( "../utils"   );

/**
 *  Resolve the effective JSON template for a grunt-jsonfile target.
 *
 *  Resolution strategy:
 *
 *  1. If no template is defined for the target, an empty object literal
 *     is returned.
 *
 *  2. If `targetconfig.template` is an object literal, a deep clone of
 *     that object is returned.
 *
 *  3. If `targetconfig.template` is a string:
 *     a) It is resolved against `options.templates`.
 *     b) If the resolved value is an object, a deep clone is returned.
 *     c) If the resolved value is of unsupported type, or if resolution
 *        fails, the original string will be treated as a file path.
 *
 *  Returned objects are deep-cloned using `structuredClone` in order to
 *  guarantee target isolation and prevent cross-target side effects.
 *
 *  Note:
 *    - Node.js >= 20 is required, as set in package.json engines field.
 *
 *  @function module:grunt-jsonfile/tasks/jsonfile.getTemplate
 *  @param   {grunt}      grunt
 *  @param   {grunt.task} task
 *  @param   {Object}     targetconfig
 *  @returns {Object} A JSON object template.
 */
module.exports.getTemplate = function getTemplate( grunt, task, targetconfig ) {
  if ( !targetconfig?.template ) { return {}}

  const reference = targetconfig.template;

  if ( utils.isPlainObject( reference )) {
       return structuredClone(reference);
  }
  else if ( utils.isString( reference )) {
       const resolved = options.getTemplateReferenceFromOptions( grunt, task, reference );

       if ( utils.isPlainObject( resolved )) {
            return structuredClone( resolved );
       }
       else return grunt.file.readJSON( reference );
  }
  else return {};
};

/**
 *  Assigns all enumerable own properties from `source` to `destination`.
 *
 *  This function mutates the `destination` object in place and returns it.
 *  It performs a deep copy of the `source` object via `structuredClone`, meaning that 
 *  nested objects or arrays are cloned, ensuring that the original `source` remains
 *  unmodified under all circumstances.
 *
 *  Use this function to apply a set of key/value pairs to an existing
 *  object. It is intended for cases where you want to merge configuration
 *  objects, patch existing data structures, or apply updates without
 *  creating side-effects between Grunt targets.
 *
 *  Important considerations:
 *    - Only enumerable own properties of `source` are copied.
 *    - The prototype of `source` is ignored.
 *    - Nested objects and arrays are deep-cloned; modifying them in `destination`
 *      will not affect `source`.
 *    - Non-clonable values (e.g., functions, DOM elements) will throw errors
 *      from `structuredClone`. This is expected, as the function assumes JSON-like
 *      structures typical for Grunt plugin configurations and JSON files.
 *
 *  @function module:grunt-jsonfile/tasks/jsonfile.setValues
 *  @param    {Object} destination - The target object that will be mutated by receiving new key/value pairs.
 *  @param    {Object} source      - The object containing key/value pairs to set on `destination`.
 *  @returns  {Object} The mutated `destination` object.
 */
module.exports.setValues = function setValues( destination, source ) {
  if ( ! utils.isPlainObject( destination )) {
        throw new TypeError( "set values: Destination must be a plain object." );
  }
  if ( ! source ) {
       return destination; // No changes if source is not a plain object
  }
  else if ( ! utils.isPlainObject( source )) {
       throw new TypeError( "set values: Source must be a plain object." );
  }
  else return Object.assign( destination, structuredClone( source ));
}

/**
 *  Deeply merges properties from `source` into `destination`.
 *
 *  This function mutates `destination` in place and returns it.
 *  It performs a recursive merge for plain objects and applies
 *  special handling for arrays and deletion semantics.
 *
 *  Merge rules:
 *
 *  1. If a property in `source` is `undefined`, the corresponding
 *     property is deleted from `destination`.
 *
 *  2. If both `destination[key]` and `source[key]` are plain objects,
 *     they are recursively merged.
 *
 *  3. If both values are arrays, the arrays are merged by appending
 *     values from `source` that are not already present in the
 *     `destination` array. Equality is determined using JavaScript's
 *     `SameValueZero` comparison semantics (the same behavior as
 *     `Array.prototype.includes`). As a result:
 *
 *        - Primitive values already present in the destination array
 *          are not inserted again.
 *        - Object values are considered identical only if they refer
 *          to the same object reference.
 *        - Structurally equal but different object instances are
 *          treated as distinct values and will be appended.
 *
 *  4. In all other cases, the value from `source` replaces the value
 *     in `destination`. Replacement values are copied using
 *     `structuredClone` to prevent accidental mutation of the
 *     original source data.
 *
 *  This function is intended for merging JSON-like data structures
 *  used in the `grunt-jsonfile` task system.
 *
 *  Important considerations:
 *
 *  - Only enumerable own properties of `source` are processed.
 *  - `destination` must be a plain object.
 *  - `source` must be a plain object.
 *  - Nested objects are merged recursively.
 *  - Arrays are merged with duplicate prevention rather than
 *    simple concatenation.
 *  - Replacement values are cloned using `structuredClone`.
 *
 *  The merge implementation is designed to behave predictably for
 *  JSON-compatible data structures and has explicit handling for
 *  common edge cases such as nested merges, deletion semantics,
 *  array deduplication, and structured cloning constraints.
 *
 *  @function module:grunt-jsonfile/tasks/jsonfile.mergeValues
 *  @param   {Object} destination - The target object that will receive merged values.
 *  @param   {Object} source      - The object containing values that will be merged
 *                                  into `destination`.
 *  @returns {Object} The mutated `destination` object.
 *  @throws  {TypeError} If `destination` or `source` is not a plain object.
 */
module.exports.mergeValues = function mergeValues( destination, source ) {
  if (!utils.isPlainObject(destination)) {
    throw new TypeError("mergeValues: destination must be a plain object.");
  }

  if (!utils.isPlainObject(source)) {
    throw new TypeError("mergeValues: source must be a plain object.");
  }

  Object.keys(source).forEach((key) => {

    const srcVal = source[key];
    const dstVal = destination[key];

    if ( srcVal === undefined ) {
         delete destination[key];
    }
    else if (utils.isPlainObject(dstVal) && utils.isPlainObject(srcVal)) {
         module.exports.mergeValues(dstVal, srcVal);
    }
    else if (Array.isArray(dstVal) && Array.isArray(srcVal)) {
         destination[key] = Array.from(new Set([...dstVal, ...srcVal]));
    }
    else destination[key] = structuredClone(srcVal);
  });

  return destination;
}

/**
 *  Updates properties in `destination` using values from `source`.
 *
 *  This function mutates `destination` in place and returns it.
 *  It is intended for applying updates to JSON-like data structures
 *  used in the `grunt-jsonfile` task system.
 *
 *  Unlike `mergeValues`, this function does **not concatenate arrays**
 *  and does not attempt structural merges beyond plain objects.
 *  Values from `source` replace values in `destination`, except when
 *  both values are plain objects, in which case the update is applied
 *  recursively.
 *
 *  Update rules:
 *
 *  1. If a property in `source` is `undefined`, the corresponding
 *     property is deleted from `destination`.
 *
 *  2. If both `destination[key]` and `source[key]` are plain objects,
 *     the objects are updated recursively.
 *
 *  3. If both `destination[key]` and `source[key]` are arrays,
 *     the update is applied element-wise:
 *       - `undefined` in `source` deletes the corresponding element
 *         in `destination`.
 *       - Existing elements are replaced by the corresponding `source`
 *         element.
 *       - New elements are appended if the index does not exist in
 *         `destination`.
 *
 *  4. In all other cases, the value from `source` replaces the value
 *     in `destination`.
 *
 *  To avoid reference sharing between different task executions,
 *  assigned values are copied using `structuredClone`. This ensures
 *  that `source` remains unmodified and that no references from
 *  `source` are reused in `destination`.
 *
 *  If `structuredClone` encounters values that cannot be cloned
 *  (e.g. functions, certain host objects, or unsupported structures),
 *  the underlying cloning operation will throw an exception.
 *
 *  Important considerations:
 *
 *  - Only enumerable own properties of `source` are processed.
 *  - `destination` must be a plain object.
 *  - `source` must be a plain object.
 *  - Nested plain objects are updated recursively.
 *  - Arrays are updated element-wise according to the rules above.
 *  - `destination` is mutated and returned.
 *
 *  @function module:grunt-jsonfile/tasks/jsonfile.updateValues
 *  @param   {Object} destination - The target object that will receive updated values.
 *  @param   {Object} source      - The object containing values that will be applied
 *                                  to `destination`.
 *  @returns {Object} The mutated `destination` object.
 *  @throws  {TypeError} If `destination` or `source` is not a plain object.
 */
module.exports.updateValues = function updateValues( destination, source ) {
  if (!utils.isPlainObject(destination)) {
    throw new TypeError("updateValues: destination must be a plain object.");
  }

  if (!utils.isPlainObject(source)) {
    throw new TypeError("updateValues: source must be a plain object.");
  }

  Object.keys(source).forEach((key) => {
    const srcVal = source[key];
    const dstVal = destination[key];

    if (srcVal === undefined) {
      // Delete key if value is explicitly undefined
      delete destination[key];
    } 
    else if (utils.isPlainObject(dstVal) && utils.isPlainObject(srcVal)) {
      // Recursive update for nested objects
      module.exports.updateValues(dstVal, srcVal);
    } 
    else if (Array.isArray(dstVal) && Array.isArray(srcVal)) {
      // Index-based array update
      const updatedArray = dstVal.slice(); // copy destination
      srcVal.forEach((item, index) => {
        if (item === undefined) {
          // delete the element at index (skip it)
          updatedArray[index] = undefined;
        } else {
          // replace or append
          updatedArray[index] = structuredClone(item);
        }
      });
      // Remove all undefined entries (deleted elements)
      destination[key] = updatedArray.filter((el) => el !== undefined);
    } 
    else {
      // Replace primitive / function / other
      destination[key] = structuredClone(srcVal);
    }
  });

  return destination;
}

/**
 *  Return a promise for executing
 *    'node --[node opts] nyc --[nyc opts] mocha --[mocha opts]'
 *
 *  @param  {grunt}       grunt the runtime 'instance' of grunt.
 *  @param  {grunt.task}  task  the current task
 */
module.exports.runTask = function runTask( grunt, task ) {
  const targetconfig = task.data || /* istanbul ignore next */ { };

  let   jsontemplate = module.exports.getTemplate( grunt, task, targetconfig );

  if ( targetconfig && ( targetconfig.set )) {
        module.exports.setValues( jsontemplate, targetconfig.set );
  }

  if ( targetconfig && ( targetconfig.merge )) {
        module.exports.mergeValues( jsontemplate, targetconfig.merge );
  }

  if ( targetconfig && ( targetconfig.update )) {
        module.exports.updateValues( jsontemplate, targetconfig.update );
  }

  let destinations = targetconfig.dest || /* istanbul ignore next */ `${ task.target }.json`;
  let eof          = options.getEOF( grunt, task );
  if ( ! Array.isArray( destinations )) { destinations = [ destinations ]; }
  destinations.forEach( function( destfile ) {
    grunt.file.write( destfile, JSON.stringify( jsontemplate, null, 2 ) + eof );
  });
}
