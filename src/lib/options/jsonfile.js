/**
 *	lib/options/jsonfile.js: grunt-jsonfile/options
 *
 *  Internal implementation of the options handling logic for
 *  grunt-jsonfile.
 *
 *  ⚠ This module is NOT part of the public API surface.
 *  It may change at any time without semver guarantees.
 *
 *  External consumers MUST use `grunt-jsonfile/options` instead.
 *
 *  @module grunt-jsonfile/options/jsonfile
 *
 *//*
 *  © 2026, db-developer.
 *
 *  Distributed  WITHOUT  ANY WARRANTY;  without  even the  implied
 *  warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */
"use strict";

const os    = require( "node:os"  );
const utils = require( "../utils" );

/**
 * An empty string constant used for EOF when options.EOF is false.
 * @ignore
 */
const EMPTY = "";

/**
 *  Default options
 *  @ignore
 */
const OPTIONS = { EOF: false }

/**
 *  Returns the effective configuration object for the current `jsonfile`
 *  Grunt task invocation.
 *
 *  This function merges the internally defined default options with the
 *  task-specific options provided via `task.options()`. The merge is
 *  shallow and follows `Object.assign` semantics:
 *
 *    - Default options are applied first.
 *    - Task options override defaults for matching keys.
 *    - Unknown keys provided by the task are preserved.
 *
 *  A new object instance is always returned. The internal default
 *  `OPTIONS` object is never mutated.
 *
 *  Merge characteristics:
 *
 *    - Shallow merge only (no deep cloning).
 *    - Nested objects are copied by reference.
 *    - Primitive values are copied by value.
 *
 *  Error behavior:
 *
 *    - Throws if `task` is `undefined` or if `task.options`
 *      is not callable (runtime error when invoking `task.options()`).
 *
 *  @function module:grunt-jsonfile/options/jsonfile.getOptions
 *  @param    {grunt}      grunt - The active Grunt runtime instance.
 *                                 (Currently unused but part of the public API.)
 *  @param    {grunt.task} task  - The Grunt task context providing `task.options()`.
 *  @returns  {Object}     A new object containing the merged task configuration.
 */
module.exports.getOptions = function getOptions( grunt, task ) {
  return Object.assign({ }, OPTIONS, task.options());
}

/**
 *  Resolves the effective end-of-file (EOF) sequence for the current
 *  `jsonfile` task invocation.
 *
 *  The returned value depends on the merged task options obtained via
 *  {@link module:grunt-jsonfile/options/jsonfile.getOptions}.
 *
 *  Behavior:
 *
 *    - If `options.EOF === true`, the platform-specific line terminator
 *      (`os.EOL`) is returned.
 *    - If `options.EOF === false` (default), an empty string is returned.
 *
 *  This function does not mutate any state. It strictly derives the
 *  EOF suffix from the effective task configuration.
 *
 *  Error behavior:
 *
 *    - Throws if `task` is `undefined` or does not expose a callable
 *      `options()` function (propagated from `getOptions`).
 *
 *  @function module:grunt-jsonfile/options/jsonfile.getEOF
 *  @param    {grunt}      grunt - The active Grunt runtime instance.
 *                                 (Currently unused but required by API.)
 *  @param    {grunt.task} task  - The Grunt task context providing `task.options()`.
 *  @returns  {string}     The platform-specific end-of-line sequence (`os.EOL`)
 *                         if enabled; otherwise an empty string.
 */
module.exports.getEOF = function getEOF( grunt, task ) {
  const options = module.exports.getOptions( grunt, task );
  return options.EOF ? os.EOL : EMPTY;
}

/**
 *  Resolves and returns a JSON template reference by its logical name
 *  from the task configuration. A template reference must be cloned,
 *  before being modified, to avoid mutating the original template.
 *
 *  The template lookup is performed against the `templates` property
 *  of the merged task options (see
 *  {@link module:grunt-jsonfile/options/jsonfile.getOptions}).
 *
 *  Resolution behavior:
 *
 *    1. The given `templatename` is used as key in `options.templates`.
 *    2. If no template with that name exists, `null` is returned.
 *    3. If the resolved template value is a string, it is interpreted
 *       as a file path and loaded via `grunt.file.readJSON(...)`.
 *    4. If the resolved value is a plain object literal, it is returned
 *       as-is.
 *
 *  No deep cloning is performed. Objects stored in `options.templates`
 *  are returned by reference.
 *
 *  Error behavior:
 *
 *    - Throws if `task` is `undefined` or does not provide a callable
 *      `options()` function (propagated from `getOptions`).
 *    - Throws if `options.templates` is not a plain object.
 *    - Throws if the resolved template value is neither a plain object
 *      nor a string.
 *    - Throws if `grunt.file.readJSON` fails (e.g. invalid path or
 *      invalid JSON content).
 *
 *  @function module:grunt-jsonfile/options/jsonfile.getTemplateReferenceFromOptions
 *  @param    {grunt}       grunt        - The active Grunt runtime instance.
 *  @param    {grunt.task}  task         - The Grunt task context providing `task.options()`.
 *  @param    {string}      templatename - The logical template key to resolve.
 *  @returns  {Object|null} The resolved template object, or `null` if no template
 *                          with the given name exists.
 */
module.exports.getTemplateReferenceFromOptions = function getTemplateReferenceFromOptions( grunt, task, templatename ) {
  const options = module.exports.getOptions( grunt, task );

  if ( !utils.isPlainObject( options.templates )) { 
       throw new Error( `No templates defined in options. Cannot resolve template named '${ templatename }'.` );
  }

  const template = options.templates[ templatename ];

  if ( template === undefined ) {
       return null;
  }
  else if ( utils.isPlainObject( template )) {
       return template;
  }
  else if ( utils.isString( template )) {
       return grunt.file.readJSON( template );
  }
  else throw new Error( `JSON template named '${ templatename }' is of invalid type '${ typeof template }'.` );
}
