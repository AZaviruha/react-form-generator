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
              , fldConf = this._field()
              , fldMeta = fldConf.meta;


            /**
             * Don't render layout for undefined 
             * or explicitly hidden field.
             */
            if ( !fldMeta || fldMeta.isHidden ) 
                return null;
            
            return (
                <div className={css.wrapper} key={this.props.key}>
                    <label className={css.label}
                           htmlFor={fldConf.fieldID}>
                      {this._spec().label}
                    </label>

                    <div className={css.field}>{this.props.children}</div>
                    <div className={css.errors}>{this.renderErrors()}</div>
                </div>
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
                    <div key={key+idx} className="validation-error">
                      {err.message}
                    </div>
                );
            });
        }
    });
};
