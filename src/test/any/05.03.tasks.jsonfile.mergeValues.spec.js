/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  // const constants = require( "./00.00.constants" );
  // const env       = await constants.env;
  // const options   = await constants.options;

  describe( "05.03.tasks.jsonfile.mergeValues.spec.js", () => {
    const jsonfile = require( "../../lib/tasks/jsonfile" );

    describe( "Testing exports of module 'lib/tasks/jsonfile'", () => {
      it( "Function 'mergeValues' should exist", () => {
          expect( jsonfile.mergeValues ).not.to.be( undefined  );
          expect( jsonfile.mergeValues ).not.to.be( null       );
          expect( jsonfile.mergeValues ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'mergeValues' of module 'lib/tasks/jsonfile'", () => {
      it( "should be not callable without arguments", () => {
          expect(() => { jsonfile.mergeValues(); }).to.throwException();
      });
      it( "should not be callable without 'source' {undefined|null} argument", () => {
          const destination = { };
          expect(() => { jsonfile.mergeValues( destination, undefined ); }).to.throwException();
          expect(() => { jsonfile.mergeValues( destination, null      ); }).to.throwException();
      });
      it( "should be callable with 'source' { } and 'destionation' {undefined|null}", () => {
          const destination = { };
          const source      = { dummy: "value" };
          expect(() => { jsonfile.mergeValues( destination, source ); }).not.to.throwException();
      });
      it( "should be callable with 'destination' { 1 } and 'source' { 1 }", () => {
          const destination = { hurz: "to be deleted" };
          const source      = { hurz: false, dummy: "value" };
          expect(() => { jsonfile.mergeValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 1 } and 'source' { 2 }", () => {
          const destination = { hurz: "to be deleted" };
          const source      = { hurz: null, dummy: "value" };
          expect(() => { jsonfile.mergeValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 1 } and 'source' { 3 }", () => {
          const destination = { hurz: "to be deleted" };
          const source      = { hurz: undefined, dummy: "value" };
          expect(() => { jsonfile.mergeValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 2 } and 'source' { 3 }", () => {
          const destination = { hurz: 4 };
          const source      = { hurz: 9 };
          expect(() => { jsonfile.mergeValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 3 } and 'source' { 4.0 }", () => {
          const thurz       = [ 1, 2, 3 ];
          const churz       = [ 3, 4, 5 ];
          const destination = { hurz: [ ...thurz ]};
          const source      = { hurz: [ ...churz ]};
          const expected    = { hurz: Array.from(new Set([...thurz, ...churz]))};
          expect(() => { jsonfile.mergeValues( destination, source )}).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( expected )).to.be.ok();
      });
      it( "should be callable with 'destination' { 3 } and 'source' { 4.1 }", () => {
          const destination = { hurz: [ 1, 2, 3 ]};
          const source      = { hurz: "blubb"};
          expect(() => { jsonfile.mergeValues( destination, source )}).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 4 } and 'source' { 5 }", () => {
          const destination = { hurz: { }};
          const source      = { hurz: undefined };
          expect(() => { jsonfile.mergeValues( destination, source ); }).not.to.throwException();
          expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 5 } and 'source' { 6 }", () => {
          const destination = { hurz: { gnarf: "fun" }};
          const source      = { hurz: { test:  "out of fun" }};
          expect(() => { jsonfile.mergeValues( destination, source ); }).not.to.throwException();
          // expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
      it( "should be callable with 'destination' { 6 } and 'source' { 7 }", () => {
          const destination = { hurz: () => { }};
          const source      = { hurz: "blubb"  };
          expect(() => { jsonfile.mergeValues( destination, source ); }).not.to.throwException();
          // expect( JSON.stringify( destination ) === JSON.stringify( source )).to.be.ok();
      });
    });

    describe( "Testing edge-cases on function 'mergeValues' of module 'lib/tasks/jsonfile'", () => {
      it( "should deep-merge nested plain objects without replacing existing keys", () => {
          const destination = { a: { b: 1 } };
          const source      = { a: { c: 2 } };

          jsonfile.mergeValues( destination, source );

          expect( JSON.stringify( destination ) === JSON.stringify({ a: { b: 1, c: 2 }}) ).to.be.ok();
      });

      it( "should delete nested keys when source value is undefined", () => {
          const destination = { a: { b: 1, c: 2 }};
          const source      = { a: { b: undefined }};

          jsonfile.mergeValues( destination, source );

          expect( JSON.stringify( destination ) === JSON.stringify({ a: { c: 2 }}) ).to.be.ok();
      });

      it( "should append only values not already present when merging arrays", () => {
          const destination = { a: [ 1, 2, 3 ] };
          const source      = { a: [ 3, 4, 5 ] };

          jsonfile.mergeValues( destination, source );

          expect( JSON.stringify( destination ) === JSON.stringify({ a: [ 1, 2, 3, 4, 5 ]}) ).to.be.ok();
      });

      it( "should not duplicate values when identical arrays are merged", () => {
          const destination = { a: [ 1, 2, 3 ] };
          const source      = { a: [ 1, 2, 3 ] };

          jsonfile.mergeValues( destination, source );

          expect( JSON.stringify( destination ) === JSON.stringify({ a: [ 1, 2, 3 ]}) ).to.be.ok();
      });

      it( "should replace primitive with object", () => {
          const destination = { a: 1 };
          const source      = { a: { b: 2 }};

          jsonfile.mergeValues( destination, source );

          expect( JSON.stringify( destination ) === JSON.stringify({ a: { b: 2 }}) ).to.be.ok();
      });

      it( "should replace object with primitive", () => {
          const destination = { a: { b: 1 }};
          const source      = { a: 5 };

          jsonfile.mergeValues( destination, source );

          expect( JSON.stringify( destination ) === JSON.stringify({ a: 5 }) ).to.be.ok();
      });

      it( "should structured-clone assigned objects so source mutations do not affect destination", () => {
          const destination = {};
          const source      = { a: { b: 1 }};

          jsonfile.mergeValues( destination, source );
          source.a.b = 99;

          expect( destination.a.b === 1 ).to.be.ok();
      });

      it( "should ignore prototype properties of source objects, but must throw Exception", () => {
          const proto = { protoProp: 42 };
          const source = Object.create(proto);
          source.ownProp = 1;

          const destination = {};

          expect(() => { jsonfile.mergeValues( destination, source )}).to.throwException();
      });

      it( "should keep reference identity of destination object", () => {
          const destination = { a: 1 };
          const source      = { b: 2 };

          const result = jsonfile.mergeValues( destination, source );

          expect( result === destination ).to.be.ok();
      });

      it( "should allow empty source object without modifying destination", () => {
          const destination = { a: 1 };
          const source      = {};

          jsonfile.mergeValues( destination, source );

          expect( JSON.stringify( destination ) === JSON.stringify({ a: 1 })).to.be.ok();
      });

      it( "should append object values to array only if reference is not already present", () => {
          const shared = { id: 1 };

          const target    = { a: [ shared ] };
          const container = { a: [ shared ] };

          jsonfile.mergeValues( target, container );

          // reference already exists → must not be duplicated
          expect( target.a.length === 1 ).to.be.ok();
          expect( target.a[0] === shared ).to.be.ok();
      });

      it( "should append structurally equal objects if they are different references", () => {
          const target    = { a: [ { id: 1 } ] };
          const container = { a: [ { id: 1 } ] };

          jsonfile.mergeValues( target, container );

          // objects are structurally equal but different references → allowed
          expect( target.a.length === 2 ).to.be.ok();
          expect( target.a[0] !== target.a[1] ).to.be.ok();
      });

      it( "should throw if structuredClone encounters non-clonable value (e.g., function)", () => {
          const target    = {};
          const container = { a: () => {} };

          expect(() => { jsonfile.mergeValues( target, container )}).to.throwException();
      });

      it( "should throw if structuredClone encounters symbol values", () => {
          const target    = {};
          const container = { a: Symbol( "test" ) };

          expect(() => { jsonfile.mergeValues( target, container )}).to.throwException();
      });

      it( "should handle deeply nested merges with arrays and objects combined", () => {
          const target = {
              a: {
                  b: [ 1, 2 ],
                  c: { d: 1 }
              }
          };

          const container = {
              a: {
                  b: [ 2, 3, 4 ],
                  c: { e: 2 }
              }
          };

          jsonfile.mergeValues( target, container );

          expect(
              JSON.stringify( target ) === JSON.stringify({
                  a: {
                      b: [ 1, 2, 3, 4 ],
                      c: { d: 1, e: 2 }
                  }
              })
          ).to.be.ok();
      });

      it( "should delete nested object when source explicitly sets it to undefined", () => {
          const target = {
            a: {
              b: { c: 1 }
            }
          };

          const container = {
            a: { b: undefined }
          };

          jsonfile.mergeValues( target, container );

          expect( JSON.stringify( target ) === JSON.stringify({ a: {} })).to.be.ok();
      });      
    });
  });
})();
