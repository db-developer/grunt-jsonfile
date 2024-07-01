/**
 *	options/jsonfile.js: grunt-jsonfile
 *
 *  @module grunt-jsonfile/options/jsonfile
 *
 *//*
 *  © 2020, slashlib.org.
 *
 *  options/jsonfile.js  is distributed WITHOUT ANY WARRANTY; without even the
 *  implied  warranty of MERCHANTABILITY or  FITNESS FOR A PARTICULAR PURPOSE.
 *
 */
"use strict";

/**
 *  Module initializer
 *  @ignore
 */
const _m = {
  os:     require( "os" ),
  lib:    require( "../lib" )
};

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = {
  EMPTY:                  "",
  GETEOF:                 "getEOF",
  GETOPTIONS:             "getOptions",
  GETTEMPLATEFROMOPTIONS: "getTemplateFromOptions"
};

/**
 *  Default options
 */
const _OPTIONS = { EOF: false }

/**
 *  Returns grunt task specific options for 'jsonfile'.
 *
 *  @param  {grunt}       grunt
 *  @param  {grunt.task}  task
 *
 *  @return {Object}  'nyc_mocha' options for grunt task
 */
function getOptions( grunt, task ) {
  const  options   = JSON.parse( JSON.stringify( _OPTIONS ));
  return Object.assign( options, task.options());
}

/**
 *  Returns EOF (end of file) from options.
 *  If options.EOF is true this function will return the os
 *  specific EOL.
 *
 *  @param  {grunt}       grunt
 *  @param  {grunt.task}  task
 *
 *  @return {string} wich either is an empty string or an 'end of line'
 */
function getEOF( grunt, task ) {
  const options = getOptions( grunt, task );
  return options.EOF ? _m.os.EOL : /*istanbul ignore next */ _STRINGS.EMPTY;
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

// Module exports:
Object.defineProperty( module.exports, _STRINGS.GETEOF, {
  value:    getEOF,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.GETTEMPLATEFROMOPTIONS, {
  value:    getTemplateFromOptions,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.GETOPTIONS,     {
  value:    getOptions,
  writable: false, enumerable: true, configurable: false });
