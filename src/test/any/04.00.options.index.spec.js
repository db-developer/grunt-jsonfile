/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  // const constants = require( "./00.00.constants" );
  // const env       = await constants.env;

  describe( "04.00.options.index.spec.js", () => {
    const jsonfile = require( "../../lib/options/index" );

    describe( "Testing exports of module 'lib/options (lib/options/index)'", () => {
      it( "Function 'getOptions' should exist", () => {
          expect( jsonfile.getOptions ).not.to.be( undefined  );
          expect( jsonfile.getOptions ).not.to.be( null       );
          expect( jsonfile.getOptions ).to.be.a(   "function" );
      });
      it( "Function 'getEOF' should exist", () => {
          expect( jsonfile.getEOF     ).not.to.be( undefined  );
          expect( jsonfile.getEOF     ).not.to.be( null       );
          expect( jsonfile.getEOF     ).to.be.a(   "function" );
      });
      it( "Function 'getTemplateReferenceFromOptions' should exist", () => {
          expect( jsonfile.getTemplateReferenceFromOptions ).not.to.be( undefined  );
          expect( jsonfile.getTemplateReferenceFromOptions ).not.to.be( null       );
          expect( jsonfile.getTemplateReferenceFromOptions ).to.be.a(   "function" );
      });
    });
  });
})();
