/**
 *  © 2019, db-developer.
 *  Licensed under the MIT license.
 */
"use strict";

const BUILD       = "build";
const PACKAGEJSON = "package.json";

module.exports = function( grunt ) {
  // set grunt options
  grunt.option( "pkgjson",  grunt.file.readJSON( PACKAGEJSON ));

  grunt.initConfig({

    jshint: {
      all: [
        "gruntfile.js",
        "tasks/*.js"
      ],
      options: {
        jshintrc: ".jshintrc"
      }
    }, // end of jshint

    jsonfile: {
      options: {
        templates: {
          one:  "package.json",
          two: {
            pname1:     5,
            pname2:     true,
            pname3:     "value",
            pname4:     `${ BUILD }`,
            aproperty:  "a aproperty will be deleted"
          },
          three: {
            compilerOptions: {
              // default typescript compiler options
              outDir                  : "xxx",
              target                  : "xxx",
              module                  : "xxx",
              moduleResolution        : "node",
              declaration             : true,
              // sourceMap              : true, // cannot be used together with inlineSourceMap
              inlineSourceMap         : true,
              inlineSources           : true,
              emitDecoratorMetadata   : true,
              experimentalDecorators  : true,
              importHelpers           : true,
              typeRoots               : [ "node_modules/@types", "lib/@types" ],
              lib                     : [ "dom", "es2018" ]
            },
            include : [ "../build/**/*.ts"   ],
            exclude : [ "../build/test/**/*" ]
          }
        }
      },
      target1: {
        template: "one",
        dest:     `${ BUILD }/target1.json`,
        set: {
          name:   "foo-bar-baz"
        },
        merge: {
          peerDependencies: null,
          devDependencies:  null
        }
      },
      target2: {
        template: "two",
        dest:     `${ BUILD }/target2.json`,
        set: {
          pname1: "value 5 replaced"
        },
        merge: {
          aproperty: null
        }
      },
      target3: {
        template: "three",
        dest:     [ `${ BUILD }/target3.1.json`,
                    `${ BUILD }/target3.2.json`,
                    `${ BUILD }/target3.3.json` ],
        set: {
          blubb1: "blubb1",
          blubb2: "blubb2"
        },
        merge: {
          compilerOptions: {
            fun   : "more fun",
            nofun : "no more fun"
          },
          blubb1: null
        },
      }
    }, // end of jsonfiles

    // deployment
    shell: {
      npm_pack: {
        command: "npm pack"
      },
      npm_move_win: {
        command: "move *.tgz ./dist/"
      }
    }
  }); // end of grunt.initConfig({ ... })

  // load this plugin's task(s) to run (test) them
  grunt.loadTasks( "tasks" );

  grunt.loadNpmTasks( "grunt-contrib-copy"     );
  grunt.loadNpmTasks( "grunt-contrib-jshint"   );
  grunt.loadNpmTasks( "grunt-shell"            );

  // run lint and all tests by default
  grunt.registerTask( "default", [ "jshint", "jsonfile", "shell:npm_pack", "shell:npm_move_win" ]);
};
