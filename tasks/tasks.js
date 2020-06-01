/**
 *  © 2019, db-developer.
 *  Licensed under the MIT license.
 */
"use strict";

const lib = require( "./lib" );

const TASKDESCRIPTION = require( "./constants" ).TASKDESCRIPTION;
const TASKNAME        = require( "./constants" ).TASKNAME;

// default configuration in case none is provided
const GRUNTEXTENSIONCONFIG = { };
const GRUNTTARGETCONFIG    = { };

module.exports = function( grunt ) {
  // provide default configuration
  const taskconfig = grunt.config()[ TASKNAME ] || GRUNTEXTENSIONCONFIG;

  grunt.task.registerMultiTask( TASKNAME, TASKDESCRIPTION, /* istanbul ignore next */ function() {
    const targetconfig = this.data || GRUNTTARGETCONFIG;
    lib.gruntMultiTask( grunt, taskconfig, this.target, targetconfig );
  });
};
