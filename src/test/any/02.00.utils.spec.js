/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  // const constants = require( "./00.00.constants" );
  // const env       = await constants.env;

  describe( "02.00.utils.spec.js", () => {
    const utils = require( "../../lib/utils" );

    describe( "Testing exports of module 'lib/utils'", () => {
      it( "Function 'isPlainObject' should exist", () => {
          expect( utils.isPlainObject ).not.to.be( undefined  );
          expect( utils.isPlainObject ).not.to.be( null       );
          expect( utils.isPlainObject ).to.be.a(   "function" );
      });
      it( "Function 'isPrimitive' should exist", () => {
          expect( utils.isPrimitive   ).not.to.be( undefined  );
          expect( utils.isPrimitive   ).not.to.be( null       );
          expect( utils.isPrimitive   ).to.be.a(   "function" );
      });
      it( "Function 'isString' should exist", () => {
          expect( utils.isString      ).not.to.be( undefined  );
          expect( utils.isString      ).not.to.be( null       );
          expect( utils.isString      ).to.be.a(   "function" );
      });
    });
  });
})();
