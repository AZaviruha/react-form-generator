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
    

    
    describe( 'reduce', function () {
        it( 'should return `acc` if `iterable` is not defined', function () {
            var acc = 42
              , f   = function () {};

            expect( g.reduce( f, acc, null ) ).toBe( acc );
            expect( g.reduce( f, acc, undefined ) ).toBe( acc );
        });

        it( 'should process array', function () {
            var arr = [1, 2, 3]
              , f   = function ( acc, val ) { return acc + val; };

            expect( g.reduce( f, 0, arr ) ).toBe( 6 );
        });

        it( 'should process objects', function () {
            var obj = { a: 1, b: 2, c: 3 }
              , f   = function ( acc, val ) { return acc + val; };

            expect( g.reduce( f, 0, obj ) ).toBe( 6 );
        });
    
    });
    


    describe( 'argsToArray', function () {
        it( 'should return empty array if function called without arguments', function () {
            (function () {
                expect( g.argsToArray( arguments ).length ).toBe( 0 );
            })();
        });
        
        
        it( 'should return array with the same elements as in arguments', function () {
            var f = function ( acc, val ) { return acc + val; };


            (function ( a, b, c ) {
                var sum = g.reduce( f, 0, g.argsToArray( arguments ) );
                expect( sum ).toBe( a + b + c );
            })( 1, 2, 3 );
        });
    });
    

    
    describe( 'merge', function () {
        it( 'should return first argument if second is not defined', function () {
            var a = {};
            expect( g.merge( a, null ) ).toBe( a );
            expect( g.merge( a, undefined ) ).toBe( a );
        });

        it( 'should return second argument if first is not defined', function () {
            var a = {};
            expect( g.merge( null, a ) ).toBe( a );
            expect( g.merge( undefined, a ) ).toBe( a );
        });
        
        it( 'should return merged object if both arguments are defined', function () {
            var a = { key1: 42 }
              , b = { key2: 42 };
            expect( g.merge( a, b ) ).toEqual({ key1: 42, key2: 42 });
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
