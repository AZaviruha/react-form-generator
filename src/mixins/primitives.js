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
        
        
        /**
         * Default event handler.
         */
        this.handleEvent = function ( eventName ) {
            var self = this;
            return function ( e ) {
                var fieldID = self._conf().fieldID;
                self._conf().onEvent( fieldID, eventName, e );
            };
        };
    }
};


module.exports = {
    PrimitiveAccessors: PrimitiveAccessors
};
