/**
 *	lib/options/index.js: grunt-jsonfile/options
 *
 *  Public options API of the grunt-jsonfile package.
 *
 *  This module exposes the stable, documented interface for resolving
 *  task options, EOF behavior, and JSON templates.
 *
 *  Consumers MUST depend on this module path instead of internal
 *  implementation files.
 *
 *  The underlying implementation is intentionally encapsulated and
 *  may change without notice.
 *
 *  @module grunt-jsonfile/options
 *
 *//*
 *  © 2026, db-developer.
 *
 *  Distributed  WITHOUT  ANY WARRANTY;  without  even the  implied
 *  warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 */
"use strict";

const jsonfile = require( "./jsonfile" );

/**
 *  Public API function that returns the effective configuration object
 *  for a `jsonfile` Grunt task invocation.
 *
 *  @function module:grunt-jsonfile/options.getOptions
 *  @see module:grunt-jsonfile/options/jsonfile.getOptions
 */
module.exports.getOptions = jsonfile.getOptions;

/**
 *  Public API function that resolves the effective end-of-file (EOF)
 *  sequence for a `jsonfile` task execution.
 *
 *  @function module:grunt-jsonfile/options.getEOF
 *  @see module:grunt-jsonfile/options/jsonfile.getEOF
 */
module.exports.getEOF = jsonfile.getEOF;

/**
 *  Public API function that resolves a named JSON template from the
 *  task configuration.
 *
 *  @function module:grunt-jsonfile/options.getTemplateReferenceFromOptions
 *  @see module:grunt-jsonfile/options/jsonfile.getTemplateReferenceFromOptions
 */
module.exports.getTemplateReferenceFromOptions = jsonfile.getTemplateReferenceFromOptions;
