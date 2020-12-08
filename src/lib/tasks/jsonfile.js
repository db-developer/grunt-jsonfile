/*
 *	tasks/jsonfile.js: grunt-jsonfile
 *
 *  © 2020, slashlib.org.
 *
 *  tasks/jsonfile.js  is distributed WITHOUT ANY WARRANTY; without even the
 *  implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 *
 *//* eslint-disable-next-line */
"use strict";

const _m = {
  constants:      require( "../constants"        ),
  jsonfileopts:   require( "../options/jsonfile" ),
  lib:            require( "../lib" )
};

function _init_STRINGS() {
  const executejsonfile = "executeJSONFile";
  const missingproperty = "Missing property";

  return {
    ERROR_MSG_MISSING_OPTIONS:  `${ executejsonfile }: ${ missingproperty } 'options'.`,
    EXECUTEJSONFILE:            `${ executejsonfile }`,
    IGNORE:                     "ignore",
    INHERIT:                    "inherit",
    RUNTASKJSONFILE:            "runTaskJSONFile"
  };
}

const _STRINGS = _init_STRINGS();

/**
 *  Load json template by reference specified in target configuration.
 *
 *  @param  grunt         {object}
 *  @param  taskoptions   {object}
 *  @param  targetconfig  {object}
 */
function getTemplate( grunt, taskoptions, targetconfig ) {
  if ( ! targetconfig.template ) { return { }; }
  if ( _m.lib.isString( targetconfig.template )) {
       let template = _m.jsonfileopts.getTemplateFromOptions( grunt, taskoptions, targetconfig.template );
       return ( template ) ? template : grunt.file.readJSON( targetconfig.template );
  }
  else { return targetconfig.template; }
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
  Object.keys( container ).forEach( function( key /* , index */) {
    /* istanbul ignore else */
    if (( ! target[ key ]) ||
        ( _m.lib.isString( target[ key ]) ||
          _m.lib.isNumber( target[ key ]) ||
          Array.isArray( target[ key ])))  {
          if ( container[ key ]) { target[ key ] = container[ key ]; }
          else { delete target[ key ]; }
    }
    else if (( target[ key ]) && ( container[ key ] === null )) { delete target[ key ]; }
    else if (( ! ( target[ key ] instanceof Function )) && ( ! ( container[ key ] instanceof Function ))) {
          mergeValues( target[ key ], container[ key ]);
    }
  });
}


let   TASKCONFIG = undefined;

/**
 *  Return a promise for executing
 *    'node --[node opts] nyc --[nyc opts] mocha --[mocha opts]'
 *
 *  @param  {grunt}       grunt the runtime 'instance' of grunt.
 *  @param  {grunt.task}  task  the current task
 *  @param  {Object}      options of current target.
 */
function executeJSONFile( grunt, task, options ) {
  // provide default configuration
  if ( TASKCONFIG === undefined ) {
       TASKCONFIG = grunt.config()[ _m.constants.TASKNAME_JSONFILE ] || { };
  }

  return new Promise(( resolve, reject ) => {
    try {
      if ( ! options ) { throw new Error( _STRINGS.ERROR_MSG_MISSING_OPTIONS ); }
      const targetconfig = task.data || { };

      let jsontemplate = getTemplate( grunt, options, targetconfig );
          jsontemplate = ( targetconfig && ( targetconfig.set )) ?
                           Object.assign( jsontemplate, targetconfig.set ) : jsontemplate;

      /* istanbul ignore else: not required/nothing to do for else */
      if ( targetconfig && ( targetconfig.merge )) {
           mergeValues( jsontemplate, targetconfig.merge );
      }

      let destinations = targetconfig.dest || `${ task.target }.json`;
      if ( ! Array.isArray( destinations )) { destinations = [ destinations ]; }
      destinations.forEach( function( destfile ) {
        grunt.file.write( destfile, JSON.stringify( jsontemplate, null, 2 ));
      });

      // return modified jsontemplate for _testing_ purposes.
      //        this return ist not required by a calling grunt task.
      resolve( jsontemplate );
    }
    catch( error ) { reject( error ); }
  });
}

/**
 *  @return {Promise} ... required by callee to terminate async call (on "then")
 */
function runTaskJSONFile( grunt, task ) {
  let    promise = _m.jsonfileopts.getOptions( grunt, task );
         promise = promise.then(( options ) => {
                     return executeJSONFile( grunt, task, options );
                   });
  return promise;
}

/* eslint-disable */
// Module exports:
Object.defineProperty( module.exports, _STRINGS.EXECUTEJSONFILE,  {
       value:    executeJSONFile,
       writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.RUNTASKJSONFILE,  {
       value:    runTaskJSONFile,
       writable: false, enumerable: true, configurable: false });
/* eslint-enable */
