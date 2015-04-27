var t       = require( './base/' )
  , Select  = require( '../../../src/components/compiled/primitives/select' )( t.React, t );

describe( 'primitives / select', function () {
    it( 'should create <select>', function () {
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

        var comp    = t.generateComponent( Select, conf )
          , select  = t.byTag( comp, 'select' )
          , options = t.byTagAll( comp, 'option' );
        expect( select ).toBeDefined(); 
        expect( options.length ).toBe( 2 ); 
    });


    it( 'should create readonly <select> if "isDisabled" is `true`', function () {
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

        var comp   = t.generateComponent( Select, conf )
          , select = t.byTag( comp, 'select' )
          , node   = t.findDOMNode( select );

        expect( node.getAttribute( 'disabled' ) ).toBeDefined(); 
        expect( node.getAttribute( 'disabled' ) ).not.toBeNull(); 
        
        conf.meta.isDisabled = false;
        comp   = t.generateComponent( Select, conf );
        select = t.byTag( comp, 'select' );
        node   = t.findDOMNode( select );
        expect( node.getAttribute( 'disabled' ) ).toBeNull(); 
    });


    it( 'should not create <select> if \"isHidden\" is `true`', function () {
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

        var comp   = t.generateComponent( Select, conf )
          , select = t.byTagAll( comp, 'select' );
        expect( select.length ).toEqual( 0 ); 
    });


    it( 'should render choosen option as selected', function () {
        var conf = { 
            meta: { 
                rendererSpecific: {
                    possibleValues: [
                        { id: 'first',  text: 'First' },
                        { id: 'second', text: 'Second' },
                        { id: 'third',  text: 'Third' }
                    ]
                }
            },
            value: 'second'
        };

        var comp    = t.generateComponent( Select, conf )
          , select  = t.byTag( comp, 'select' )
          , node    = t.findDOMNode( select );
        expect( node.value ).toBe( 'second' );
        
        conf.value = 'third';
        comp    = t.generateComponent( Select, conf );
        select  = t.byTag( comp, 'select' );
        node    = t.findDOMNode( select );
        expect( node.value ).toBe( 'third' );
        
        conf.value = '42';
        comp    = t.generateComponent( Select, conf );
        select  = t.byTag( comp, 'select' );
        node    = t.findDOMNode( select );
        expect( node.value ).toBe( 'first' );
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

        var comp   = t.generateComponent( Select, conf )
          , select = t.byTag( comp, 'select' )
          , node   = t.findDOMNode( select );

        t.Simulate.change( node, { target: { value: 'second' } } );
        expect( onChange ).toHaveBeenCalled();
        expect( onChange.calls.count() ).toEqual( 1 );
        expect( onChange.calls.first().args[0].value.testID ).toBe( 'second' );

        t.Simulate.change( node, { target: { value: 'first' } } );
        expect( onChange ).toHaveBeenCalled();
        expect( onChange.calls.count() ).toEqual( 2 );
        expect( onChange.calls.mostRecent().args[0].value.testID ).toBe( 'first' );
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

        var comp   = t.generateComponent( Select, conf )
          , select = t.byTag( comp, 'select' )
          , node   = t.findDOMNode( select );

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
