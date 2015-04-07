var mixins = require( './../../../mixins' );

module.exports = function ( React, tools ) {
    var getOrDefault = tools.getOrDefault;

    return React.createClass({
        displayName: 'TextareaRenderer',

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
        handleOnChange: function ( e ) {
            var res = { 
                id:    this._conf().fieldID,
                meta:  this._meta(),
                value: {}
            };

            res.value[ res.id ] = e.target.value;
            this.handleEvent( 'change', e );
            this._conf().onChange( res );
        },

        handleKeyPress: function ( e ) {
            this.handleEvent( 'keypress', e );
        },

        handleEvent: function ( eventName, e ) {
            var fieldID = this._conf().fieldID;
            this._conf().onEvent( fieldID, eventName, e );
        },

        /* =========================================================== */
        /* ======================== Renders ========================== */
        /* =========================================================== */
        render: function () {
            var config = this.props.config
              , meta   = this._meta()
              , spec   = this._spec();

            return (
                <textarea 
                    id={config.fieldID}
                    className="generated-textarea-field"
                    name={spec.name}
                    cols={spec.cols}
                    rows={spec.rows}
                    value={config.value}
                    readOnly={meta.isReadOnly || meta.isDisabled}
                    onChange={this.handleOnChange}
                    onKeyPress={this.handleKeyPress}/>
            );
        }
    });
};
