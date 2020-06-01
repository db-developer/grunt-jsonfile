/**
 *  © 2019, db-developer.
 *  Licensed under the MIT license.
 */
"use strict";

const COVERAGE    = "coverage";
const DIST        = "dist";
const GRUNTFILE   = "gruntfile.js";
const PACKAGEJSON = "package.json";
const PKGJSONOPT  = "pkgjson";
const REPORTS     = "reports";
const TASKS       = "tasks";


const COVERAGEDIR = `${ DIST }/${ COVERAGE }`;
const DISTDIR     = `${ DIST }`;
const REPORTSDIR  = `${ DIST }/${ REPORTS }`;
const TASKSDIR    = `${ TASKS }`;

module.exports = function( grunt ) {

  // set grunt options
  grunt.option( PKGJSONOPT,  grunt.file.readJSON( PACKAGEJSON ));

  const pkgname     = grunt.option( PKGJSONOPT ).name;
  const pkgversion  = grunt.option( PKGJSONOPT ).version;
  const pkgfilename = `${ pkgname }-${ pkgversion }.tgz`;

  grunt.initConfig({

    jshint: {
      all: [
        GRUNTFILE,
        `${ TASKSDIR }/*.js`
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    }, // end of jshint

    clean: {
      coverage: {
        src: [ `${ COVERAGEDIR }/` ]
      },
      reports: {
        src: [ `${ REPORTSDIR }/` ]
      },
      dist: {
        src: [ `${ DISTDIR }/` ]
      }
    }, // end of clean

    copy: {
      pkgfile_to_latest: {
        src:  pkgfilename,
        dest: `${ grunt.option( PKGJSONOPT ).name }-latest.tgz`
      }
    }, // end of copy

    mkdir: {
      all: {
        options: {
          create: [ DISTDIR ]
        }
      }
    }, // end of mkdir

    mocha_istanbul: {
      coverage: {
        src: "test",
        options: {
          timeout: 20000,
          "report-formats": "html",
          print: "summary",
          coverageFolder: COVERAGEDIR,
          check: {
            lines: 90,
            statements: 90,
            functions: 100,
            branches: 80
          }
        }
      }
    }, // end of mocha_istanbul

    mochaTest: {
      test: {
        options: {
          reporter: "spec"
        },
        src: [ "test/**/*.spec.js" ]
      }
    }, // end of mochaTest

    move: {
      pkgfiles_to_dist: {
        src:  "*.tgz",
        dest: `${ DISTDIR }/`
      }
    }, // end of move

    // create distributable package
    shell: {
      npm_pack: {
        command: "npm pack"
      }
    }
  }); // end of grunt.initConfig({ ... })

  grunt.loadNpmTasks( "grunt-contrib-clean"  );
  grunt.loadNpmTasks( "grunt-contrib-copy"   );
  grunt.loadNpmTasks( "grunt-contrib-jshint" );
  grunt.loadNpmTasks( "grunt-mkdir"          );
  grunt.loadNpmTasks( "grunt-mocha-istanbul" );
  grunt.loadNpmTasks( "grunt-mocha-test"     );
  grunt.loadNpmTasks( "grunt-move"           );
  grunt.loadNpmTasks( "grunt-shell"          );

  // run lint and all tests by default before packaging
  grunt.registerTask( "build",    [ "jshint", "clean", "mkdir", "shell:npm_pack",
                                    "copy:pkgfile_to_latest", "move:pkgfiles_to_dist" ]);

  // run lint and all tests by default before running the coverage
  grunt.registerTask( "coverage", [ "jshint", "clean", "mkdir", "mocha_istanbul:coverage" ]);

  // run lint and tests for testing only (travis_ci)
  grunt.registerTask( "test",     [ "jshint", "clean", "mkdir", "mochaTest:test" ]);

  // run lint and all tests by default before packaging
  grunt.registerTask( "all",      [ "jshint", "clean", "mkdir", "mochaTest:test",
                                    "mocha_istanbul:coverage", "shell:npm_pack", 
                                    "copy:pkgfile_to_latest", "move:pkgfiles_to_dist" ]);
};
