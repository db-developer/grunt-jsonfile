/**
 *  © 2020, db-developer.
 *  Licensed under the MIT license.
 */
"use strict";

/**
 *  Returns true if value is of type string.
 *
 *  @param    value {any}
 *  @Returns  true, if value is of type string; false otherwise.
 */
function isString( value ) {
  return ( typeof value === 'string' ) || ( value instanceof String );
}

/**
 *  Returns true if value is of type number.
 *
 *  @param    value {any}
 *  @Returns  true, if value is of type number; false otherwise.
 */
function isNumber( value ) {
  return ! isNaN( parseFloat( value )) && isFinite( value );
}

/**
 *  Load json template by name.
 *
 *  @param  grunt         {object}
 *  @param  taskoptions   {object}
 *  @param  templatename  {string}  name of the template to load.
 */
function getTemplateFromOptions( grunt, taskoptions, templatename ) {
  if ( ! taskoptions.templates ) { return null; }

  let template = taskoptions.templates[ templatename ];
  if ( isString( template )) {
       return grunt.file.readJSON( template );
  }
  else { return template; }
}

/**
 *  Load json template by reference specified in target configuration.
 *
 *  @param  grunt         {object}
 *  @param  taskoptions   {object}
 *  @param  targetconfig  {object}
 */
function getTemplate( grunt, taskoptions, targetconfig ) {
  if ( ! targetconfig.template ) { return { }; }
  if ( isString( targetconfig.template )) {
       let template = getTemplateFromOptions( grunt, taskoptions, targetconfig.template );
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
        ( isString( target[ key ]) || isNumber( target[ key ]) || Array.isArray( target[ key ]))) {
          if ( container[ key ]) { target[ key ] = container[ key ]; }
          else { delete target[ key ]; }
    }
    else if (( target[ key ]) && ( container[ key ] === null )) { delete target[ key ]; }
    else if (( ! ( target[ key ] instanceof Function )) && ( ! ( container[ key ] instanceof Function ))) {
          mergeValues( target[ key ], container[ key ]);
    }
  });
}

/**
 *  Called by grunt to create modified json files.
 *
 *  @param grunt        {object}
 *  @param taskconfig   {object} config data for/of task
 *  @param target       {string} name of target currently run
 *  @param targetconfig {object} config data for/of target
 *  @return json {object} for testing purposes only.
 */
function gruntMultiTask( grunt, taskconfig, target, targetconfig ) {

  let jsontemplate = getTemplate( grunt, taskconfig.options, targetconfig );
      jsontemplate = ( targetconfig && ( targetconfig.set )) ?
                       Object.assign( jsontemplate, targetconfig.set ) : jsontemplate;

  /* istanbul ignore else: not required/nothing to do for else */
  if ( targetconfig && ( targetconfig.merge )) {
       mergeValues( jsontemplate, targetconfig.merge );
  }

  let destinations = targetconfig.dest || `${ target }.json`;
  if ( ! Array.isArray( destinations )) { destinations = [ destinations ]; }
  destinations.forEach( function( destfile ) {
    grunt.file.write( destfile, JSON.stringify( jsontemplate, null, 2 ));
  });

  // return modified jsontemplate for _testing_ purposes.
  //        this return ist not required by a calling grunt task.
  return jsontemplate;
}

/* eslint-disable */
// Module exports:
Object.defineProperty( module.exports, "isString",               {
       value: isString,               writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, "isNumber",               {
       value: isNumber,               writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, "getTemplateFromOptions", {
       value: getTemplateFromOptions, writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, "getTemplate",            {
       value: getTemplate,            writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, "mergeValues",            {
       value: mergeValues,            writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, "gruntMultiTask",         {
       value: gruntMultiTask,         writable: false, enumerable: true, configurable: false });
/* eslint-enable */
