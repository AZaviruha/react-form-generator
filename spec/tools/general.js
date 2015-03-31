var g = require( '../../src/tools/general' );

describe( 'tools/general.js', function () {
    describe( 'isDefined', function () {
        it( 'should return `true` if `x` is not `null` or `undefined`', function () {
            expect( g.isDefined( 0 ) ).toBe( true );
            expect( g.isDefined( '' ) ).toBe( true );
            expect( g.isDefined( false ) ).toBe( true );
            expect( g.isDefined( [] ) ).toBe( true );
            expect( g.isDefined( {} ) ).toBe( true );
            expect( g.isDefined( 1 ) ).toBe( true );
        });

        it( 'should return `false` if `x` is `null`', function () {
            expect( g.isDefined( null ) ).toBe( false );
        });

        it( 'should return `false` if `x` is `undefined`', function () {
            expect( g.isDefined( undefined ) ).toBe( false );
        });
    });
    

    describe( 'isArray', function () {
        it( 'should return `true` if `x` is array', function () {
            expect( g.isArray( [] ) ).toBe( true );
            expect( g.isArray( [42] ) ).toBe( true );
        });

        it( 'should return `false` if `x` is not array', function () {
            expect( g.isArray( null ) ).toBe( false );
            expect( g.isArray( '42' ) ).toBe( false );
            (function () { expect( g.isArray( arguments ) ).toBe( false ); })();
        });
    });


    describe( 'isString', function () {
        it( 'should return `true` if `x` is string', function () {
            expect( g.isString( '' ) ).toBe( true );
            expect( g.isString( '42' ) ).toBe( true );
        });

        it( 'should return `false` if `x` is not string', function () {
            expect( g.isString( null ) ).toBe( false );
            expect( g.isString( [] ) ).toBe( false );
        });
    });
    

    describe( 'getOrDefault', function () {
        it( 'should return existed value from nested object', function () {
            var root = { a: { b: { c: 100 } } };
            expect( g.getOrDefault( root, 'a.b.c' ) ).toBe( 100 );
        });

        it( 'should return default value if nested value does not exist', function () {
            var root = { a: { b: { c: 100 } } };
            expect( g.getOrDefault( root, 'a.b.d', 42 ) ).toBe( 42 );
        });


        it( 'should return existed value by index in nested array', function () {
            var root = { a: { b: { c: [10,20,30] } } };
            expect( g.getOrDefault( root, 'a.b.c.1' ) ).toBe( 20 );
        });
    });

    
    describe( 'arrayToObject', function () {
        it( 'should return empty object if `arr` is empty', function () {
            expect( getKeys( g.arrayToObject( [], '' ) ).length ).toEqual( 0 );
        });
        
        it( 'should return empty object if `arr` does not contain elements with `keyPath`', function () {
            expect( getKeys( g.arrayToObject( [], '' ) ).length ).toEqual( 0 );
        });
    });
    
});

function getKeys ( obj ) {
    var res = [];
    for ( var key in obj ) {
        if ( obj.hasOwnProperty( key ) ) res.push( key );
    }
    
    return res;
}
