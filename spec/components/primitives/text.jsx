/** @jsx React.DOM */
var t    = require( './base' )
  , Text = require( '../../../src/components/compiled/primitives/text' )( t.React, t );

/** Shared tests */
t.runTests( Text );


describe( 'primitives / text', function () {
    it( 'should create input with type "text"', function () {
        var text   = t.generateComponent( Text )
          , input  = t.byTag( text, 'input' );
        expect( input.getDOMNode().type ).toEqual( 'text' ); 
    });
});

