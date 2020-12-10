/*
 *	options/jsonfile.js: grunt-jsonfile
 *
 *  © 2020, slashlib.org.
 *
 *  options/jsonfile.js  is distributed WITHOUT ANY WARRANTY; without even the
 *  implied  warranty of MERCHANTABILITY or  FITNESS FOR A PARTICULAR PURPOSE.
 *
 *//* eslint-disable-next-line */
"use strict";

const _m       = { lib:   require( "../lib" ) };

const _STRINGS = {
  GETOPTIONS:             "getOptions",
  GETTEMPLATEFROMOPTIONS: "getTemplateFromOptions"
};

/**
 *  Returns grunt task specific options for 'jsonfile'.
 *
 *  @param  {grunt.task}  task
 *
 *  @return {Object}  'nyc_mocha' options for grunt task
 */
function getOptions( grunt, task ) {
  return task.options();
}

/**
 *  Load json template by name.
 *
 *  @param  {grunt}       grunt
 *  @param  {grunt.task}  task
 *  @param  {string}      templatename to load.
 */
function getTemplateFromOptions( grunt, task, templatename ) {
  const options = getOptions( grunt, task );
  /* istanbul ignore if */
  if ( ! options.templates ) { return null; }

  let template = options.templates[ templatename ];
  if ( _m.lib.isString( template )) {
       return grunt.file.readJSON( template );
  }
  else { return template; }
}

/* eslint-disable */
// Module exports:
Object.defineProperty( module.exports, _STRINGS.GETTEMPLATEFROMOPTIONS, {
       value:    getTemplateFromOptions,
       writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.GETOPTIONS,     {
       value:    getOptions,
       writable: false, enumerable: true, configurable: false });
/* eslint-enable */
