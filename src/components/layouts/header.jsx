var mixins = require( './../../../mixins' );

module.exports = function ( React, tools ) {
    return React.createClass({
        mixins: [ mixins.LayoutAccessors ],

        getHeader: function ( size, text ) {
            return {
                1: (<h1>{text}</h1>),
                2: (<h2>{text}</h2>),
                3: (<h3>{text}</h3>),
                4: (<h4>{text}</h4>),
                5: (<h5>{text}</h5>),
                6: (<h6>{text}</h6>)
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
                <div className={css.wrapper} key={this.props.key}>
                    {this.getHeader( spec.size, spec.text )}
                </div>
            );
        }
    });
};

