/**
 *  © 2020, slashlib.org.
 */
const os        = require( "os" );
const expect    = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;
  const options   = await constants.options;

  describe( "01.01.options.jsonfile.spec.js", () => {
    const jsonfile = require( "../../lib/options/jsonfile" );

    describe( "Testing exports of module 'options/jsonfile'", () => {
      it( "Function 'getOptions' should exist", () => {
          expect( jsonfile.getOptions ).not.to.be( undefined  );
          expect( jsonfile.getOptions ).not.to.be( null       );
          expect( jsonfile.getOptions ).to.be.a(   "function" );
      });
      it( "Function 'getEOF' should exist", () => {
          expect( jsonfile.getEOF ).not.to.be( undefined  );
          expect( jsonfile.getEOF ).not.to.be( null       );
          expect( jsonfile.getEOF ).to.be.a(   "function" );
      });
      it( "Function 'getTemplateFromOptions' should exist", () => {
          expect( jsonfile.getTemplateFromOptions ).not.to.be( undefined  );
          expect( jsonfile.getTemplateFromOptions ).not.to.be( null       );
          expect( jsonfile.getTemplateFromOptions ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'getOptions' of module 'options/jsonfile'", () => {
      it( "should not be callable without arguments", () => {
          expect(() => { jsonfile.getOptions(); }).to.throwException(( error ) => {
            expect( error ).to.be.an( Error );
          });
      });
      it( "should be callable with arguments 'grunt' and 'task'", () => {
          expect(() => { jsonfile.getOptions( env.grunt, env.task ); }).not.to.throwException();
          // console.log( jsonfile.getOptions( env.grunt, env.task ));
          expect( JSON.stringify( jsonfile.getOptions( env.grunt, env.task )) === JSON.stringify( options )).to.be.ok();
      });
    });
    describe( "Testing function 'getEOF' of module 'options/jsonfile'", () => {
      it( "should not be callable without arguments", () => {
          expect(() => { jsonfile.getEOF(); }).to.throwException(( error ) => {
            expect( error ).to.be.an( Error );
          });
      });
      it( "should be callable with arguments 'grunt' and 'task'", () => {
          expect(() => { jsonfile.getEOF( env.grunt, env.task ); }).not.to.throwException();
          // console.log( jsonfile.getEOF( env.grunt, env.task ));
          expect( jsonfile.getEOF( env.grunt, env.task ) === os.EOL ).to.be.ok();
      });
    });
    describe( "Testing function 'getTemplateFromOptions' of module 'options/jsonfile'", () => {
      it( "should not be callable without arguments", () => {
          expect(() => { jsonfile.getTemplateFromOptions(); }).to.throwException(( error ) => {
            expect( error ).to.be.an( Error );
          });
      });
      it( "should be callable with arguments 'grunt' and 'task'", () => {
          expect(() => { jsonfile.getTemplateFromOptions( env.grunt, env.task, "one" ); }).not.to.throwException();
          // console.log( jsonfile.getTemplateFromOptions( env.grunt, env.task, "one" ));
          expect( JSON.stringify( jsonfile.getTemplateFromOptions( env.grunt, env.task, "one" )) === JSON.stringify( env.grunt.file.readJSON( "package.json" ))).to.be.ok();
      });
      it( "should be callable with arguments 'grunt' and 'task'", () => {
          expect(() => { jsonfile.getTemplateFromOptions( env.grunt, env.task, "two" ); }).not.to.throwException();
          // console.log( jsonfile.getTemplateFromOptions( env.grunt, env.task, "two" ));
          expect( JSON.stringify( jsonfile.getTemplateFromOptions( env.grunt, env.task, "two" )) === JSON.stringify( options.templates.two )).to.be.ok();
      });
    });
  });
})();
