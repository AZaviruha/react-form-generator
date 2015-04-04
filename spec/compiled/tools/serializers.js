(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
    "fields": {
        "field1": {
            "renderer": "text",
            "defaultValue": "test read-only value",
            "isDisabled": true
        },
        "field2": {
            "renderer": "checkbox",
            "isDisabled": false,
            "defaultValue": 1,
            "rendererSpecific": {
                "truthMap": {
                    "true":  1,
                    "false": 0
                }
            }
        }, 
        "field3": {
            "renderer": "radiogroup",
            "isDisabled": false,
            "defaultValue": "second",
            "rendererSpecific": {
                "possibleValues": [
                    { "id": "first", "text": "First option", "name": "fst" },
                    { "id": "second", "text": "Second option", "name": "snd" }
                ]
            }
        },
        "field4": {
            "renderer": "select",
            "isDisabled": false,
            "defaultValue": "third",
            "rendererSpecific": {
                "possibleValues": [
                    { "id": "first", "text": "First option" },
                    { "id": "second", "text": "Second option" },
                    { "id": "third", "text": "Third option" }
                ]
            }
        }
    }
}

},{}],2:[function(require,module,exports){
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


},{"../../src/tools/serializers":4,"../mocks/evalDefaults.meta.json":1}],3:[function(require,module,exports){

/**
 * Checks that `x` is not `null` or `undefined`.
 * @param {Object} x - object to test.
 * @return {Boolean}
 */
function isDefined ( x ) {
    return ( x !== null ) && ( x !== undefined );
}


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
}


function getOrNull ( source, path ) {
    return getOrDefault( source, path, null );
}



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
function argsToArray ( args ) { return slice.apply( args ); }


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

},{}],4:[function(require,module,exports){
var g = require( './general' );

/**
 * Calculates form's (default) value by it's meta.
 * @param {Object} formMeta - metadata in FormGenerator format.
 * @return {Object} - {
 *    %fieldID%: %fieldValue%,
 *    ...
 * }
 */
function evalDefaults ( formMeta ) {
    var fields = g.getOrDefault( formMeta, 'fields', {} );
    
    return g.reduce(function ( acc, fldMeta, fldID ) {
        acc[ fldID ] = g.getOrNull( fldMeta, 'defaultValue' );
        return acc;
    }, {}, fields );
}



module.exports = {
    evalDefaults: evalDefaults
};

},{"./general":3}]},{},[2])