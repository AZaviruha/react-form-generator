var t      = require( './base/' )
  , Button = require( '../../../src/components/compiled/primitives/button' )( t.React, t );

describe( 'primitives / button', function () {
    it( 'should create <button> node', function () {
        var comp    = t.generateComponent( Button )
          , buttons = t.byTagAll( comp, 'button' );
        expect( buttons.length ).toEqual( 1 ); 
    });


    it( 'should create disabled <button> if "isDisabled" is `true`', function () {
        var comp = t.generateComponent( Button, { meta: { isDisabled: true } })
          , node = t.byTag( comp, 'button' ).getDOMNode();
        expect( node.getAttribute( 'disabled' ) ).toBeDefined(); 
        expect( node.getAttribute( 'disabled' ) ).not.toBeNull(); 
        
        comp = t.generateComponent( Button);
        node = t.byTag( comp, 'button' ).getDOMNode();
        expect( node.getAttribute( 'disabled' ) ).toBeNull(); 
    });


    it( 'should not create if <button> "isHidden" is `true`', function () {
        var comp = t.generateComponent( Button, { meta: { isHidden: true } })
          , node = t.byTagAll( comp, 'button' );
        expect( node.length ).toEqual( 0 ); 
    });


    it( 'should call `onEvent` handler when field emits event', function () {
        var onEvent = jasmine.createSpy( 'spy' )
          , conf    = { onEvent: onEvent, fieldID: 'newTestID' }
          , comp    = t.generateComponent( Button, conf )
          , node    = t.byTag( comp, 'button' )
          , args;

        t.Simulate.click( node );
        expect( onEvent ).toHaveBeenCalled();
        expect( onEvent.calls.count() ).toEqual( 1 );
        args = onEvent.calls.first().args;
        expect( args[0] ).toBe( conf.fieldID );
        expect( args[1] ).toBe( 'click' );
    });
});
