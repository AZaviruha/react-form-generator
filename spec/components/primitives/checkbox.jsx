var t        = require( './base/' )
  , Checkbox = require( '../../../src/components/compiled/primitives/checkbox' )( t.React, t );

describe( 'primitives / checkbox', function () {
    it( 'should create input with type "checkbox"', function () {
        var comp   = t.generateComponent( Checkbox )
          , input  = t.byTag( comp, 'input' );
        expect( t.findDOMNode( input ).type ).toEqual( 'checkbox' ); 
    });


    it( 'should create readonly input if "isDisabled" is `true`', function () {
        var comp  = t.generateComponent( Checkbox, { meta: { isDisabled: true } })
          , input = t.byTag( comp, 'input' )
          , node  = t.findDOMNode( input );
        expect( node.getAttribute( 'readonly' ) ).toBeDefined(); 
        expect( node.getAttribute( 'readonly' ) ).not.toBeNull(); 
        
        comp  = t.generateComponent( Checkbox );
        input = t.byTag( comp, 'input' );
        node  = t.findDOMNode( input );
        expect( node.getAttribute( 'readonly' ) ).toBeNull(); 
    });


    it( 'should not create input if \"isHidden\" is `true`', function () {
        var comp = t.generateComponent( Checkbox, { meta: { isHidden: true } })
          , node = t.byTagAll( comp, 'input' );
        expect( node.length ).toEqual( 0 ); 
    });


    it( 'should render checked checkbox if conf.value is `true`', function () {
        var conf   = { value: true }
          , comp   = t.generateComponent( Checkbox, conf )
          , input  = t.byTag( comp, 'input' )
          , node   = t.findDOMNode( input );

        expect( node.getAttribute( 'checked' ) ).not.toBeNull();
    });


    it( 'should render checked checkbox if conf.value is `false`', function () {
        var conf   = { value: false }
          , comp   = t.generateComponent( Checkbox, conf )
          , input  = t.byTag( comp, 'input' )
          , node   = t.findDOMNode( input );

        expect( node.getAttribute( 'checked' ) ).toBeNull();
    });
    

    it( 'should call `onChange` handler if field\'s value changed', function () {
        var onChange = jasmine.createSpy( 'spy' )
          , conf     = { onChange: onChange }
          , comp     = t.generateComponent( Checkbox, conf )
          , node     = t.byTag( comp, 'input' );

        t.Simulate.change( node, { target: { checked: false } } );
        expect( onChange ).toHaveBeenCalled();
        expect( onChange.calls.count() ).toEqual( 1 );
        expect( onChange.calls.first().args[0].value.testID ).toBe( 'false' );

        t.Simulate.change( node, { target: { checked: true } } );
        expect( onChange ).toHaveBeenCalled();
        expect( onChange.calls.count() ).toEqual( 2 );
        expect( onChange.calls.mostRecent().args[0].value.testID ).toBe( 'true' );
    });


    it( 'should call `onChange` handler with mapped value if `truthMap is defined.', function () {
        var onChange = jasmine.createSpy( 'spy' );
        
        var conf     = { 
            onChange: onChange,
            meta: {
                rendererSpecific: {
                    truthMap: {
                        'true': 1,
                        'false': 0
                    }
                }
            }
        };

        var comp     = t.generateComponent( Checkbox, conf )
          , node     = t.byTag( comp, 'input' );

        t.Simulate.change( node, { target: { checked: false } } );
        expect( onChange ).toHaveBeenCalled();
        expect( onChange.calls.count() ).toEqual( 1 );
        expect( onChange.calls.first().args[0].value.testID ).toBe( 0 );

        t.Simulate.change( node, { target: { checked: true } } );
        expect( onChange ).toHaveBeenCalled();
        expect( onChange.calls.count() ).toEqual( 2 );
        expect( onChange.calls.mostRecent().args[0].value.testID ).toBe( 1 );
    });
    

    it( 'should call `onEvent` handler when field emits event', function () {
        var onEvent = jasmine.createSpy( 'spy' )
          , conf    = { onEvent: onEvent, fieldID: 'newTestID' }
          , comp    = t.generateComponent( Checkbox, conf )
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
