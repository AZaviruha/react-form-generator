var tools          = require( './../tools' )
  , getOrNull      = tools.getOrNull
  , getOrDefault   = tools.getOrDefault;

var LayoutAccessors = {
    componentWillMount: function() {
        this._meta = function () {
            return getOrDefault( this, 'props.meta', {} );
        };

        this._spec = function () {
            return getOrDefault( this._meta(), 'rendererSpecific', {} );
        };

        this._css = function () {
            var css = { wrapper: '', inner: '' };
            return getOrDefault( this._spec(), 'css', css );
        };

        this._field = function () {
            return getOrDefault( this, 'props.field', {} );
        };
    }
};


module.exports = {
    LayoutAccessors: LayoutAccessors
};
