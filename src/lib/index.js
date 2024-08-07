/**
 *	index.js: grunt-jsonfile
 *
 *  @module grunt-jsonfile
 *
 *//*
 *  © 2020, slashlib.org.
 *
 *  index.js  is distributed WITHOUT ANY WARRANTY; without even the implied
 *  warranty  of  MERCHANTABILITY  or  FITNESS  FOR  A PARTICULAR  PURPOSE.
 *
 */
"use strict";

/**
 *  Module initializer
 *  @ignore
 */
const _m = {
  const:    require( "./constants" ),
  tasks:    require( "./tasks"     )
}

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = {
  REGISTERMULTITASKJSONFILE:  "registerMultiTaskJSONFile"
}

/**
 *  Registers the 'jsonfile' multitask.
 *
 *  @param  {grunt} grunt
 */
function registerMultiTaskJSONFile( grunt ) {
  grunt.registerMultiTask( _m.const.TASKNAME_JSONFILE, _m.const.TASKDESCRIPTION_JSONFILE,
    /* istanbul ignore next */ function () {
      const task = this;
      const done = task.async();
      _m.tasks.runTaskJSONFile( grunt, task )
              .then((       ) => { done(); },
                    ( error ) => { grunt.log.error( error ); done( false ); });
  });
}

// Module exports:
Object.defineProperty( module.exports, _STRINGS.REGISTERMULTITASKJSONFILE, {
  value:    registerMultiTaskJSONFile,
  writable: false, enumerable: true, configurable: false });
