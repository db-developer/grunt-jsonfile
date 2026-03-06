/**
 *  © 2020, slashlib.org.
 */
const expect    = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;

  describe( "10.00.index.spec.js", () => {
    const index = require( "../../lib/index" );

    describe( "Testing exports of module 'lib (lib/index)'", () => {
      it( "Function 'registerMultiTask' should exist", () => {
          expect( index.registerMultiTask ).not.to.be( undefined  );
          expect( index.registerMultiTask ).not.to.be( null       );
          expect( index.registerMultiTask ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'registerMultiTask' of module 'lib (lib/index)'", () => {
      it( "should be callable without arguments", () => {
          expect(() => { index.registerMultiTask( env.grunt ); }).not.to.throwException();
      });
    });
  });
})();
