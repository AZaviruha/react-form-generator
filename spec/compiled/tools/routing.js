(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var r = require( '../../src/tools/routing' );

describe( 'tools/routing.js', function () {
    describe( 'buildRouter', function () {
        it( 'should throw exception, if called without arguments', function () {
            var f = function () { r.buildRouter(); };
            expect( f ).toThrow();
        });

        it( 'should throw exception, if called with odd number of arguments', function () {
            var f = function () { r.buildRouter( 1, 2, 3 ); };
            expect( f ).toThrow();
        });

        it( 'should return function', function () {
            expect( r.buildRouter( 1, 2 ) ).not.toThrow();
        });
        

        it( 'should call handlers for simple string route', function () {
            var handlers = {
                f1: function () {},
                f2: function () {},
                f3: function () {}
            };

            spyOn( handlers, 'f1');
            spyOn( handlers, 'f2');
            spyOn( handlers, 'f3');

            var route = r.buildRouter(
                'a',     [ handlers.f1 ],
                'a.b',   [ handlers.f2 ],
                'a.b.c', [ handlers.f3 ]
            );
            
            route( 'a' );
            expect( handlers.f1 ).toHaveBeenCalled();

            route( 'a.b' );
            expect( handlers.f2 ).toHaveBeenCalled();

            route( 'a.b.c' );
            expect( handlers.f3 ).toHaveBeenCalled();
        });
        

        it( 'should call handlers for regexp route', function () {
            var handlers = {
                f1: function () {},
                f2: function () {}
            };

            spyOn( handlers, 'f1');
            spyOn( handlers, 'f2');

            var route = r.buildRouter(
                /^field-(\d)+$/,              [ handlers.f1 ],
                /^group-(\d)+\|field-(\d)+$/, [ handlers.f2 ]
            );
            
            route( 'field-1' );
            expect( handlers.f1 ).toHaveBeenCalled();
            route( 'field-6' );
            expect( handlers.f1 ).toHaveBeenCalled();

            route( 'group-1|field-1' );
            expect( handlers.f2 ).toHaveBeenCalled();
        });
        

        it( 'should call handlers with specified arguments', function () {
            var handlers = {
                f1: function () {},
                f2: function () {}
            };

            spyOn( handlers, 'f1' );
            spyOn( handlers, 'f2' );

            var route = r.buildRouter(
                'a.b.c',                      [ handlers.f1 ],
                /^group-(\d)+\|field-(\d)+$/, [ handlers.f2 ]
            );
            
            route( 'a.b.c', 1, 2, 3 );
            expect( handlers.f1 ).toHaveBeenCalledWith( 1, 2, 3 );

            route( 'group-1|field-1', 3, 2, 1 );
            expect( handlers.f2 ).toHaveBeenCalledWith( 3, 2, 1 );
        });
        

        it( 'should call all handlers of matched route', function () {
            var handlers = {
                f1: function () {},
                f2: function () {},
                f3: function () {},
                f4: function () {}
            };

            spyOn( handlers, 'f1' );
            spyOn( handlers, 'f2' );
            spyOn( handlers, 'f3' );
            spyOn( handlers, 'f4' );

            var route = r.buildRouter(
                'a.b.c',                      [ handlers.f1, handlers.f2 ],
                /^group-(\d)+\|field-(\d)+$/, [ handlers.f3, handlers.f4 ]
            );
            
            route( 'a.b.c', 1, 2, 3 );
            expect( handlers.f1 ).toHaveBeenCalledWith( 1, 2, 3 );
            expect( handlers.f2 ).toHaveBeenCalledWith( 1, 2, 3 );

            route( 'group-1|field-1', 3, 2, 1 );
            expect( handlers.f3 ).toHaveBeenCalledWith( 3, 2, 1 );
            expect( handlers.f4 ).toHaveBeenCalledWith( 3, 2, 1 );
        });
    });
});

},{"../../src/tools/routing":3}],2:[function(require,module,exports){

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

},{}],3:[function(require,module,exports){
var g = require( './general' );

/**
 * Builds a routing function, that matches
 * event's name to the list of handlers
 * and executes all of them.
 *
 * @param {string|RegExp} event1 - event's mask.
 * @param [Function] handlers1   - handlers for event1.
 * @param {string|RegExp} event2 - event's mask.
 * @param [Function] handlers2   - handlers for event2.
 * ...
 * @returns {Function}
 */
function buildRouter () {
    var args       = g.argsToArray( arguments )
      , simpleConf = {}
      , regexpConf = []
      , reLength
      , i, len, route, handlers;
    
    if ( (args.length === 0) || (args.length % 2 !== 0) )
        throw new Error( 'Wrong number of arguments!' );
        
    for ( i = 0, len = args.length; i < len; i+=2 ) {
        route    = args[ i ];
        handlers = args[ i + 1 ];
        
        if ( route instanceof RegExp ) 
            regexpConf.push([ route, handlers ]);
        else
            simpleConf[ route ] = handlers;
    }

    reLength = regexpConf.length;

    /**
     * Search path in `simpleConf` and `regexpConf`
     * and runs all handlers of mathed path.
     * @param {String} path  - path to route.
     */
    return function route ( path ) {
        var values = g.argsToArray( arguments ).slice( 1 )
          , checkedPath, handlers
          , i, len;
        
        /** Checks simple routes first. */
        handlers = simpleConf[ path ];

        /** Checks regexp routes last. */
        if ( !g.getOrNull( handlers, 'length' ) ) 
            for ( i = 0; i < reLength; i++ ) {
                checkedPath = regexpConf[ i ][ 0 ];
                if ( checkedPath.test(path) ) {
                    handlers = regexpConf[ i ][ 1 ];
                    break;
                }
            }
        
        /** Run each handler of matched route. */
        if ( handlers && handlers.length ) 
            for ( i = 0, len = handlers.length; i < len; i++ ) {
                handlers[ i ].apply( this, values );
            }
    };
}


module.exports = {
    buildRouter: buildRouter
};

},{"./general":2}]},{},[1])