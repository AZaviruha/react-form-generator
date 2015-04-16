/** @jsx React.DOM */
// For PhantomJS. 
// See https://github.com/facebook/react/pull/347#issuecomment-24625365
require( 'es5-shim' );

var React      = require( 'react/addons' )
  , TestUtils  = React.addons.TestUtils
  , byTag      = TestUtils.findRenderedDOMComponentWithTag 
  , byTagAll   = TestUtils.scryRenderedDOMComponentsWithTag
  , byClass    = TestUtils.findRenderedDOMComponentWithClass 
  , byClassAll = TestUtils.scryRenderedDOMComponentsWithClass 
  , Simulate   = TestUtils.Simulate
  , tools      = require( '../../../src/tools/' )
  , Text       = require( '../../../src/components/compiled/primitives/text' )( React, tools );

describe( "primitives / text", function () {
    it( "should create input with type \"text\"", function () {
        var text   = generateText()
          , input  = byTag( text, 'input' );
        expect( input.getDOMNode().type ).toEqual( 'text' ); 
    });


    it( "should create readonly input if \"isDisabled\" is `true`", function () {
        var text = generateText({ meta: { isDisabled: true } })
          , node = byTag( text, 'input' ).getDOMNode();
        expect( node.getAttribute( 'readonly' ) ).toBeDefined(); 
        expect( node.getAttribute( 'readonly' ) ).not.toBeNull(); 
        
        text = generateText();
        node = byTag( text, 'input' ).getDOMNode();
        expect( node.getAttribute( 'readonly' ) ).toBeNull(); 
    });


    it( "should not create input if \"isHidden\" is `true`", function () {
        var text = generateText({ meta: { isHidden: true } })
          , node = byTagAll( text, 'input' );
        expect( node.length ).toEqual( 0 ); 
    });


    it( "should call `onChange` handler if field's value changed", function () {
        var onChange = function ( res ) { expect( res.value.testID ).toBe( '42' ); }
          , conf     = { onChange: onChange }
          , text     = generateText( conf )
          , node     = byTag( text, 'input' );

        Simulate.change( node, { target: { value: '42' }} );
    });



    function generateText ( newConfig ) {
        var defaultConfig = {
            fieldID: 'testID',
            meta: {},
            css: '',
            value: null,
            errors: null,
            onChange: function () {},
            onEvent: function () {}
        };
        
        var config = tools.merge( defaultConfig, newConfig );

        return TestUtils.renderIntoDocument(
            <Text config={config} />
        );
    }
});
