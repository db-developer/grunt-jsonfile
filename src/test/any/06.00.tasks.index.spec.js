/**
 *  © 2020, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  // const constants = require( "./00.00.constants" );
  // const env       = await constants.env;

  describe( "06.00.tasks.index.spec.js", () => {
    const tasks = require( "../../lib/tasks/index" );

    describe( "Testing exports of module 'lib/tasks (lib/tasks/index)'", () => {
      it( "Function 'runTask' should exist", () => {
          expect( tasks.runTask ).not.to.be( undefined  );
          expect( tasks.runTask ).not.to.be( null       );
          expect( tasks.runTask ).to.be.a(   "function" );
      });
    });
  });
})();
