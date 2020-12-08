const constants = require( "../tasks/constants.js" );
const lib       = require( "../tasks/lib.js"       );
const tasks     = require( "../tasks/tasks.js"     );

const assert    = require( "assert"                );
const grunt     = require( "grunt"                 );
const path      = require( "path"                  );

describe( "Testing package 'grunt-jsonfile'", function() {
  describe( "Module 'constants'", function() {
    it( "... should contain const 'TASKNAME'", function() {
      assert( constants.TASKNAME, "failed to locate const 'TASKNAME'" );
    });
    it( "... should contain const 'TASKDESCRIPTION'", function() {
      assert( constants.TASKDESCRIPTION, "failed to locate const 'TASKDESCRIPTION'" );
    });
  });
  describe( "Module 'lib'", function() {
    describe( "... should contain", function() {
      it( "function 'isString'", function() {
        assert( lib.isString, "failed to locate function 'isString'" );
      });
      it( "function 'isNumber'", function() {
        assert( lib.isNumber, "failed to locate function 'isNumber'" );
      });
      it( "function 'getTemplateFromOptions'", function() {
        assert( lib.getTemplateFromOptions, "failed to locate function 'getTemplateFromOptions'" );
      });
      it( "function 'getTemplate'", function() {
        assert( lib.getTemplate, "failed to locate function 'getTemplate'" );
      });
      it( "function 'mergeValues'", function() {
        assert( lib.mergeValues, "failed to locate function 'mergeValues'" );
      });
      it( "function 'gruntMultiTask'", function() {
        assert( lib.gruntMultiTask, "failed to locate function 'gruntMultiTask'" );
      });
    });
    describe( "Testing function 'isString'", function() {
      it( "it should identify 'string' as string", function() {
        assert( lib.isString( "string" ), "failed to identify 'string' as string." );
      });
      it( "it should identify String('string') as string", function() {
        assert( lib.isString( String( "string" )), "failed to identify String('string') as string." );
      });
    });
    describe( "Testing function 'isNumber'", function() {
      it( "it should identify 3 as number", function() {
        assert( lib.isNumber( 3 ), "failed to identify 3 as number." );
      });
    });
    describe( "Testing function 'getTemplateFromOptions'", function() {
      const tmpjsonfile = grunt.file.readJSON( "test/jsonfile.json" );
            tmpjsonfile.options.templates = null;
      it( "template 'one' should resolve to null without 'templates'", function() {
          const template = lib.getTemplateFromOptions( grunt, tmpjsonfile.options, "one" );
          assert( template === null, "failed to resolve template 'one' to null without 'templates'." );
      });
      const jsonfile = grunt.file.readJSON( "test/jsonfile.json" );
      it( "template 'one' should resolve to package.json {object}", function() {
          const template = lib.getTemplateFromOptions( grunt, jsonfile.options, "one" );
          const pkgjson  = grunt.file.readJSON( "package.json" );
          assert( JSON.stringify( template ) === JSON.stringify( pkgjson ), "failed to resolve template 'one' to package.json {object}." );
      });
      it( "template 'two' should resolve to {object} two.json", function() {
          const template = lib.getTemplateFromOptions( grunt, jsonfile.options, "two" );
          const twojson  = grunt.file.readJSON( "test/two.json" );
          assert( JSON.stringify( template ) === JSON.stringify( twojson ), "failed to resolve template 'two' to {object} two.json." );
      });
    });
    describe( "Testing function 'getTemplate'", function() {
      const tmpjsonfile = grunt.file.readJSON( "test/jsonfile.json" );
            tmpjsonfile.target1.template = null;
      it( "template of 'target1' should not resolve to null without 'template'", function() {
          const template = lib.getTemplate( grunt, tmpjsonfile.options, tmpjsonfile.target1 );
          assert( template, "failed to resolve template of 'target1' without 'template'." );
      });

      const jsonfile = grunt.file.readJSON( "test/jsonfile.json" );
      it( "template of 'target1' should resolve to package.json {object}", function() {
          const template = lib.getTemplate( grunt, jsonfile.options, jsonfile.target1 );
          const pkgjson  = grunt.file.readJSON( "package.json" );
          assert( JSON.stringify( template ) === JSON.stringify( pkgjson ), "failed to resolve template of 'target1' to package.json {object}." );
      });
      it( "template of 'target2' should resolve to {object} two.json", function() {
          const template = lib.getTemplate( grunt, jsonfile.options, jsonfile.target2 );
          const twojson  = grunt.file.readJSON( "test/two.json" );
          assert( JSON.stringify( template ) === JSON.stringify( twojson ), "failed to resolve template of 'target2' to {object} two.json." );
      });
      it( "template of 'target4' should resolve to {object} four.json", function() {
          const template = lib.getTemplate( grunt, jsonfile.options, jsonfile.target4 );
          const twojson  = grunt.file.readJSON( "test/four.json" );
          assert( JSON.stringify( template ) === JSON.stringify( twojson ), "failed to resolve template of 'target4' to {object} four.json." );
      });
      it( "template of 'target5' should resolve to {object} package.json", function() {
          const template = lib.getTemplate( grunt, jsonfile.options, jsonfile.target5 );
          const pkgjson  = grunt.file.readJSON( "package.json" );
          assert( JSON.stringify( template ) === JSON.stringify( pkgjson ), "failed to resolve template of 'target5' to {object} package.json." );
      });
    });
    describe( "Testing function 'mergeValues'", function() {
      const jsonfile    = grunt.file.readJSON( "test/jsonfile.json" );
      it( "template of 'target1' should merge to merged.package.json {object}", function() {
          const template = lib.getTemplate( grunt, jsonfile.options, jsonfile.target1 );
                           lib.mergeValues( template, jsonfile.target1.merge );
          const pkgjson  = grunt.file.readJSON( "test/merged.package.json" );
          assert( JSON.stringify( template ) === JSON.stringify( pkgjson ), "failed to merge template of 'target1' to merged.package.json {object}." );
      });
      it( "template of 'target2' should merge to merged.two.json {object}", function() {
          const template = lib.getTemplate( grunt, jsonfile.options, jsonfile.target2 );
                           lib.mergeValues( template, jsonfile.target2.merge );
          const twojson  = grunt.file.readJSON( "test/merged.two.json" );
          assert( JSON.stringify( template ) === JSON.stringify( twojson ), "failed to merge template of 'target2' to merged.two.json {object}." );
      });
      it( "template of 'target3' should merge to merged.three.json {object}", function() {
          const template  = lib.getTemplate( grunt, jsonfile.options, jsonfile.target3 );
                            lib.mergeValues( template, jsonfile.target3.merge );
          const threejson = grunt.file.readJSON( "test/merged.three.json" );
          assert( JSON.stringify( template ) === JSON.stringify( threejson ), "failed to merge template of 'target3' to merged.three.json {object}." );
      });
    });
    describe( "Testing function 'gruntMultiTask'", function() {
      const jsonfile    = grunt.file.readJSON( "test/jsonfile.json" );
      it( "template of 'target1' should morph to morphed.package.json {object}", function() {
          const gntjson = lib.gruntMultiTask( grunt, jsonfile, "dist/target1", jsonfile.target1 );
          const pkgjson = grunt.file.readJSON( "test/morphed.package.json" );
          assert( JSON.stringify( gntjson ) === JSON.stringify( pkgjson ), "failed to morph template of 'target1' to morphed.package.json {object}." );
      });
      it( "template of 'target2' should morph to morphed.two.json {object}", function() {
          const gntjson = lib.gruntMultiTask( grunt, jsonfile, "dist/target2", jsonfile.target2 );
          const twojson = grunt.file.readJSON( "test/morphed.two.json" );
          assert( JSON.stringify( gntjson ) === JSON.stringify( twojson ), "failed to morph template of 'target2' to morphed.two.json {object}." );
      });
      it( "template of 'target3' should morph to morphed.three.json {object}", function() {
          const gntjson   = lib.gruntMultiTask( grunt, jsonfile, "dist/target3", jsonfile.target3 );
          const threejson = grunt.file.readJSON( "test/morphed.three.json" );
          assert( JSON.stringify( gntjson ) === JSON.stringify( threejson ), "failed to morph template of 'target3' to morphed.three.json {object}." );
      });
    });
  });
  describe( "Module 'tasks'", function() {
    describe( "... should contain", function() {
      it( "function 'tasks'", function() {
        assert( tasks, "failed to locate function 'tasks'" );
      });
    });
    describe( "Testing function 'tasks'", function() {
      tasks( grunt );
    });
  });
});
