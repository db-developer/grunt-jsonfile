/**
 *  © 2020, slashlib.org.
 */
const expect    = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;

  describe( "10.00.index.spec.js", () => {
    const index = require( "../../lib/index" );

    describe( "Testing exports of module 'tasks'", () => {
      it( "Function 'registerMultiTaskJSONFile' should exist", () => {
          expect( index.registerMultiTaskJSONFile ).not.to.be( undefined  );
          expect( index.registerMultiTaskJSONFile ).not.to.be( null       );
          expect( index.registerMultiTaskJSONFile ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'registerMultiTaskJSONFile' of module 'lib/index'", () => {
      it( "should be callable without arguments", () => {
          expect(() => { index.registerMultiTaskJSONFile( env.grunt ); }).not.to.throwException();
      });
    });
  });
})();
