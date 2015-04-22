var tools          = require( './../tools' )
  , getOrNull      = tools.getOrNull
  , getOrDefault   = tools.getOrDefault;

var PrimitiveAccessors = {
    componentWillMount: function() {
        /**
         * Returns `config` property
         * which stores all primitive's settings.
         */
        this._conf = function () {
            return getOrDefault( this, 'props.config', {} );
        };

        this._meta = function () {
            return getOrDefault( this._conf(), 'meta', {} );
        };

        this._spec = function () {
            return getOrDefault( this._meta(), 'rendererSpecific', {} );
        };
    }
};


function handleEvent ( eventName ) {
    var self = this;
    return function ( e ) {
        var fieldID   = self._conf().fieldID;
        var eventInfo = {
            path          : [ fieldID, eventName ].join( ':' ),
            originalEvent : e
        };
        self._conf().onEvent( fieldID, eventName, eventInfo );
    };
};


module.exports = {
    PrimitiveAccessors: PrimitiveAccessors,
    handleEvent:    handleEvent
};
