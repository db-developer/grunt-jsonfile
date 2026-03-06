/**
 *  © 2026, slashlib.org.
 */
const expect    = require( "expect.js" );

( async function() {
  // const constants = require( "./00.00.constants" );
  // const env       = await constants.env;

  describe( "01.01.constants.spec.js", () => {
    const constants = require( "../../lib/constants" );

    describe( "Testing exports of module 'lib/constants'", () => {
      it( "String 'TASKNAME' should exist", () => {
          expect( constants.TASKNAME       ).not.to.be( undefined  );
          expect( constants.TASKNAME       ).not.to.be( null       );
          expect( constants.TASKNAME       ).to.be.a(   "string"   );
          expect( constants.TASKNAME === "jsonfile" ).to.ok();
      });
      it( "String 'TASKDESCRIPTION' should exist", () => {
          expect( constants.TASKDESCRIPTION ).not.to.be( undefined  );
          expect( constants.TASKDESCRIPTION ).not.to.be( null       );
          expect( constants.TASKDESCRIPTION ).to.be.a(   "string"   );
          expect( constants.TASKDESCRIPTION === "Create, modify and distribute jsonfiles." ).to.ok();
      });
    });
  });
})();
