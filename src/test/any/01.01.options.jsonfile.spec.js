/**
 *  © 2020, slashlib.org.
 *
 *  Initial tests - to be run in advance to any other test.
 *
 */ // use nodes default assertions
const assert = require( "assert" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;

  describe( "01.01.options.jsonfile.spec.ts", () => {
    const jsonfile = require( "../../lib/options/jsonfile" );

    describe( "Testing exports of module 'options/nycmocha'", () => {
      it( "Function 'getOptions' should exist", () => {
          expect( jsonfile.getOptions ).not.to.be( undefined  );
          expect( jsonfile.getOptions ).not.to.be( null       );
          expect( jsonfile.getOptions ).to.be.a(   "function" );
      });
      it( "Function 'getOptions' should exist", () => {
          expect( jsonfile.getTemplateFromOptions ).not.to.be( undefined  );
          expect( jsonfile.getTemplateFromOptions ).not.to.be( null       );
          expect( jsonfile.getTemplateFromOptions ).to.be.a(   "function" );
      });
    });
  });
})();
