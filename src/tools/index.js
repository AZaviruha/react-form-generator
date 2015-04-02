var g = require( './general' )
  , s = require( './serializers' )
  , r = require( './routing' );




module.exports = {
    isDefined:     g.isDefined,
    isArray:       g.isArray,
    getOrDefault:  g.getOrDefault,
    getOrNull:     g.getOrNull,
    arrayToObject: g.arrayToObject,
    reduce:        g.reduce,
    merge:         g.merge,

    evalDefaults:  s.evalDefaults,

    buildRouter:   r.buildRouter
};
