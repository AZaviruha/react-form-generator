var mixins = require( './../../../mixins' );

module.exports = function ( React, tools ) {
    var getOrDefault = tools.getOrDefault;

    return React.createClass({
        displayName: 'TextRenderer',

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
            this.handleEvent( 'change' )( e );
            this._conf().onChange( res );
        },
        

        /* =========================================================== */
        /* ======================== Renders ========================== */
        /* =========================================================== */
        render: function () {
            var config = this.props.config
              , meta   = this._meta()
              , spec   = this._spec();

            return (
                React.createElement("input", {
                    id: config.fieldID, 
                    type: "text", 
                    className: "generated-text-field", 
                    name: spec.name, 
                    value: config.value, 
                    readOnly: meta.isReadOnly || meta.isDisabled, 
                    onChange: this.handleOnChange, 
                    onBlur: this.handleEvent( 'blur'), 
                    onKeyPress: this.handleEvent( 'keypress')})
            );
        }
    });
};
