/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;
  const options   = await constants.options;

  describe( "03.03.options.jsonfile.getTemplateReferenceFromOptions.spec.js", () => {
    const jsonfile = require( "../../lib/options/jsonfile" );

    describe( "Testing exports of module 'options/jsonfile'", () => {
      it( "Function 'getTemplateReferenceFromOptions' should exist", () => {
          expect( jsonfile.getTemplateReferenceFromOptions ).not.to.be( undefined  );
          expect( jsonfile.getTemplateReferenceFromOptions ).not.to.be( null       );
          expect( jsonfile.getTemplateReferenceFromOptions ).to.be.a(   "function" );
      });
    });

    describe( "Testing function 'getTemplateReferenceFromOptions' (unmocked)", () => {

      it( "should throw if called without arguments", () => {
          expect(() => {
            jsonfile.getTemplateReferenceFromOptions();
          }).to.throwException();
      });

      it( "should resolve template name that points to JSON file", () => {
          const result = jsonfile.getTemplateReferenceFromOptions( env.grunt, env.task, "one" );
          expect( JSON.stringify(result) === JSON.stringify(env.grunt.file.readJSON("package.json"))).to.be.ok();
      });

      it( "should resolve template name that points to object literal", () => {
          const result = jsonfile.getTemplateReferenceFromOptions( env.grunt, env.task, "two" );
          expect( JSON.stringify(result) === JSON.stringify(options.templates.two)).to.be.ok();
      });
    });

    describe( "Testing function 'getTemplateReferenceFromOptions' (mocked)", () => {

      it( "should throw if options.templates is not defined", () => {
          const mockTask = {
            options: () => ({})
          };

          const mockGrunt = {};

          expect(() => {
            jsonfile.getTemplateReferenceFromOptions(mockGrunt, mockTask, "x");
          }).to.throwException();
      });

      it( "should return null if template name does not exist", () => {
          const mockTask = {
            options: () => ({
              templates: { existing: {} }
            })
          };

          const mockGrunt = {};

          const result = jsonfile.getTemplateReferenceFromOptions(
            mockGrunt,
            mockTask,
            "missing"
          );

          expect(result).to.be(null);
      });

      it( "should return object template directly if value is plain object", () => {
          const templateObj = { a: 1 };

          const mockTask = {
            options: () => ({
              templates: { test: templateObj }
            })
          };

          const mockGrunt = {};

          const result = jsonfile.getTemplateReferenceFromOptions(
            mockGrunt,
            mockTask,
            "test"
          );

          expect(result).to.be(templateObj);
      });

      it( "should load template from JSON file if template value is string", () => {
          const mockTask = {
            options: () => ({
              templates: { fileTemplate: "path/to/file.json" }
            })
          };

          const mockGrunt = {
            file: {
              readJSON: (path) => {
                expect(path).to.be("path/to/file.json");
                return { loaded: true };
              }
            }
          };

          const result = jsonfile.getTemplateReferenceFromOptions(
            mockGrunt,
            mockTask,
            "fileTemplate"
          );

          expect(result).to.eql({ loaded: true });
      });

      it( "should throw if grunt.file.readJSON is missing when template is string", () => {
          const mockTask = {
            options: () => ({
              templates: { fileTemplate: "file.json" }
            })
          };

          const mockGrunt = {};

          expect(() => {
            jsonfile.getTemplateReferenceFromOptions(
              mockGrunt,
              mockTask,
              "fileTemplate"
            );
          }).to.throwException();
      });

      it( "should throw if template value has invalid type", () => {
          const mockTask = {
            options: () => ({
              templates: { invalid: 42 }
            })
          };

          const mockGrunt = {};

          expect(() => {
            jsonfile.getTemplateReferenceFromOptions(
              mockGrunt,
              mockTask,
              "invalid"
            );
          }).to.throwException();
      });

      it( "should throw if task is undefined", () => {
          expect(() => {
            jsonfile.getTemplateReferenceFromOptions({}, undefined, "x");
          }).to.throwException();
      });

      it( "should throw if task.options is not a function", () => {
          const mockTask = {
            options: null
          };

          expect(() => {
            jsonfile.getTemplateReferenceFromOptions({}, mockTask, "x");
          }).to.throwException();
      });

    });
  });
})();