/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  // const constants = require( "./00.00.constants" );
  // const env       = await constants.env;

  describe( "05.02.tasks.jsonfile.setValues.spec.js", () => {
    const jsonfile = require( "../../lib/tasks/jsonfile" );

    describe( "Testing exports of module 'lib/tasks/jsonfile'", () => {
      it( "Function 'setValues' should exist", () => {
          expect( jsonfile.setValues ).not.to.be( undefined  );
          expect( jsonfile.setValues ).not.to.be( null       );
          expect( jsonfile.setValues ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'setValues' of module 'lib/tasks/jsonfile'", () => {
      // === Valid usage ===
      it( "should assign keys from source to destination", () => {
          const dest = { a: 1 };
          const src  = { b: 2 };
          const result = jsonfile.setValues(dest, src);
          expect(result).to.be(dest);              // returns the same destination reference
          expect(dest).to.eql({ a: 1, b: 2 });     // values merged correctly
      });

      it( "should deep-clone nested objects from source", () => {
          const dest = {};
          const src  = { nested: { x: 1 } };
          const result = jsonfile.setValues(dest, src);
          expect(result.nested).to.not.be(src.nested); // deep clone
          expect(result.nested).to.eql({ x: 1 });
      });

      it( "should correctly clone circular references", () => {
          const dest = {};
          const src = { a: {} };
          src.a.self = src.a;

          const result = jsonfile.setValues(dest, src);

          expect(result.a).to.not.be(src.a);
          expect(result.a.self).to.be(result.a);
      });

      // === Edge cases: source is null/undefined ===
      it( "should return destination unchanged if source is null", () => {
          const dest = { a: 1 };
          const result = jsonfile.setValues(dest, null);
          expect(result).to.be(dest);
          expect(result).to.eql({ a: 1 });
      });

      it( "should return destination unchanged if source is undefined", () => {
          const dest = { a: 1 };
          const result = jsonfile.setValues(dest, undefined);
          expect(result).to.be(dest);
          expect(result).to.eql({ a: 1 });
      });

      // === Error handling: invalid types ===
      it( "should throw TypeError if destination is not a plain object", () => {
          expect(() => jsonfile.setValues(null, { a: 1 })).to.throwException(TypeError);
          expect(() => jsonfile.setValues(42, { a: 1 })).to.throwException(TypeError);
          expect(() => jsonfile.setValues([], { a: 1 })).to.throwException(TypeError);
          expect(() => jsonfile.setValues(Object.create(null), { a: 1 })).to.throwException(TypeError);
      });

      it( "should throw TypeError if source is not a plain object", () => {
          const dest = {};
          expect(() => jsonfile.setValues(dest, 42)).to.throwException(TypeError);
          expect(() => jsonfile.setValues(dest, [])).to.throwException(TypeError);
          expect(() => jsonfile.setValues(dest, Object.create(null))).to.throwException(TypeError);
      });

      // === Structured clone errors ===
      it( "should throw if source contains non-clonable value (e.g., function)", () => {
          const dest = {};
          const src = { a: () => {} };
          expect(() => jsonfile.setValues(dest, src)).to.throwException();
      });

      it( "should throw if source contains non-clonable value (e.g., function)", () => {
          const dest = {};
          const src = { fn: () => {} };

          expect(() => jsonfile.setValues(dest, src)).to.throwException();
      });

      it( "should throw if source contains non-clonable value (e.g., symbol)", () => {
          const dest = {};
          const src = { s: Symbol("x") };

          expect(() => jsonfile.setValues(dest, src)).to.throwException();
      });
    });
  });
})();
