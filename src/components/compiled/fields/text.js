/** @jsx React.DOM */

module.exports = function ( React, tools ) {
    var getOrDefault = tools.getOrDefault
      , Addons       = React.addons;

    return React.createClass({
        propTypes: {
            config: React.PropTypes.object.isRequired
        },

        mixins: [ Addons.PureRenderMixin ],

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
                meta:   this._meta(),
                value:  {}
            };

            res.value[ this._meta().id ] = e.target.value;
            this._conf().onChange( res );
        },

        /* =========================================================== */
        /* ======================== Helpers ========================== */
        /* =========================================================== */
        _conf: function () {
            return getOrDefault( this, 'props.config', {} );
        },

        _css: function () {
            return {
                wrapper: getOrDefault( this._conf(), 
                                       'css.field-wrapper', '' ),
                inner:   getOrDefault( this._conf(), 
                                       'css.field-inner', '' )
            };
        },

        _meta: function () {
            return getOrDefault( this._conf(), 'meta', {} );
        },

        _spec: function () {
            return getOrDefault( this._meta(), 'rendererSpecific', {} );
        },

        /* =========================================================== */
        /* ======================== Renders ========================== */
        /* =========================================================== */
        render: function () {
            var config   = this.props.config
              , spec     = this._spec()
              , css      = this._css();

            return (
                React.createElement("div", {className: css.wrapper}, 
                    React.createElement("input", {type: "text", 
                           className: css.inner, 
                           name: spec.name, 
                           value: config.value, 
                           readOnly: spec.isReadOnly, 
                           onChange: this.handleOnChange})
                )
            );
        }
    });
};
