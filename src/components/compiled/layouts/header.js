var mixins = require( './../../../mixins' );

module.exports = function ( React, tools ) {
    return React.createClass({
        mixins: [ mixins.LayoutAccessors ],

        getHeader: function ( size, text ) {
            return {
                1: (React.createElement("h1", null, text)),
                2: (React.createElement("h2", null, text)),
                3: (React.createElement("h3", null, text)),
                4: (React.createElement("h4", null, text)),
                5: (React.createElement("h5", null, text)),
                6: (React.createElement("h6", null, text))
            }[ size ];
        },

        /* =========================================================== */
        /* ======================== Renders ========================== */
        /* =========================================================== */

        render : function () {
            var css       = this._css()
              , fieldConf = this._field()
              , spec      = this._spec();

            return (
                React.createElement("div", {className: css.wrapper, key: this.props.key}, 
                    this.getHeader( spec.size, spec.text)
                )
            );
        }
    });
};

