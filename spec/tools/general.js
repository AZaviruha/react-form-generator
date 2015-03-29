var g = require( '../../src/tools/general' );

describe( "tools/general.js", function () {
    describe( "getOrDefault", function () {
        it( "should return existed value from nested object", function () {
            var root = { a: { b: { c: 100 } } };
            expect( g.getOrDefault( root, 'a.b.c' ) ).toEqual( 100 );
        });

        it( "should return default value if nested value does not exist", function () {
            var root = { a: { b: { c: 100 } } };
            expect( g.getOrDefault( root, 'a.b.d', 42 ) ).toEqual( 42 );
        });


        it( "should return existed value by index in nested array", function () {
            var root = { a: { b: { c: [10,20,30] } } };
            expect( g.getOrDefault( root, 'a.b.c.1' ) ).toEqual( 20 );
        });
    });
});
