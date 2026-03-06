/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  // const constants = require( "./00.00.constants" );
  // const env       = await constants.env;

  describe( "02.03.utils.isString.spec.js", () => {
    const utils = require( "../../lib/utils" );

    describe( "Testing exports of module 'lib/utils'", () => {
      it( "Function 'isString' should exist", () => {
          expect( utils.isString ).not.to.be( undefined  );
          expect( utils.isString ).not.to.be( null       );
          expect( utils.isString ).to.be.a(   "function" );
      });
    });

    describe( "Testing function 'isString' of module 'lib/utils'", () => {
      it( "should return true for string primitive (simple)", () => {
          expect(utils.isString("hello")).to.be(true);
      });

      it( "should return true for empty string", () => {
          expect(utils.isString("")).to.be(true);
      });

      it( "should return true for string created via String()", () => {
          expect(utils.isString(String("abc"))).to.be(true);
      });

      it( "should return true for boxed String instance", () => {
          expect(utils.isString(new String("abc"))).to.be(true);
      });

      it( "should return false for number", () => {
          expect(utils.isString(42)).to.be(false);
      });

      it( "should return false for float number", () => {
          expect(utils.isString(3.14)).to.be(false);
      });

      it( "should return false for boolean true", () => {
          expect(utils.isString(true)).to.be(false);
      });

      it( "should return false for boolean false", () => {
          expect(utils.isString(false)).to.be(false);
      });

      it( "should return false for null", () => {
          expect(utils.isString(null)).to.be(false);
      });

      it( "should return false for undefined", () => {
          expect(utils.isString(undefined)).to.be(false);
      });

      it( "should return false for bigint", () => {
          expect(utils.isString(10n)).to.be(false);
      });

      it( "should return false for symbol", () => {
          expect(utils.isString(Symbol("x"))).to.be(false);
      });

      it( "should return false for object literal", () => {
          expect(utils.isString({})).to.be(false);
      });

      it( "should return false for array", () => {
          expect(utils.isString([])).to.be(false);
      });

      it( "should return false for function", () => {
          expect(utils.isString(function(){})).to.be(false);
      });

      it( "should return false for arrow function", () => {
          expect(utils.isString(() => {})).to.be(false);
      });

      it( "should return false for Date instance", () => {
          expect(utils.isString(new Date())).to.be(false);
      });

      it( "should return false for boxed Number", () => {
          expect(utils.isString(new Number(42))).to.be(false);
      });

      it( "should return false for boxed Boolean", () => {
          expect(utils.isString(new Boolean(true))).to.be(false);
      });
    });
  });
})();
