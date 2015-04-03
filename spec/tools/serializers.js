var s    = require( '../../src/tools/serializers' )
  , meta = require( '../mocks/evalDefaults.meta.json' );

describe( 'tools/serializers.js', function () {
    describe( 'evalDefaults', function () {
        it( 'should build value in GeneratedForm format from meta', function () {
            var res = {
                field1: 'test read-only value',
                field2: 1,
                field3: 'second',
                field4: 'third'
            };
            expect( s.evalDefaults( meta ) ).toEqual( res );
        });


        it( 'should return empty object if metadata are not defined', function () {
            expect( s.evalDefaults( null ) ).toEqual( {} );
            expect( s.evalDefaults( undefined ) ).toEqual( {} );
        });
    });
});

