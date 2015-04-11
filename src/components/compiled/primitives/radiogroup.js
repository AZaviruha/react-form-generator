var mixins = require( './../../../mixins' );

module.exports = function ( React, tools ) {
    var getOrDefault = tools.getOrDefault
      , getOrNull    = tools.getOrNull;

    return React.createClass({
        displayName: 'RadiogroupRenderer',

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
        handleOnChange: function ( e, item ) {
            var res = { 
                id:    this._conf().fieldID,
                meta:  this._meta(),
                value: {}
            };

            res.value[ res.id ] = item.id;
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
            var config = this._conf()
              , spec   = this._spec();

            return (
                React.createElement("div", {className: "generated-radiogroup-field", 
                     id: config.fieldID}, 
                    this.renderItems( spec.possibleValues)
                )
            );
        },

        renderItems: function ( items ) {
            var self   = this
              , config = this._conf()
              , meta   = this._meta();

            return (items || []).map(function ( item, idx ) {
                var value      = getOrNull( config, 'value' )
                  , isChecked  = item.id === value
                  , isReadOnly = meta.isReadOnly || meta.isDisabled
                  , key        = config.fieldID + '-' + idx;

                return (
                    React.createElement("label", {key: key}, 
                        React.createElement("span", {className: "generated-radio-label"}, item.text), 
                        React.createElement("input", {
                            type: "radio", 
                            className: "generated-radio-item", 
                            name: item.name, 
                            checked: isChecked, 
                            readOnly: isReadOnly, 
                            onChange: handler, 
                            onBlur: self.handleEvent( 'blur'), 
                            onKeyPress: self.handleKeyPress})
                    )
                );
                
                function handler ( e ) {
                    return self.handleOnChange( e, item ); 
                }
            });
        }
    });
};
