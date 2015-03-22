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
            return this.props.children;
        }
    });
};
