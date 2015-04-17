/** @jsx React.DOM */
var t    = require( './base/' )
  , Text = require( '../../../src/components/compiled/primitives/text' )( t.React, t );

describe( 'primitives / text', function () {
    it( 'should create input with type "text"', function () {
        var comp   = t.generateComponent( Text )
          , input  = t.byTag( comp, 'input' );
        expect( input.getDOMNode().type ).toEqual( 'text' ); 
    });


    it( 'should create readonly input if "isDisabled" is `true`', function () {
        var comp = t.generateComponent( Text, { meta: { isDisabled: true } })
          , node = t.byTag( comp, 'input' ).getDOMNode();
        expect( node.getAttribute( 'readonly' ) ).toBeDefined(); 
        expect( node.getAttribute( 'readonly' ) ).not.toBeNull(); 
        
        comp = t.generateComponent( Text);
        node = t.byTag( comp, 'input' ).getDOMNode();
        expect( node.getAttribute( 'readonly' ) ).toBeNull(); 
    });


    it( 'should not create input if \"isHidden\" is `true`', function () {
        var comp = t.generateComponent( Text, { meta: { isHidden: true } })
          , node = t.byTagAll( comp, 'input' );
        expect( node.length ).toEqual( 0 ); 
    });


    it( 'should call `onChange` handler if field\'s value changed', function () {
        var onChange = jasmine.createSpy( 'spy' )
          , conf     = { onChange: onChange }
          , comp     = t.generateComponent( Text, conf )
          , node     = t.byTag( comp, 'input' );

        t.Simulate.change( node, { target: { value: '42' } } );
        expect( onChange ).toHaveBeenCalled();
        expect( onChange.calls.count() ).toEqual( 1 );
        expect( onChange.calls.first().args[0].value.testID ).toBe( '42' );
    });


    it( 'should call `onEvent` handler when field emits event', function () {
        var onEvent = jasmine.createSpy( 'spy' )
          , conf    = { onEvent: onEvent, fieldID: 'newTestID' }
          , comp    = t.generateComponent( Text, conf )
          , node    = t.byTag( comp, 'input' )
          , args;

        t.Simulate.blur( node );
        expect( onEvent ).toHaveBeenCalled();
        expect( onEvent.calls.count() ).toEqual( 1 );
        args = onEvent.calls.first().args;
        expect( args[0] ).toBe( conf.fieldID );
        expect( args[1] ).toBe( 'blur' );
        
        t.Simulate.focus( node );
        expect( onEvent ).toHaveBeenCalled();
        expect( onEvent.calls.count() ).toEqual( 2 );
        args = onEvent.calls.mostRecent().args;
        expect( args[0] ).toBe( conf.fieldID );
        expect( args[1] ).toBe( 'focus' );
    });

});
