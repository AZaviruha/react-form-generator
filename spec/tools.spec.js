(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

        it( "should return existed value by index in nested array", function () {
            var root = { a: { b: { c: [10,20,30] } } };
            expect( g.getOrDefault( root, 'a.b.c.1' ) ).toEqual( 40 );
        });
    });
});

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
        if ( undefined === obj1 ) return obj2;
        if ( undefined === obj2 ) return obj1;

        for (var key in obj2) {
            obj1[ key ] = obj2[ key ];
        }

        return obj1;
    }
}

module.exports = {
    isDefined:     isDefined,
    isArray:       isArray,
    getOrDefault:  getOrDefault,
    getOrNull:     getOrNull,
    arrayToObject: arrayToObject,
    reduce:        reduce,
    merge:         merge
};

},{}]},{},[1])