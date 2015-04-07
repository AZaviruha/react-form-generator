var mixins = require( './../../../mixins' );

module.exports = function ( React, tools ) {
    var getOrDefault = tools.getOrDefault
      , getOrNull    = tools.getOrNull;

    return React.createClass({
        displayName: 'SelectRenderer',

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
        
        handleEvent: function ( eventName, e ) {
            var fieldID = this._conf().fieldID;
            this._conf().onEvent( fieldID, eventName, e );
        },

        /* =========================================================== */
        /* ======================== Renders ========================== */
        /* =========================================================== */
        render: function () {
            var config = this._conf()
              , spec   = this._spec()
              , meta   = this._meta();

            return (
                <select id={config.fieldID} 
                        disabled={meta.isDisabled} 
                        className="generated-select-field" 
                        value={config.value} 
                        onChange={this.handleOnChange}>
                    {this.renderItems( spec.possibleValues )}
                </select>
            );
        },

        renderItems: function ( items ) {
            var self   = this
              , config = this._conf()
              , meta   = this._meta();

            return (items || []).map(function ( item, idx ) {
                var key = config.fieldID + '-' + idx;
                return (
                    <option 
                        key={key}
                        className="generated-select-item"
                        value={item.id}
                        >{item.text}</option>
                );
            });
        }
    });
};
