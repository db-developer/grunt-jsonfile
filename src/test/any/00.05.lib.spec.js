/**
 *  © 2020, slashlib.org.
 */
const expect    = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;

  describe( "00.05.lib.spec.ts", () => {
    const lib = require( "../../lib/lib" );

    describe( "Testing exports of module 'lib'", () => {
      it( "Function 'isNumber' should exist", () => {
          expect( lib.isNumber ).not.to.be( undefined  );
          expect( lib.isNumber ).not.to.be( null       );
          expect( lib.isNumber ).to.be.a(   "function" );
      });
      it( "Function 'isString' should exist", () => {
          expect( lib.isString ).not.to.be( undefined  );
          expect( lib.isString ).not.to.be( null       );
          expect( lib.isString ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'isNumber' of module 'lib'", () => {
      it( "should be callable without arguments", () => {
          expect(() => { lib.isNumber(); }).not.to.throwException();
          expect( lib.isNumber()).not.to.be.ok();
      });
      it( "should be callable without arguments", () => {
          expect(() => { lib.isNumber( 5 ); }).not.to.throwException();
          expect( lib.isNumber( 5 )).to.be.ok();
      });
    });
    describe( "Testing function 'isString' of module 'lib'", () => {
      it( "should be callable without arguments", () => {
          expect(() => { lib.isString(); }).not.to.throwException();
          expect( lib.isString()).not.to.be.ok();
      });
      it( "should be callable without arguments", () => {
          expect(() => { lib.isString( 5 ); }).not.to.throwException();
          expect( lib.isString( 5 )).not.to.be.ok();
      });
      it( "should be callable without arguments", () => {
          expect(() => { lib.isString( "5" ); }).not.to.throwException();
          expect( lib.isString( "5" )).to.be.ok();
      });
      it( "should be callable without arguments", () => {
          expect(() => { lib.isString( new String( "5" )); }).not.to.throwException();
          expect( lib.isString( new String( "5" ))).to.be.ok();
      });
    });
  });
})();
