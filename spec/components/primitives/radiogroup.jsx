var t          = require( './base/' )
  , RadioGroup = require( '../../../src/components/compiled/primitives/radiogroup' )( t.React, t );

describe( 'primitives / radiogroup', function () {
    it( 'should create set of inputs with type "radio"', function () {
        var conf = { 
            meta: { 
                rendererSpecific: {
                    possibleValues: [
                        { id: 'first',  text: 'First' },
                        { id: 'second', text: 'Second' }
                    ]
                }
            } 
        };

        var comp   = t.generateComponent( RadioGroup, conf )
          , inputs = t.byTagAll( comp, 'input' );
        expect( inputs.length ).toBe( 2 ); 
        expect( t.findDOMNode( inputs[0] ).type ).toBe( 'radio' ); 
        expect( t.findDOMNode( inputs[1] ).type ).toBe( 'radio' ); 
    });


    it( 'should create readonly inputs if "isDisabled" is `true`', function () {
        var conf   = { 
            meta: { 
                isDisabled: true,
                rendererSpecific: {
                    possibleValues: [
                        { id: 'first',  text: 'First' },
                        { id: 'second', text: 'Second' }
                    ]
                }
            } 
        };

        var comp   = t.generateComponent( RadioGroup, conf )
          , inputs = t.byTagAll( comp, 'input' )
          , node1  = t.findDOMNode( inputs[0] )
          , node2  = t.findDOMNode( inputs[1] );

        expect( node1.getAttribute( 'readonly' ) ).toBeDefined(); 
        expect( node1.getAttribute( 'readonly' ) ).not.toBeNull(); 
        expect( node2.getAttribute( 'readonly' ) ).toBeDefined(); 
        expect( node2.getAttribute( 'readonly' ) ).not.toBeNull(); 
        
        conf.meta.isDisabled = false;
        comp   = t.generateComponent( RadioGroup, conf );
        inputs = t.byTagAll( comp, 'input' );
        node1  = t.findDOMNode( inputs[0] );
        node2  = t.findDOMNode( inputs[1] );
        expect( node1.getAttribute( 'readonly' ) ).toBeNull(); 
        expect( node2.getAttribute( 'readonly' ) ).toBeNull(); 
    });


    it( 'should not create input if \"isHidden\" is `true`', function () {
        var conf = { 
            meta: { 
                isHidden: true,
                rendererSpecific: {
                    possibleValues: [
                        { id: 'first',  text: 'First' },
                        { id: 'second', text: 'Second' }
                    ]
                }
            } 
        };

        var comp   = t.generateComponent( RadioGroup, conf )
          , inputs = t.byTagAll( comp, 'input' );
        expect( inputs.length ).toEqual( 0 ); 
    });


    it( 'should render choosen radiobutton as selected', function () {
        var conf = { 
            meta: { 
                rendererSpecific: {
                    possibleValues: [
                        { id: 'first',  text: 'First' },
                        { id: 'second', text: 'Second' }
                    ]
                }
            },
            value: 'first'
        };

        var comp   = t.generateComponent( RadioGroup, conf )
          , inputs = t.byTagAll( comp, 'input' )
          , node1  = t.findDOMNode( inputs[0] )
          , node2  = t.findDOMNode( inputs[1] );
        expect( node1.getAttribute( 'checked' ) ).not.toBeNull();
        expect( node2.getAttribute( 'checked' ) ).toBeNull();
        
        conf.value = 'second';
        comp   = t.generateComponent( RadioGroup, conf );
        inputs = t.byTagAll( comp, 'input' );
        node1  = t.findDOMNode( inputs[0] );
        node2  = t.findDOMNode( inputs[1] );
        expect( node1.getAttribute( 'checked' ) ).toBeNull();
        expect( node2.getAttribute( 'checked' ) ).not.toBeNull();
        
        conf.value = 'third';
        comp   = t.generateComponent( RadioGroup, conf );
        inputs = t.byTagAll( comp, 'input' );
        node1  = t.findDOMNode( inputs[0] );
        node2  = t.findDOMNode( inputs[1] );
        expect( node1.getAttribute( 'checked' ) ).toBeNull();
        expect( node2.getAttribute( 'checked' ) ).toBeNull();
    });


    it( 'should call `onChange` handler if field\'s value changed', function () {
        var onChange = jasmine.createSpy( 'spy' );

        var conf = { 
            meta: { 
                rendererSpecific: {
                    possibleValues: [
                        { id: 'first',  text: 'First' },
                        { id: 'second', text: 'Second' }
                    ]
                }
            },
            value: 'first',
            onChange: onChange
        };

        var comp   = t.generateComponent( RadioGroup, conf )
          , inputs = t.byTagAll( comp, 'input' )
          , node1  = t.findDOMNode( inputs[0] )
          , node2  = t.findDOMNode( inputs[1] );

        t.Simulate.change( node1, { target: { checked: true } } );
        expect( onChange ).toHaveBeenCalled();
        expect( onChange.calls.count() ).toEqual( 1 );
        expect( onChange.calls.first().args[0].value.testID ).toBe( 'first' );

        t.Simulate.change( node2, { target: { checked: true } } );
        expect( onChange ).toHaveBeenCalled();
        expect( onChange.calls.count() ).toEqual( 2 );
        expect( onChange.calls.mostRecent().args[0].value.testID ).toBe( 'second' );
    });


    it( 'should call `onEvent` handler when field emits event', function () {
        var onEvent = jasmine.createSpy( 'spy' )
          , args;

        var conf = { 
            fieldID: 'newTestID',
            meta: { 
                rendererSpecific: {
                    possibleValues: [
                        { id: 'first',  text: 'First' },
                        { id: 'second', text: 'Second' }
                    ]
                }
            },
            value: 'first',
            onEvent: onEvent
        };

        var comp   = t.generateComponent( RadioGroup, conf )
          , inputs = t.byTagAll( comp, 'input' )
          , node1  = t.findDOMNode( inputs[0] )
          , node2  = t.findDOMNode( inputs[1] );

        t.Simulate.blur( node1 );
        expect( onEvent ).toHaveBeenCalled();
        expect( onEvent.calls.count() ).toEqual( 1 );
        args = onEvent.calls.first().args;
        expect( args[0] ).toBe( conf.fieldID );
        expect( args[1] ).toBe( 'blur' );
        
        t.Simulate.focus( node2 );
        expect( onEvent ).toHaveBeenCalled();
        expect( onEvent.calls.count() ).toEqual( 2 );
        args = onEvent.calls.mostRecent().args;
        expect( args[0] ).toBe( conf.fieldID );
        expect( args[1] ).toBe( 'focus' );
    });
});
