/**
 *  © 2026, slashlib.org.
 */
const os     = require( "os"        );
const expect = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;

  describe( "03.02.options.jsonfile.getEOF.spec.js", () => {
    const jsonfile = require( "../../lib/options/jsonfile" );

    describe( "Testing exports of module 'options/jsonfile'", () => {
      it( "Function 'getEOF' should exist", () => {
          expect( jsonfile.getEOF ).not.to.be( undefined  );
          expect( jsonfile.getEOF ).not.to.be( null       );
          expect( jsonfile.getEOF ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'getEOF' of module 'options/jsonfile' (unmocked)", () => {
      it( "should not be callable without arguments", () => {
          expect(() => { jsonfile.getEOF(); }).to.throwException(( error ) => {
            expect( error ).to.be.an( Error );
          });
      });
      it( "should be callable with arguments 'grunt' and 'task'", () => {
          expect(() => { jsonfile.getEOF( env.grunt, env.task ); }).not.to.throwException();
          // console.log( jsonfile.getEOF( env.grunt, env.task ));
          expect( jsonfile.getEOF( env.grunt, env.task ) === os.EOL ).to.be.ok();
      });
    });
    describe( "Testing function 'getEOF' of module 'options/jsonfile' (mocked)", () => {
      it( "should return empty string if EOF option is false", () => {
          const mockTask = {
            options: () => ({ EOF: false })
          };

          const result = jsonfile.getEOF({}, mockTask);
          expect(result).to.be("");
      });

      it( "should return os.EOL if EOF option is true", () => {
          const mockTask = {
            options: () => ({ EOF: true })
          };

          const result = jsonfile.getEOF({}, mockTask);
          expect(result).to.be(os.EOL);
      });

      it( "should return empty string if EOF option is undefined", () => {
          const mockTask = {
            options: () => ({})
          };

          const result = jsonfile.getEOF({}, mockTask);
          expect(result).to.be("");
      });

      it( "should ignore unknown options and only react to EOF", () => {
          const mockTask = {
            options: () => ({ custom: 123, EOF: true })
          };

          const result = jsonfile.getEOF({}, mockTask);
          expect(result).to.be(os.EOL);
      });

      it( "should throw if task is undefined", () => {
          expect(() => {
            jsonfile.getEOF({}, undefined);
          }).to.throwException();
      });

      it( "should throw if task.options is not a function", () => {
          const mockTask = {
            options: null
          };

          expect(() => {
            jsonfile.getEOF({}, mockTask);
          }).to.throwException();
      });
    });
  });
})();
