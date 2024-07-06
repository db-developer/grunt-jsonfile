/**
 *	tasks/jsonfile.js: grunt-jsonfile
 *
 *  @module grunt-jsonfile/tasks/jsonfile
 *
 *//*
 *  © 2020, slashlib.org.
 *
 *  tasks/jsonfile.js  is distributed WITHOUT ANY WARRANTY; without even the
 *  implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 */
"use strict";

/**
 *  Module initializer
 *  @ignore
 */
const _m = {
  constants:      require( "../constants"        ),
  jsonfileopts:   require( "../options/jsonfile" ),
  lib:            require( "../lib" )
};

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS =  {
  GETTEMPLATE:                "getTemplate",
  MERGEVALUES:                "mergeValues",
  RUNTASKJSONFILE:            "runTaskJSONFile",
  SETVALUES:                  "setValues",
  TYPE_OBJECT:                "object",
  TYPE_FUNCTION:              "function",
  UPDATEVALUES:               "updateValues"
};

/**
 *  Load json template by reference specified in target configuration.
 *
 *  @param  {grunt}       grunt
 *  @param  {grunt.task}  task
 *  @param  {object}      targetconfig
 */
function getTemplate( grunt, task, targetconfig ) {
  if (( ! targetconfig ) || ( ! targetconfig.template )) { return { }; }
  if ( _m.lib.isString( targetconfig.template )) {
       let template = _m.jsonfileopts.getTemplateFromOptions( grunt, task, targetconfig.template );
       return ( template ) ? template : grunt.file.readJSON( targetconfig.template );
  }
  else { return targetconfig.template; }
}

/**
 *  Set keys from container into target
 *
 *  @param  target    {object} a json object
 *  @param  container {object} a json object which holds key value pairs, which
 *                             are to be set to target.
 */
function setValues( target, container ) {
  return Object.assign( target, container );
}

/**
 *  Merge keys from container into target. Keys which are set to null
 *  within container, will be deleted from target.
 *
 *  Note: This is a "deep-deep" merge.
 *
 *  @param  target    {object} a json object
 *  @param  container {object} a json object which holds key value pairs, which
 *                             are to be merged into target.
 */
function mergeValues( target, container ) {
  if ( ! target ) { return; }
  container = container ? container : { };
  Object.keys( container ).forEach( function( key /* , index */) {
    if (( ! target[ key ]) ||
        ( _m.lib.isString( target[ key ]) ||
          _m.lib.isNumber( target[ key ])))  {
          if ( container[ key ] !== undefined ) { target[ key ] = container[ key ]; }
          else { delete target[ key ]; }
    }
    else if (( target[ key ]) && ( Array.isArray( target[ key ]))) {
          if ( Array.isArray( container[ key ])) { target[ key ] = [ ...target[ key ], ...container[ key ] ]}
          else { target[ key ] = container[ key ]}
    }
    else if (( target[ key ]) && ( container[ key ] === undefined )) { delete target[ key ]; }
    else if (( ! ( target[ key ] instanceof Function )) && ( ! ( container[ key ] instanceof Function ))) {
          mergeValues( target[ key ], container[ key ]);
    }
  });
  return target;
}

/**
 *  Update keys from container into target. Keys which are set to null
 *  within container, will be deleted from target. Keys that do not exist
 *  in the target will not be set.
 *
 *  Note: This is a "deep-deep" merge.
 *
 *  @param  target    {object} a json object
 *  @param  container {object} a json object which holds key value pairs,
 *                             which will be used to update the target.
 */
function updateValues( target, container ) {
  if ( ! target ) { return; }
  container = container ? container : { };
  Object.keys( container ).forEach( function( key /* , index */) {
    if (( target[ key ] === null      ) ||
        ( target[ key ] === undefined )) {
          return;
    }
    else if ( container[ key ] === undefined ) {
              target[ key ] = undefined;
    }
    else if ( container[ key ] === null ) {
              target[ key ] = null;
    }
    else if ( typeof( container[ key ]) === _STRINGS.TYPE_OBJECT ) {
         if (( ! Array.isArray(     container[ key ]    )) &&
             ( ! ( container[ key ] instanceof String   )) &&
             ( typeof( container[ key ]) !== _STRINGS.TYPE_FUNCTION ) &&
             ( ! ( container[ key ] instanceof Date     ))) {
               if ( typeof( target[ key ]) === _STRINGS.TYPE_OBJECT ) {
                    updateValues( target[ key ], container[ key ]);
               }
               else target[ key ] = container[ key ];
         }
         else  target[ key ] = container[ key ];
    }
    else target[ key ] = container[ key ];
  });
  return target;
}

/**
 *  Return a promise for executing
 *    'node --[node opts] nyc --[nyc opts] mocha --[mocha opts]'
 *
 *  @param  {grunt}       grunt the runtime 'instance' of grunt.
 *  @param  {grunt.task}  task  the current task
 */
function runTaskJSONFile( grunt, task ) {
  return new Promise(( resolve, reject ) => {
    try {
      const targetconfig = task.data || /* istanbul ignore next */ { };

      let   jsontemplate = getTemplate( grunt, task, targetconfig );

      if ( targetconfig && ( targetconfig.set )) {
           setValues( jsontemplate, targetconfig.set );
      }

      if ( targetconfig && ( targetconfig.merge )) {
           mergeValues( jsontemplate, targetconfig.merge );
      }

      if ( targetconfig && ( targetconfig.update )) {
           updateValues( jsontemplate, targetconfig.update );
      }

      let destinations = targetconfig.dest || /* istanbul ignore next */ `${ task.target }.json`;
      let eof          = _m.jsonfileopts.getEOF( grunt, task );
      if ( ! Array.isArray( destinations )) { destinations = [ destinations ]; }
      destinations.forEach( function( destfile ) {
        grunt.file.write( destfile, JSON.stringify( jsontemplate, null, 2 ) + eof );
      });

      // return modified jsontemplate for _testing_ purposes.
      //        this return ist not required by a calling grunt task.
      resolve( jsontemplate );
    }
    catch( error ) { reject( error ); }
  });
}

// Module exports:
Object.defineProperty( module.exports, _STRINGS.GETTEMPLATE,  {
  value:    getTemplate,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.MERGEVALUES,  {
  value:    mergeValues,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.RUNTASKJSONFILE,  {
  value:    runTaskJSONFile,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.SETVALUES,    {
  value:    setValues,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.UPDATEVALUES, {
  value:    updateValues,
  writable: false, enumerable: true, configurable: false });
