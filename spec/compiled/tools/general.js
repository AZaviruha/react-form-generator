(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../../src/tools/general":2}],2:[function(require,module,exports){

/**
 * Checks that `x` is not `null` or `undefined`.
 * @param {Object} x - object to test.
 * @return {Boolean}
 */
function isDefined ( x ) {
    return ( x !== null ) && ( x !== undefined );
};


/**
 * Checks that `x` is array
 * @param {Object} x - object to test.
 * @return {Boolean}
 */
function isArray ( x ) {
    return '[object Array]' === Object.prototype.toString.call( x );
}

function isString ( x ) {
    return 'string' === typeof x;
}

/**
 * Returns path's value or null if path's chain has undefined member.
 * @param {Object} source - root object.
 * @param {string} path - path to `source` value.
 * @return {Object}
 */
function getOrDefault ( source, path, defaultVal ) {
    var isAlreadySplitted = isArray( path );

    if ( !isDefined(source) ) return defaultVal;
    if ( !isString(path) && !isAlreadySplitted ) return defaultVal;

    var tokens = isAlreadySplitted ? path : path.split( '.' )
      , idx, key;

    for ( idx in tokens ) {
        key = tokens[ idx ];

        if ( isDefined( source[key] ) ) 
            source = source[ key ];
        else 
            return defaultVal;
    }

    return source;
};


function getOrNull ( source, path ) {
    return getOrDefault( source, path, null );
};



/**
 * Converts array to object, using `keyPath` 
 * for building unique keys.
 * @param {(String|Array)} keyPath - path to `key` value 
 *                                   in the array element.
 * @param {Object[]} - array to convert.
 * @return {Object}
 */
function arrayToObject ( keyPath, arr ) {
    var res = {}, key, element;

    for ( var i = 0, len = arr.length; i < len; i++ ) {
        element = arr[ i ];
        key     = getOrNull( element, keyPath );
        if ( key ) res[ key ] = element;
    }
    
    return res;
}


function reduceArray ( f, acc, arr ) {
    arr.forEach(function ( el, idx ) { 
        acc = f( acc, el, idx ); 
    });
    return acc;
}


function reduceObject ( f, acc, obj ) {
    var key, val;
    for ( key in obj ) { 
        if ( obj.hasOwnProperty( key ) ) {
            val = obj[ key ];
            acc = f( acc, val, key ); 
        }
    };
    return acc;
}


function reduce ( f, acc, iterable ) {
    if ( !isDefined( iterable ) ) return acc;

    return isArray( iterable ) 
        ? reduceArray( f, acc, iterable ) 
        : reduceObject( f, acc, iterable );
}


var slice = Array.prototype.slice;
function argsToArray ( args ) { return slice.apply( args ); };


/**
 * Merges two or more objects.
 * (Creates only shallow copy of objects);
 */ 
function merge ( obj1, obj2 ) {
    var args = argsToArray( arguments ), res;
    if ( 0 === args.length ) return {};
    if ( 1 === args.length ) return obj1;
    if ( 2 === args.length ) return mergeTwo( obj1, obj2 );

    // More then two objects
    res  = mergeTwo( obj1, obj2 );
    args = args.slice( 2 );

    while ( args.length ) {
        res = mergeTwo( res, args[ 0 ] );
        args = args.slice( 1 );
    }

    return res;

    function mergeTwo ( obj1, obj2 ) {
        if ( !isDefined( obj1 ) ) return obj2;
        if ( !isDefined( obj2 ) ) return obj1;

        for (var key in obj2) {
            obj1[ key ] = obj2[ key ];
        }

        return obj1;
    }
}

module.exports = {
    isDefined:     isDefined,
    isArray:       isArray,
    isString:      isString,
    getOrDefault:  getOrDefault,
    getOrNull:     getOrNull,
    arrayToObject: arrayToObject,
    reduce:        reduce,
    merge:         merge,
    argsToArray:   argsToArray
};

},{}]},{},[1])