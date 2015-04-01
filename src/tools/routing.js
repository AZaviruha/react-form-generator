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
