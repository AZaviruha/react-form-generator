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


    it( 'should not create textarea if "isHidden" is `true`', function () {
        var comp = t.generateComponent( TextArea, { meta: { isHidden: true } })
          , nodes = t.byTagAll( comp, 'textarea' );
        expect( nodes.length ).toEqual( 0 ); 
    });
    

    it( 'should call `onChange` handler if field\'s value changed', function () {
        var onChange = jasmine.createSpy( 'spy' )
          , conf     = { onChange: onChange }
          , comp     = t.generateComponent( TextArea, conf )
          , node     = t.byTag( comp, 'textarea' );

        t.Simulate.change( node, { target: { value: '42' } } );
        expect( onChange ).toHaveBeenCalled();
        expect( onChange.calls.count() ).toEqual( 1 );
        expect( onChange.calls.first().args[0].value.testID ).toBe( '42' );
    });
    

    it( 'should call `onEvent` handler when field emits event', function () {
        var onEvent = jasmine.createSpy( 'spy' )
          , conf    = { onEvent: onEvent, fieldID: 'newTestID' }
          , comp    = t.generateComponent( TextArea, conf )
          , node    = t.byTag( comp, 'textarea' )
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


    it( 'should create textarea with proper number of `rows`', function () {
        var conf = { meta: { rendererSpecific: { rows: 42 } } }
          , comp = t.generateComponent( TextArea, conf )
          , node = t.byTag( comp, 'textarea' ).getDOMNode();

        expect( node.getAttribute( 'rows' ) ).toBe( '42' ); 
    });
    

    it( 'should create textarea with proper number of `cols`', function () {
        var conf = { meta: { rendererSpecific: { cols: 42 } } }
          , comp = t.generateComponent( TextArea, conf )
          , node = t.byTag( comp, 'textarea' ).getDOMNode();

        expect( node.getAttribute( 'cols' ) ).toBe( '42' ); 
    });
});
