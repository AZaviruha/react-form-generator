var t            = require( '../tools' )
  , getOrNull    = t.getOrNull
  , getOrDefault = t.getOrDefault;


module.exports = { 
    'empty': function ( conf, val ) {
        return t.isArray( val ) ? !val.length : !val;
    },

    'required': function ( conf, val ) {
        return t.isArray( val ) ? !!val.length : !!val;
    },
    
    'requiredKey': function ( conf, val ) {
    	var pathToValue = conf.value;
    	return !!getOrNull( val, pathToValue );
    },

    'regexp': function ( conf, val ) {
        return (new RegExp( conf.value )).test( val );
    },

    'maxLength': function ( conf, val ) {
        var maxLength = getOrDefault( conf, 'value', 0 )
          , valLength = getOrDefault( val, 'length', 0 );
        return valLength <= maxLength;
    },

    'minLength': function ( conf, val ) {
        var minLength = getOrDefault( conf, 'value', 0 )
          , valLength = getOrDefault( val, 'length', 0 );
        return valLength >= minLength;
    },

    'length': function ( conf, val ) {
        var length    = getOrDefault( conf, 'value', 0 )
          , valLength = getOrDefault( val, 'length', 0 );
        return valLength === length;
    },

    'numbers': function ( conf, value ) {
        return (new RegExp( '^\\d+$' )).test( value );
    }
};
