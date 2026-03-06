/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;

  describe( "05.01.tasks.jsonfile.getTemplate.spec.js", () => {
    const jsonfile = require( "../../lib/tasks/jsonfile" );

    describe( "Testing exports of module 'lib/tasks/jsonfile'", () => {
      it( "Function 'getTemplate' should exist", () => {
          expect( jsonfile.getTemplate ).not.to.be( undefined  );
          expect( jsonfile.getTemplate ).not.to.be( null       );
          expect( jsonfile.getTemplate ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'getTemplate' of module 'lib/tasks/jsonfile'", () => {
      it( "should be callable without arguments", () => {
          expect(() => { jsonfile.getTemplate(); }).not.to.throwException();
          const result = jsonfile.getTemplate();
          expect( JSON.stringify( result ) === JSON.stringify({})).to.be.ok();
      });
      it( "should be callable with arguments and 'targetconfig' { }", () => {
          const targetconfig = { };
          expect(() => { jsonfile.getTemplate( env.grunt, env.task, targetconfig ); }).not.to.throwException();
          const result = jsonfile.getTemplate( env.grunt, env.task, targetconfig );
          expect( JSON.stringify( result ) === JSON.stringify({})).to.be.ok();
      });
      it( "should be callable with arguments and 'targetconfig' { template: { test = 'value' }}", () => {
          const template      = { test: 'value' };
          const targetconfig  = { template };
          expect(() => { jsonfile.getTemplate( env.grunt, env.task, targetconfig ); }).not.to.throwException();
          const result = jsonfile.getTemplate( env.grunt, env.task, targetconfig );
          expect( JSON.stringify( result ) === JSON.stringify( template )).to.be.ok();
      });
      it( "should be callable with arguments and 'targetconfig' { template: 'package.json' }", () => {
          const template      = "package.json";
          const targetconfig  = { template };
          expect(() => { jsonfile.getTemplate( env.grunt, env.task, targetconfig ); }).not.to.throwException();
          const result = jsonfile.getTemplate( env.grunt, env.task, targetconfig );
          expect( JSON.stringify( result ) === JSON.stringify( env.grunt.file.readJSON( template ) )).to.be.ok();
      });
      it( "should be callable with arguments and 'targetconfig' { template: 'one' }", () => {
          const template      = "one";
          const targetconfig  = { template };
          expect(() => { 
            jsonfile.getTemplate( env.grunt, env.task, targetconfig );
          }).not.to.throwException(/* ( error ) => { console.log( "===>", error )} */);
          const result = jsonfile.getTemplate( env.grunt, env.task, targetconfig );
          expect( JSON.stringify( result ) === JSON.stringify( env.grunt.file.readJSON( "package.json" ) )).to.be.ok();
      });
      it("should return empty object for resolved template of unsupported type", () => {
          const template      = 12345;
          const targetconfig  = { template };

          expect(() => {
              jsonfile.getTemplate( env.grunt, env.task, targetconfig );
          }).not.to.throwException(/* ( error ) => { console.log( "===>", error )} */);

          const result = jsonfile.getTemplate(env.grunt, env.task, targetconfig);
          expect(JSON.stringify(result) === JSON.stringify({})).to.be.ok();
      });      
    });
  });
})();
