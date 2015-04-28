var cls    = require( 'classnames' )
  , mixins = require( './../../../mixins' );

module.exports = function ( React, tools ) {
    var getOrDefault = tools.getOrDefault;

    return React.createClass({
        displayName: 'ButtonRenderer',

        propTypes: {
            config: React.PropTypes.object.isRequired
        },

        mixins: [ mixins.PrimitiveAccessors ],

        /* =========================================================== */
        /* ======================== Lyfe Cycle ======================= */
        /* =========================================================== */
        getDefaultProps: function () {
            return { config: {} };
        },

        handleEvent: mixins.handleEvent,

        /* =========================================================== */
        /* ======================== Renders ========================== */
        /* =========================================================== */
        render: function () {
            var config      = this.props.config
              , meta        = this._meta()
              , spec        = this._spec()
              , isUnwrapped = ('string' === typeof config.css);

            var className = cls(
                'generated-button-field',
                isUnwrapped && config.css
            );

            if ( meta.isHidden ) return null;

            return (
                <button 
                    id={config.fieldID}
                    className={className}
                    disabled={meta.isDisabled}
                    onBlur={this.handleEvent( 'blur' )}
                    onFocus={this.handleEvent( 'focus' )}
                    onClick={this.handleEvent( 'click' )}>{spec.text}</button>
            );
        }
    });
};
