/** @jsx React.DOM */

var t        = require( './base' )
  , TextArea = require( '../../../src/components/compiled/primitives/textarea' )( t.React, t );

/** Shared tests */
t.runTests( TextArea );

describe( 'primitives / textarea', function () {
    it( 'should create "textarea"', function () {
        var text   = t.generateComponent( TextArea )
          , input  = t.byTag( text, 'textarea' );
        expect( input ).toBeDefined(); 
    });
});

