/**
 *  © 2026, slashlib.org.
 */
const expect = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;

  describe( "05.10.tasks.jsonfile.runTask.spec.js", () => {
    const jsonfile = require( "../../lib/tasks/jsonfile" );

    describe( "Testing exports of module 'lib/tasks/jsonfile'", () => {
      it( "Function 'runTask' should exist", () => {
          expect( jsonfile.runTask ).not.to.be( undefined  );
          expect( jsonfile.runTask ).not.to.be( null       );
          expect( jsonfile.runTask ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'runTask' of module 'lib/tasks/jsonfile'", () => {
      it( "should not be callable without arguments.", () => {
          const errmsg = "Cannot read properties of undefined (reading 'data')";
          expect(() => { jsonfile.runTask()}).to.throwException(( error ) => {
            // console.log( "===>", error );
            expect( error ).to.be.a( TypeError );
            expect( error.message === errmsg ).to.be.ok();
          });
      });
      it( "should be callable with argument grunt {grunt} but get rejected", () => {
          expect(() => { jsonfile.runTask( env.grunt )}).to.throwException();
      });
      it( "should be callable with argument grunt {grunt} and task {grunt.task} and resolve", () => {
          expect(() => { 
            jsonfile.runTask( env.grunt, env.task );
          }).not.to.throwException(( error ) => { console.log( error )});
      });
      it( "should be callable with argument grunt {grunt}, task {grunt.task} and task.data.set { dummy: 'value' } and resolve", () => {
          env.task.data.set   = { dummy: "value" };
          env.task.data.merge = undefined;
          expect(() => { 
            jsonfile.runTask( env.grunt, env.task );
          }).not.to.throwException(( error ) => { console.log( error )});
      });
      it( "should be callable with argument grunt {grunt}, task {grunt.task} and task.data.merge { dummy: 'value' } and resolve", () => {
          env.task.data.set   = undefined;
          env.task.data.merge = { dummy: "value" };
          expect(() => { 
            jsonfile.runTask( env.grunt, env.task );
          }).not.to.throwException(( error ) => { console.log( error )});
      });
      it( "should be callable with argument grunt {grunt}, task {grunt.task} and task.data.dest {Array} and resolve", () => {
          env.task.data.set   = undefined;
          env.task.data.merge = undefined;
          env.task.data.dest  = [ "./src/test/tmp/target2.json", "./src/test/tmp/target3.json" ];
          expect(() => { 
            jsonfile.runTask( env.grunt, env.task );
          }).not.to.throwException(( error ) => { console.log( error )});
      });
      it( "should be callable with argument grunt {grunt}, task {grunt.task} and task.data.dest {Array} and resolve", () => {
          env.task.data.set    = undefined;
          env.task.data.merge  = undefined;
          env.task.data.update = { fun: "value" };
          env.task.data.dest   = [ "./src/test/tmp/target2.json", "./src/test/tmp/target3.json" ];
          expect(() => { 
            jsonfile.runTask( env.grunt, env.task );
          }).not.to.throwException(( error ) => { console.log( error )});
      });
    });
  });
})();
