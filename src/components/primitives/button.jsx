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

        /* =========================================================== */
        /* ======================== Handlers ========================= */
        /* =========================================================== */
        handleClick: function ( e ) {
            this.handleEvent( 'click', e );
        },

        handleEvent: function ( eventName, e ) {
            var fieldID = this._conf().fieldID;
            this._conf().onEvent( fieldID, eventName, e );
        },

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

            return (
                <button 
                    id={config.fieldID}
                    className={className}
                    disabled={meta.isDisabled}
                    onClick={this.handleClick}>{spec.text}</button>
            );
        }
    });
};
