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
            var css     = this._css()
              , fldConf = this._field();
            
            return (
                React.createElement("div", {className: css.wrapper, key: this.props.key}, 
                    React.createElement("label", {className: css.label, 
                           htmlFor: fldConf.fieldID}, 
                      this._spec().label
                    ), 

                    React.createElement("div", {className: css.field}, this.props.children), 
                    React.createElement("div", {className: css.errors}, this.renderErrors())
                )
            );
        },


        renderErrors: function () {
            var css      = this._css()
              , fldConf  = this._field()
              , fldID    = fldConf.fieldID
              , errs     = getOrDefault( fldConf, 'errors', [] )
              , key      = 'validation-error-of-' + fldID + '-';
            
            return errs.map(function ( err, idx ) {
                return (
                    React.createElement("div", {key: key+idx, className: "validation-error"}, 
                      err.message
                    )
                );
            });
        }
    });
};
