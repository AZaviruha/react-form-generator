var mixins = require( './../../../mixins' );

module.exports = function ( React, tools ) {
    var getOrNull      = tools.getOrNull
      , getOrDefault   = tools.getOrDefault;

    return React.createClass({
        mixins: [ mixins.LayoutAccessors ],

        /* =========================================================== */
        /* ======================== Renders ========================== */
        /* =========================================================== */

        render : function () {
            var css       = this._css()
              , fieldConf = this._field();

            return (
                React.createElement("div", {className: css.wrapper, key: this.props.key}, 
                    React.createElement("label", null, this._spec().text)
                )
            );
        }
    });
};
