/**
 *  © 2020, slashlib.org.
 */
const expect    = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;

  describe( "02.09.tasks.index.spec.js", () => {
    const tasks = require( "../../lib/tasks/index" );

    describe( "Testing exports of module 'tasks'", () => {
      it( "Function 'runTaskJSONFile' should exist", () => {
          expect( tasks.runTaskJSONFile ).not.to.be( undefined  );
          expect( tasks.runTaskJSONFile ).not.to.be( null       );
          expect( tasks.runTaskJSONFile ).to.be.a(   "function" );
      });
    });
  });
})();
