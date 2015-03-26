var mixins = require( './../../../mixins' );

module.exports = function ( React, tools ) {
    var getOrDefault = tools.getOrDefault
      , getOrNull    = tools.getOrNull;

    return React.createClass({
        displayName: 'CheckboxRenderer',

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
            var truthMap = getOrNull( this._spec(), 'truthMap' )
              , checked  = e.target.checked
              , value    = truthMap ? truthMap[ checked ] : checked;

            var res = { 
                id:    this._conf().fieldID,
                meta:  this._meta(),
                value: {}
            };

            res.value[ res.id ] = value;
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
            var config   = this._conf()
              , meta     = this._meta()
              , spec     = this._spec()
              , truthMap = getOrNull( spec, 'truthMap' )
              , checked  = truthMap[ true ] === config.value;

            return (
                React.createElement("input", {
                    id: config.fieldID, 
                    type: "checkbox", 
                    className: "generated-checkbox-field", 
                    name: spec.name, 
                    checked: checked, 
                    readOnly: meta.isReadOnly, 
                    onChange: this.handleOnChange, 
                    onKeyPress: this.handleKeyPress})
            );
        }
    });
};
