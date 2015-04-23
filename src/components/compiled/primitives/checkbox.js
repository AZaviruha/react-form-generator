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
              , checked  = e.target.checked ? 'true' : 'false'
              , value    = truthMap ? truthMap[ checked ] : checked;

            var res = { 
                id:    this._conf().fieldID,
                meta:  this._meta(),
                value: {}
            };

            res.value[ res.id ] = value;
            this.handleEvent( 'change' )( e );
            this._conf().onChange( res );
        },
        
        handleEvent: mixins.handleEvent,

        /* =========================================================== */
        /* ======================== Renders ========================== */
        /* =========================================================== */
        render: function () {
            var config   = this._conf()
              , meta     = this._meta()
              , spec     = this._spec()
              , value    = config.value
              , truthMap = getOrNull( spec, 'truthMap' )
              , checked  = truthMap 
                    ? truthMap[ "true" ] === value
                    : value;
            
            if ( meta.isHidden ) return null;

            return (
                React.createElement("input", {
                    id: config.fieldID, 
                    type: "checkbox", 
                    className: "generated-checkbox-field", 
                    name: spec.name, 
                    checked: checked, 
                    readOnly: meta.isReadOnly || meta.isDisabled, 
                    onChange: this.handleOnChange, 
                    onBlur: this.handleEvent( 'blur'), 
                    onFocus: this.handleEvent( 'focus'), 
                    onKeyPress: this.handleEvent( 'keypress')})
            );
        }
    });
};
