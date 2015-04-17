/** @jsx React.DOM */
// For PhantomJS. 
// See https://github.com/facebook/react/pull/347#issuecomment-24625365
require( 'es5-shim' );

var t        = require( './base/' )
  , TextArea = require( '../../../src/components/compiled/primitives/textarea' )( t.React, t );


describe( 'primitives / textarea', function () {
    it( 'should create "textarea" tag', function () {
        var comp     = t.generateComponent( TextArea )
          , textarea = t.byTag( comp, 'textarea' );
        expect( textarea ).toBeDefined();
    });


    it( 'should create readonly input if "isDisabled" is `true`', function () {
        var comp = t.generateComponent( TextArea, { meta: { isDisabled: true } } )
          , node = t.byTag( comp, 'textarea' ).getDOMNode();
        expect( node.getAttribute( 'readonly' ) ).toBeDefined(); 
        expect( node.getAttribute( 'readonly' ) ).not.toBeNull(); 
        
        comp = t.generateComponent( TextArea );
        node = t.byTag( comp, 'textarea' ).getDOMNode();
        expect( node.getAttribute( 'readonly' ) ).toBeNull(); 
    });


    it( 'should not create input if "isHidden" is `true`', function () {
        var comp = t.generateComponent( TextArea, { meta: { isHidden: true } })
          , nodes = t.byTagAll( comp, 'textarea' );
        expect( nodes.length ).toEqual( 0 ); 
    });
});
