/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  // const constants = require( "./00.00.constants" );
  // const env       = await constants.env;

  describe( "02.01.utils.isPlainObject.spec.js", () => {
    const utils = require( "../../lib/utils" );

    describe( "Testing exports of module 'lib/utils'", () => {
      it( "Function 'isPlainObject' should exist", () => {
          expect( utils.isPlainObject ).not.to.be( undefined  );
          expect( utils.isPlainObject ).not.to.be( null       );
          expect( utils.isPlainObject ).to.be.a(   "function" );
      });
    });

    describe( "Testing function 'isPlainObject' of module 'lib/utils'", () => {

      describe( "Should return true for plain object literals", () => {

        it( "Empty object literal", () => {
            expect( utils.isPlainObject( {} ) ).to.be( true );
        });

        it( "Object literal with properties", () => {
            expect( utils.isPlainObject( { a: 1, b: 2 } ) ).to.be( true );
        });

      });

      describe( "Should return false for null and primitives", () => {

        it( "null", () => {
            expect( utils.isPlainObject( null ) ).to.be( false );
        });

        it( "undefined", () => {
            expect( utils.isPlainObject( undefined ) ).to.be( false );
        });

        it( "number", () => {
            expect( utils.isPlainObject( 42 ) ).to.be( false );
        });

        it( "string", () => {
            expect( utils.isPlainObject( "test" ) ).to.be( false );
        });

        it( "boolean", () => {
            expect( utils.isPlainObject( true ) ).to.be( false );
        });

        it( "symbol", () => {
            expect( utils.isPlainObject( Symbol() ) ).to.be( false );
        });

        it( "bigint", () => {
            expect( utils.isPlainObject( 10n ) ).to.be( false );
        });

      });

      describe( "Should return false for non-plain objects", () => {

        it( "Array", () => {
            expect( utils.isPlainObject( [] ) ).to.be( false );
        });

        it( "Date instance", () => {
            expect( utils.isPlainObject( new Date() ) ).to.be( false );
        });

        it( "Map instance", () => {
            expect( utils.isPlainObject( new Map() ) ).to.be( false );
        });

        it( "Set instance", () => {
            expect( utils.isPlainObject( new Set() ) ).to.be( false );
        });

        it( "RegExp instance", () => {
            expect( utils.isPlainObject( /abc/ ) ).to.be( false );
        });

        it( "Function", () => {
            expect( utils.isPlainObject( function(){} ) ).to.be( false );
        });

        it( "Class instance", () => {
            class Foo {}
            expect( utils.isPlainObject( new Foo() ) ).to.be( false );
        });

        it( "Object.create(null)", () => {
            const obj = Object.create( null );
            expect( utils.isPlainObject( obj ) ).to.be( false );
        });
      });
    });
  });
})();
