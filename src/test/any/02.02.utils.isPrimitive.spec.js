/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  // const constants = require( "./00.00.constants" );
  // const env       = await constants.env;

  describe( "02.02.utils.isPrimitive.spec.js", () => {
    const utils = require( "../../lib/utils" );

    describe( "Testing exports of module 'lib/utils'", () => {
      it( "Function 'isPrimitive' should exist", () => {
          expect( utils.isPrimitive ).not.to.be( undefined  );
          expect( utils.isPrimitive ).not.to.be( null       );
          expect( utils.isPrimitive ).to.be.a(   "function" );
      });
    });

    describe( "Testing function 'isPrimitive' of module 'lib/utils'", () => {
      it( "should return true for primitive: string", () => {
          expect(utils.isPrimitive("hello")).to.be(true);
      });

      it( "should return true for primitive: number (integer)", () => {
          expect(utils.isPrimitive(42)).to.be(true);
      });

      it( "should return true for primitive: number (float)", () => {
          expect(utils.isPrimitive(3.14)).to.be(true);
      });

      it( "should return true for primitive: NaN", () => {
          expect(utils.isPrimitive(NaN)).to.be(true);
      });

      it( "should return true for primitive: Infinity", () => {
          expect(utils.isPrimitive(Infinity)).to.be(true);
      });

      it( "should return true for primitive: boolean true", () => {
          expect(utils.isPrimitive(true)).to.be(true);
      });

      it( "should return true for primitive: boolean false", () => {
          expect(utils.isPrimitive(false)).to.be(true);
      });

      it( "should return true for primitive: undefined", () => {
          expect(utils.isPrimitive(undefined)).to.be(true);
      });

      it( "should return true for primitive: null", () => {
          expect(utils.isPrimitive(null)).to.be(true);
      });

      it( "should return true for primitive: bigint", () => {
          expect(utils.isPrimitive(10n)).to.be(true);
      });

      it( "should return true for primitive: symbol", () => {
          expect(utils.isPrimitive(Symbol("x"))).to.be(true);
      });

      // ---- Negative tests (JSON-relevant non-primitives) ----

      it( "should return false for object literal", () => {
          expect(utils.isPrimitive({})).to.be(false);
      });

      it( "should return false for nested object", () => {
          expect(utils.isPrimitive({ a: 1 })).to.be(false);
      });

      it( "should return false for array", () => {
          expect(utils.isPrimitive([])).to.be(false);
      });

      it( "should return false for function", () => {
          expect(utils.isPrimitive(function () {})).to.be(false);
      });

      it( "should return false for arrow function", () => {
          expect(utils.isPrimitive(() => {})).to.be(false);
      });

      it( "should return false for Date instance", () => {
          expect(utils.isPrimitive(new Date())).to.be(false);
      });

      it( "should return false for boxed String", () => {
          expect(utils.isPrimitive(new String("x"))).to.be(false);
      });

      it( "should return false for boxed Number", () => {
          expect(utils.isPrimitive(new Number(42))).to.be(false);
      });

      it( "should return false for boxed Boolean", () => {
          expect(utils.isPrimitive(new Boolean(true))).to.be(false);
      });
    });
  });
})();
