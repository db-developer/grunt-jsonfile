/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  // const constants = require( "./00.00.constants" );
  // const env       = await constants.env;

  describe( "05.01.tasks.jsonfile.spec.js", () => {
    const jsonfile = require( "../../lib/tasks/jsonfile" );

    describe( "Testing exports of module 'lib/tasks/jsonfile'", () => {
      it( "Function 'getTemplate' should exist", () => {
          expect( jsonfile.getTemplate  ).not.to.be( undefined  );
          expect( jsonfile.getTemplate  ).not.to.be( null       );
          expect( jsonfile.getTemplate  ).to.be.a(   "function" );
      });
      it( "Function 'setValues' should exist", () => {
          expect( jsonfile.setValues    ).not.to.be( undefined  );
          expect( jsonfile.setValues    ).not.to.be( null       );
          expect( jsonfile.setValues    ).to.be.a(   "function" );
      });
      it( "Function 'mergeValues' should exist", () => {
          expect( jsonfile.mergeValues  ).not.to.be( undefined  );
          expect( jsonfile.mergeValues  ).not.to.be( null       );
          expect( jsonfile.mergeValues  ).to.be.a(   "function" );
      });
      it( "Function 'mergeValues' should exist", () => {
          expect( jsonfile.updateValues ).not.to.be( undefined  );
          expect( jsonfile.updateValues ).not.to.be( null       );
          expect( jsonfile.updateValues ).to.be.a(   "function" );
      });
      it( "Function 'runTask' should exist", () => {
          expect( jsonfile.runTask      ).not.to.be( undefined  );
          expect( jsonfile.runTask      ).not.to.be( null       );
          expect( jsonfile.runTask      ).to.be.a(   "function" );
      });
    });
  });
})();
