/**
 *  © 2026, slashlib.org.
 */
const expect    = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );

  describe( "05.04.tasks.jsonfile.updateValues.spec.js", () => {
    const jsonfile = require( "../../lib/tasks/jsonfile" );

    describe( "Testing exports of module 'lib/tasks/jsonfile'", () => {
      it( "Function 'updateValues' should exist", () => {
          expect( jsonfile.updateValues ).not.to.be( undefined  );
          expect( jsonfile.updateValues ).not.to.be( null       );
          expect( jsonfile.updateValues ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'updateValues' of module 'lib/tasks/jsonfile'", () => {
      it( "should not be callable without arguments", () => {
          expect(() => { jsonfile.updateValues(); }).to.throwException();
      });
      it( "should not be callable with 'destination' { } and 'source' {undefined|null}", () => {
          const destination = { };
          expect(() => { jsonfile.updateValues( destination, undefined )}).to.throwException();
          expect(() => { jsonfile.updateValues( destination, null      )}).to.throwException();
      });
      it( "should be callable with 'destination' { } and 'source' {undefined|null}", () => {
          const destination = { };
          const source      = { dummy: "value" };
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
      });
      it( "should be callable with 'destination' { 0 } and 'source' { 1 }", () => {
          const destination = { };
          const source      = { dummy: "value" };
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify({ dummy: "value" })).to.be.ok();
      });
      it( "should be callable with 'destination' { 1 } and 'source' { 2 }", () => {
          const destination = { hurz: "to be replaced" };
          const source      = { hurz: false, dummy: "value" };
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify({ hurz: false, dummy: "value" })).to.be.ok();
      });
      it( "should be callable with 'destination' { 2 } and 'source' { 2 }", () => {
          const destination = { hurz: "to be replaced", gnarf: "gnarf" };
          const source      = { hurz: null, dummy: "value" };
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify({ hurz: null, gnarf: "gnarf", dummy: "value" })).to.be.ok();
      });
      it( "should be callable with 'destination' { 2 } and 'source' { 2 }", () => {
          const destination = { hurz: "to be deleted", gnarf: "gnarf" };
          const source      = { hurz: undefined, dummy: "value" };
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify({ gnarf: "gnarf", dummy: "value" })).to.be.ok();
      });
      it( "should be callable with 'destination' { 2 } and 'source' { 3 }", () => {
          const destination = { hurz: 4 };
          const source      = { hurz: 9 };
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 3 } and 'source' { 4 }", () => {
          const destination = { hurz: [ 1, 2, 3 ]};
          const source      = { hurz: [ 3, 4, 5 ]};
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 3 } and 'source' { 4 }", () => {
          const destination = { hurz: "test" };
          const source      = { hurz: new String( "fun" ) };
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should not be callable with 'destination' { 1 } and 'source' { fn }", () => {
          const destination = { hurz: "test" };
          const source      = { hurz: function( ) { return 3; }};
          expect(() => { jsonfile.updateValues( destination, source ); }).to.throwException();
      });
      it( "should be callable with 'destination' { 3 } and 'source' { 4 }", () => {
          const destination = { hurz: "test" };
          const source      = { hurz: new Date() };
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 3 } and 'source' { 4 }", () => {
          const destination = { hurz: "test" };
          const source      = { hurz: { blubb: "blubb" }};
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 3 } and 'source' { 4 }", () => {
          const destination = { hurz: { blubb: "test"  }};
          const source      = { hurz: { blubb: "blubb" }};
          expect(() => { jsonfile.updateValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
    });
    // => Edge-case tests for updateValues
    describe("Edge-cases on function 'updateValues'", () => {
      it("should throw TypeError if destination is not a plain object", () => {
          expect(() => jsonfile.updateValues(null, {})).to.throwException();
          expect(() => jsonfile.updateValues([], {})).to.throwException();
          expect(() => jsonfile.updateValues("string", {})).to.throwException();
      });

      it("should throw TypeError if source is not a plain object", () => {
          expect(() => jsonfile.updateValues({}, null)).to.throwException();
          expect(() => jsonfile.updateValues({}, [])).to.throwException();
          expect(() => jsonfile.updateValues({}, "string")).to.throwException();
      });

      it("should delete destination property if source value is undefined", () => {
          const dest = { a: 1, b: 2 };
          const src  = { b: undefined };
          jsonfile.updateValues(dest, src);
          expect(dest).to.eql({ a: 1 });
      });

      it("should recursively update nested plain objects", () => {
          const dest = { nested: { x: 1, y: 2 } };
          const src  = { nested: { y: 9, z: 5 } };
          jsonfile.updateValues(dest, src);
          expect(dest).to.eql({ nested: { x: 1, y: 9, z: 5 } });
      });

      it("should update arrays element-wise, delete undefined, replace existing, and append new elements", () => {
          const dest = { arr: [1, 2, 3] };
          const src  = { arr: [1, undefined, 4, 9] };
          jsonfile.updateValues(dest, src);
          expect(dest.arr).to.eql([1, 4, 9]);
      });

      it("should replace primitive values in destination with source values", () => {
          const dest = { a: 5, b: "old" };
          const src  = { a: 9, b: "new" };
          jsonfile.updateValues(dest, src);
          expect(dest).to.eql({ a: 9, b: "new" });
      });

      it("should handle empty source and leave destination unchanged", () => {
          const dest = { a: 1 };
          const src  = {};
          jsonfile.updateValues(dest, src);
          expect(dest).to.eql({ a: 1 });
      });

      it("should properly clone source values to avoid reference sharing", () => {
          const nested = { x: 1 };
          const dest = {};
          const src  = { a: nested };
          jsonfile.updateValues(dest, src);
          expect(dest.a).to.eql(nested);
          expect(dest.a).not.to.be(nested); // must not be the same reference
      });

      it("should throw if structuredClone fails due to uncloneable source", () => {
          const dest = {};
          const src  = { a: () => {} };
          expect(() => jsonfile.updateValues(dest, src)).to.throwException();
      });
    });    
  });
})();
