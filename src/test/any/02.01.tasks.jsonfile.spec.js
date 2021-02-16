/**
 *  © 2020, slashlib.org.
 */
const expect    = require( "expect.js" );

( async function() {
  const constants = require( "./00.00.constants" );
  const env       = await constants.env;
  const options   = await constants.options;

  describe( "02.01.tasks.jsonfile.spec.js", () => {
    const jsonfile = require( "../../lib/tasks/jsonfile" );

    describe( "Testing exports of module 'tasks/jsonfile'", () => {
      it( "Function 'getTemplate' should exist", () => {
          expect( jsonfile.getTemplate ).not.to.be( undefined  );
          expect( jsonfile.getTemplate ).not.to.be( null       );
          expect( jsonfile.getTemplate ).to.be.a(   "function" );
      });
      it( "Function 'mergeValues' should exist", () => {
          expect( jsonfile.mergeValues ).not.to.be( undefined  );
          expect( jsonfile.mergeValues ).not.to.be( null       );
          expect( jsonfile.mergeValues ).to.be.a(   "function" );
      });
      it( "Function 'runTaskJSONFile' should exist", () => {
          expect( jsonfile.runTaskJSONFile ).not.to.be( undefined  );
          expect( jsonfile.runTaskJSONFile ).not.to.be( null       );
          expect( jsonfile.runTaskJSONFile ).to.be.a(   "function" );
      });
    });
    describe( "Testing function 'getTemplate' of module 'tasks/jsonfile'", () => {
      it( "should be callable without arguments", () => {
          expect(() => { jsonfile.getTemplate(); }).not.to.throwException();
          const result = jsonfile.getTemplate();
          expect( JSON.stringify( result ) === JSON.stringify({})).to.be.ok();
      });
      it( "should be callable with arguments and 'targetconfig' { }", () => {
          const targetconfig = { };
          expect(() => { jsonfile.getTemplate( env.grunt, env.task, targetconfig ); }).not.to.throwException();
          const result = jsonfile.getTemplate( env.grunt, env.task, targetconfig );
          expect( JSON.stringify( result ) === JSON.stringify({})).to.be.ok();
      });
      it( "should be callable with arguments and 'targetconfig' { template: { test = 'value' }}", () => {
          const template      = { test: 'value' };
          const targetconfig  = { template };
          expect(() => { jsonfile.getTemplate( env.grunt, env.task, targetconfig ); }).not.to.throwException();
          const result = jsonfile.getTemplate( env.grunt, env.task, targetconfig );
          expect( JSON.stringify( result ) === JSON.stringify( template )).to.be.ok();
      });
      it( "should be callable with arguments and 'targetconfig' { template: 'package.json' }", () => {
          const template      = "package.json";
          const targetconfig  = { template };
          expect(() => { jsonfile.getTemplate( env.grunt, env.task, targetconfig ); }).not.to.throwException();
          const result = jsonfile.getTemplate( env.grunt, env.task, targetconfig );
          expect( JSON.stringify( result ) === JSON.stringify( env.grunt.file.readJSON( template ) )).to.be.ok();
      });
      it( "should be callable with arguments and 'targetconfig' { template: 'one' }", () => {
          const template      = "one";
          const targetconfig  = { template };
          expect(() => { jsonfile.getTemplate( env.grunt, env.task, targetconfig ); }).not.to.throwException();
          const result = jsonfile.getTemplate( env.grunt, env.task, targetconfig );
          expect( JSON.stringify( result ) === JSON.stringify( env.grunt.file.readJSON( "package.json" ) )).to.be.ok();
      });
    });
    describe( "Testing function 'setValues' of module 'tasks/jsonfile'", () => {
      it( "should be callable without arguments", () => {
          const errmsg = "Cannot convert undefined or null to object";
          expect(() => { jsonfile.setValues(); }).to.throwException(( error ) => {
            // console.log( error )
            expect( error ).to.be.a( TypeError );
            expect( error.message === errmsg ).to.be.ok();
          });
      });
      it( "should be callable with 'target' { } and 'container' { dummy: 'value' }", () => {
          const target    = { };
          const container = { dummy: "value" };
          expect(() => { jsonfile.setValues( target, container ); }).not.to.throwException();
          // console.log( target );
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
    });
    describe( "Testing function 'mergeValues' of module 'tasks/jsonfile'", () => {
      it( "should be callable without arguments", () => {
          expect(() => { jsonfile.mergeValues(); }).not.to.throwException();
      });
      it( "should be callable with 'target' { } and 'container' {undefined|null}", () => {
          const target    = { };
          const container = undefined;
          expect(() => { jsonfile.mergeValues( target, undefined ); }).not.to.throwException();
          expect(() => { jsonfile.mergeValues( target, null      ); }).not.to.throwException();
      });
      it( "should be callable with 'target' { } and 'container' {undefined|null}", () => {
          const target    = { };
          const container = { dummy: "value" };
          expect(() => { jsonfile.mergeValues( target, container ); }).not.to.throwException();
      });
      it( "should be callable with 'target' { 1 } and 'container' { 1 }", () => {
          const target    = { hurz: "to be deleted" };
          const container = { hurz: false, dummy: "value" };
          expect(() => { jsonfile.mergeValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 1 } and 'container' { 2 }", () => {
          const target    = { hurz: "to be deleted" };
          const container = { hurz: null, dummy: "value" };
          expect(() => { jsonfile.mergeValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 1 } and 'container' { 3 }", () => {
          const target    = { hurz: "to be deleted" };
          const container = { hurz: undefined, dummy: "value" };
          expect(() => { jsonfile.mergeValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 2 } and 'container' { 3 }", () => {
          const target    = { hurz: 4 };
          const container = { hurz: 9 };
          expect(() => { jsonfile.mergeValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 3 } and 'container' { 4 }", () => {
          const target    = { hurz: [ 1, 2, 3 ]};
          const container = { hurz: [ 3, 4, 5 ]};
          expect(() => { jsonfile.mergeValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
// =>
      it( "should be callable with 'target' { 4 } and 'container' { 5 }", () => {
          const target    = { hurz: { }};
          const container = { hurz: undefined };
          expect(() => { jsonfile.mergeValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 5 } and 'container' { 6 }", () => {
          const target    = { hurz: { gnarf: "fun" }};
          const container = { hurz: { test:  "out of fun" }};
          expect(() => { jsonfile.mergeValues( target, container ); }).not.to.throwException();
          // expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 6 } and 'container' { 7 }", () => {
          const target    = { hurz: () => { }};
          const container = { hurz: "blubb"  };
          expect(() => { jsonfile.mergeValues( target, container ); }).not.to.throwException();
          // expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
    });
    describe( "Testing function 'updateValues' of module 'tasks/jsonfile'", () => {
      it( "should be callable without arguments", () => {
          expect(() => { jsonfile.updateValues(); }).not.to.throwException();
      });
      it( "should be callable with 'target' { } and 'container' {undefined|null}", () => {
          const target    = { };
          const container = undefined;
          expect(() => { jsonfile.updateValues( target, undefined ); }).not.to.throwException();
          expect(() => { jsonfile.updateValues( target, null      ); }).not.to.throwException();
      });
      it( "should be callable with 'target' { } and 'container' {undefined|null}", () => {
          const target    = { };
          const container = { dummy: "value" };
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
      });
      it( "should be callable with 'target' { 1 } and 'container' { 1 }", () => {
          const target    = { hurz: "to be deleted" };
          const container = { hurz: false, dummy: "value" };
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify({ hurz: false })).to.be.ok();
      });
      it( "should be callable with 'target' { 1 } and 'container' { 2 }", () => {
          const target    = { hurz: "to be deleted" };
          const container = { hurz: null, dummy: "value" };
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify({ hurz: null })).to.be.ok();
      });
      it( "should be callable with 'target' { 1 } and 'container' { 3 }", () => {
          const target    = { hurz: "to be deleted" };
          const container = { hurz: undefined, dummy: "value" };
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify({ hurz: undefined })).to.be.ok();
      });
      it( "should be callable with 'target' { 2 } and 'container' { 3 }", () => {
          const target    = { hurz: 4 };
          const container = { hurz: 9 };
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 3 } and 'container' { 4 }", () => {
          const target    = { hurz: [ 1, 2, 3 ]};
          const container = { hurz: [ 3, 4, 5 ]};
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 3 } and 'container' { 4 }", () => {
          const target    = { hurz: "test" };
          const container = { hurz: new String( "fun" ) };
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 3 } and 'container' { 4 }", () => {
          const target    = { hurz: "test" };
          const container = { hurz: function( ) { return 3; }};
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 3 } and 'container' { 4 }", () => {
          const target    = { hurz: "test" };
          const container = { hurz: new Date() };
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 3 } and 'container' { 4 }", () => {
          const target    = { hurz: "test" };
          const container = { hurz: { blubb: "blubb" }};
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
      it( "should be callable with 'target' { 3 } and 'container' { 4 }", () => {
          const target    = { hurz: { blubb: "test"  }};
          const container = { hurz: { blubb: "blubb" }};
          expect(() => { jsonfile.updateValues( target, container ); }).not.to.throwException();
          expect( JSON.stringify( target ) === JSON.stringify( container )).to.be.ok();
      });
    });
    describe( "Testing function 'runTaskJSONFile' of module 'tasks/jsonfile'", () => {
      it( "should not be callable without arguments.", () => {
          const errmsg = "Cannot read property 'data' of undefined";
          expect(() => { jsonfile.runTaskJSONFile()
                                .then(( value ) => { done( new Error( "Should not resolve" )); },
                                      ( error ) => {
                                        // console.log( error );
                                        expect( error ).to.be.an( TypeError );
                                        expect( error.message === errmsg ).to.be.ok();
                                        done();
                                 })
                                .catch(( error ) => { done( error ); });
                       }).not.to.throwException();
      });
      it( "should be callable with argument grunt {grunt} but get rejected", ( done ) => {
          expect(() => { jsonfile.runTaskJSONFile( env.grunt )
                                 .then(( value ) => { done( new Error( "Should not resolve" )); },
                                       ( error ) => {
                                         // console.log( error );
                                         expect( error ).to.be.an( Error );
                                         done();
                                  })
                                 .catch(( error ) => { done( error ); });
                       }).not.to.throwException(( error ) => { console.log( error )});
      });
      it( "should be callable with argument grunt {grunt} and task {grunt.task} and resolve", ( done ) => {
          expect(() => { jsonfile.runTaskJSONFile( env.grunt, env.task )
                                 .then(( value ) => {
                                         // console.log( value )
                                         expect( JSON.stringify( value ) === JSON.stringify({ })).to.be.ok();
                                         done();
                                  })
                                 .catch(( error ) => { done( error ); });
                       }).not.to.throwException(( error ) => { console.log( error )});
      });
      it( "should be callable with argument grunt {grunt}, task {grunt.task} and task.data.set { dummy: 'value' } and resolve", ( done ) => {
          env.task.data.set   = { dummy: "value" };
          env.task.data.merge = undefined;
          expect(() => { jsonfile.runTaskJSONFile( env.grunt, env.task )
                                 .then(( value ) => {
                                         // console.log( value )
                                         expect( JSON.stringify( value ) === JSON.stringify( env.task.data.set )).to.be.ok();
                                         done();
                                  })
                                 .catch(( error ) => { done( error ); });
                       }).not.to.throwException(( error ) => { console.log( error )});
      });
      it( "should be callable with argument grunt {grunt}, task {grunt.task} and task.data.merge { dummy: 'value' } and resolve", ( done ) => {
          env.task.data.set   = undefined;
          env.task.data.merge = { dummy: "value" };
          expect(() => { jsonfile.runTaskJSONFile( env.grunt, env.task )
                                 .then(( value ) => {
                                         // console.log( value )
                                         expect( JSON.stringify( value ) === JSON.stringify( env.task.data.merge )).to.be.ok();
                                         done();
                                  })
                                 .catch(( error ) => { done( error ); });
                       }).not.to.throwException(( error ) => { console.log( error )});
      });
      it( "should be callable with argument grunt {grunt}, task {grunt.task} and task.data.dest {Array} and resolve", ( done ) => {
          env.task.data.set   = undefined;
          env.task.data.merge = undefined;
          env.task.data.dest  = [ "./src/test/tmp/target2.json", "./src/test/tmp/target3.json" ];
          expect(() => { jsonfile.runTaskJSONFile( env.grunt, env.task )
                                 .then(( value ) => {
                                         // console.log( value )
                                         expect( JSON.stringify( value ) === JSON.stringify({ })).to.be.ok();
                                         done();
                                  })
                                 .catch(( error ) => { done( error ); });
                       }).not.to.throwException(( error ) => { console.log( error )});
      });
      it( "should be callable with argument grunt {grunt}, task {grunt.task} and task.data.dest {Array} and resolve", ( done ) => {
          env.task.data.set    = undefined;
          env.task.data.merge  = undefined;
          env.task.data.update = { fun: "value" };
          env.task.data.dest   = [ "./src/test/tmp/target2.json", "./src/test/tmp/target3.json" ];
          expect(() => { jsonfile.runTaskJSONFile( env.grunt, env.task )
                                 .then(( value ) => {
                                         // console.log( value )
                                         expect( JSON.stringify( value ) === JSON.stringify({ })).to.be.ok();
                                         done();
                                  })
                                 .catch(( error ) => { done( error ); });
                       }).not.to.throwException(( error ) => { console.log( error )});
      });
    });
  });
})();
