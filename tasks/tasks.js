/**
 *  © 2019, db-developer.
 *  Licensed under the MIT license.
 */
"use strict";

const TASKNAME        = "jsonfile";
const TASKDESCRIPTION = "generate *.json files";

// default configuration in case none is provided
const GRUNTEXTENSIONCONFIG = { };
const GRUNTTARGETCONFIG    = { };

function isString( value ) {
  return ( typeof value === 'string' ) || ( value instanceof String );
}

function isNumber( value ) {
  return ! isNaN( parseFloat( value )) && isFinite( value );
}

function getTemplateFromOptions( grunt, taskoptions, templatename ) {
  if ( ! taskoptions.templates ) { return null; }

  let template = taskoptions.templates[ templatename ];
  if ( isString( template )) {
       return grunt.file.readJSON( template );
  }
  else { return template; }
}

function getTemplate( grunt, taskoptions, targetconfig ) {
  if ( ! targetconfig.template ) { return { }; }
  if ( isString( targetconfig.template )) {
       let template = getTemplateFromOptions( grunt, taskoptions, targetconfig.template );
       return ( template ) ? template : grunt.file.readJSON( targetconfig.template );
  }
  else { return targetconfig.template; }
}

function mergeValues( target, container ) {
  Object.keys( container ).forEach( function( key /* , index */) {
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

module.exports = function( grunt ) {
  // provide default configuration
  let taskconfig = grunt.config()[ TASKNAME ] || GRUNTEXTENSIONCONFIG;

  grunt.task.registerMultiTask( TASKNAME, TASKDESCRIPTION, function() {
    // this.target <= name of target currently run
    // this.data   <= config data for/of target
    let targetconfig = this.data || GRUNTTARGETCONFIG;

    let jsontemplate = getTemplate( grunt, taskconfig.options, targetconfig );
        jsontemplate = ( targetconfig && ( targetconfig.set )) ?
                         Object.assign( jsontemplate, targetconfig.set ) : jsontemplate;

    if ( targetconfig && ( targetconfig.merge )) {
         mergeValues( jsontemplate, targetconfig.merge );
    }

    let destinations = targetconfig.dest || `${ this.target }.json`;
    if ( ! Array.isArray( destinations )) { destinations = [ destinations ]; }
    destinations.forEach( function( destfile ) {
      grunt.file.write( destfile, JSON.stringify( jsontemplate, null, 2 ));
    });
  });
};
