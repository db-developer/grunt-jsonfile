/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;
  const options   = await constants.options;

  describe( "03.01.options.jsonfile.getOptions.spec.js", () => {
    const jsonfile = require( "../../lib/options/jsonfile" );

    describe( "Testing exports of module 'options/jsonfile'", () => {
      it( "Function 'getOptions' should exist", () => {
          expect( jsonfile.getOptions ).not.to.be( undefined  );
          expect( jsonfile.getOptions ).not.to.be( null       );
          expect( jsonfile.getOptions ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'getOptions' of module 'options/jsonfile' (unmocked)", () => {
      it( "should not be callable without arguments", () => {
          expect(() => { jsonfile.getOptions(); }).to.throwException(( error ) => {
            expect( error ).to.be.an( Error );
          });
      });
      it( "should be callable with arguments 'grunt' and 'task'", () => {
          expect(() => { jsonfile.getOptions( env.grunt, env.task ); }).not.to.throwException();
          // console.log( jsonfile.getOptions( env.grunt, env.task ));
          expect( JSON.stringify( jsonfile.getOptions( env.grunt, env.task )) === JSON.stringify( options )).to.be.ok();
      });
    });
    describe( "Testing function 'getOptions' of module 'options/jsonfile' (mocked)", () => {
      it( "should return default options if task.options() returns empty object", () => {
          const mockTask = {
            options: () => ({})
          };

          const result = jsonfile.getOptions({}, mockTask);

          expect(result).to.be.an("object");
          expect(result).to.eql({ EOF: false });
      });

      it( "should override default option EOF when provided", () => {
          const mockTask = {
            options: () => ({ EOF: true })
          };

          const result = jsonfile.getOptions({}, mockTask);

          expect(result.EOF).to.be(true);
      });

      it( "should preserve unknown custom options", () => {
          const mockTask = {
            options: () => ({ custom: 123 })
          };

          const result = jsonfile.getOptions({}, mockTask);

          expect(result.custom).to.be(123);
          expect(result.EOF).to.be(false);
      });

      it( "should override defaults but not mutate internal OPTIONS object", () => {
          const mockTask = {
            options: () => ({ EOF: true })
          };

          const result1 = jsonfile.getOptions({}, mockTask);
          expect(result1.EOF).to.be(true);

          const result2 = jsonfile.getOptions({}, { options: () => ({}) });
          expect(result2.EOF).to.be(false);
      });

      it( "should return a new object instance on every call", () => {
          const mockTask = {
            options: () => ({})
          };

          const result1 = jsonfile.getOptions({}, mockTask);
          const result2 = jsonfile.getOptions({}, mockTask);

          expect(result1 === result2).to.be(false);
      });

      it( "should perform only a shallow merge (nested objects by reference)", () => {
          const nested = { a: 1 };

          const mockTask = {
            options: () => ({ nested })
          };

          const result = jsonfile.getOptions({}, mockTask);

          expect(result.nested).to.be(nested);
      });

      it( "should throw if task is missing", () => {
          expect(() => {
            jsonfile.getOptions({}, undefined);
          }).to.throwException();
      });

      it( "should throw if task.options is not a function", () => {
          const mockTask = {
            options: null
          };

          expect(() => {
            jsonfile.getOptions({}, mockTask);
          }).to.throwException();
      });
    });
  });
})();
