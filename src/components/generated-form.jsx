/** @jsx React.DOM */

var React           = require( 'react' )
  , R               = React;

var t              = require( '../../tools' )
  , merge          = t.merge
  , getOrNull      = t.getOrNull
  , getOrDefault   = t.getOrDefault;


/**
 * Provides GeneratedForm component.
 * Can be configured by `conf` arguments:
 * @param {Object} conf - settings for component builder.
 * @param {Object[]} conf.validators - array of custom validators.
 * @param {Object[]} conf.mixins - array of React's mixins.
 * @param {Object[]} conf.primitiveRenderers - array of custom primitive's renderers.
 * @param {Object[]} conf.layoutRenderers - array of custom layout's renderers.
 * @return {ReactElement}
 */
function formGenerator ( conf ) { 
    conf = conf || {};

    var v        = require( '../../validation' )( conf.validators )
      , validate = v.validateField;
    
    var MIXINS = [].concat( conf.mixins || [] );

    var RENDERERS = merge({
        text:       require( './primitives/text' )( R, t ),
        textarea:   require( './primitives/textarea' )( R, t ),
        checkbox:   require( './primitives/checkbox' )( R, t ),
        radiogroup: require( './primitives/radiogroup' )( R, t ),
        select:     require( './primitives/select' )( R, t ),
        button:     require( './primitives/button' )( R, t )
    }, getOrDefault( conf, 'mixins.fieldRenderers', {} ));
    

    var LAYOUTS = merge({
        default:    require( './layouts/simpleFormField' )( R, t ),
        unwrapped:  require( './layouts/unwrapped' )( R, t ),
        label:      require( './layouts/label' )( R, t ),
        header:     require( './layouts/header' )( R, t )
    }, getOrDefault( conf, 'mixins.layoutRenderers', {} ));


    /**
    * # GeneratedForm component.
    * Builds form by metadata.
    *
    * ## Metadata format:
    *
    * ```js
    * var meta = {
    *     key: "unique key for React",
    *     settings: {
    *         isReadOnly: true
    *     },
    *     fields: []
    * };
    * ```
    *
    * ## Data format:
    * ```js
    * var value = {
    *     testField: "test",
    *     testField2: ...
    * };
    * ```
    *
    * ## Usage
    * ```
    * var conf = {};
    * var GeneratedForm = require( 'react-form-generator' )( conf );
    * 
    * var MyForm = React.createClass({
    *     render: function () {
    *         return (
    *             <GeneratedForm meta={meta}
    *                            value={value}
    *                            onChange={this.handleChange}
    *             />
    *         );
    *     }
    * });
    * ```
    */
    var GeneratedForm = /*RENDERERS['group'] =*/ React.createClass({
        propTypes: {

        /**
         * ## Properties: 
         */
            meta:              React.PropTypes.object.isRequired,
            value:             React.PropTypes.object,

            /**
             * ### errors
             * ```js
             * {
             *     %fieldID%: [
             *         { 
             *             rule:    %rule%,
             *             value:   %value%,
             *             message: %message%,
             *         }
             *     ]
             * }
             * ```
             */
            errors:            React.PropTypes.object,


        /**
         * ## Methods: 
         */

            /**
             * ### onChange 
             * Fires after user input into any field of generated form.
             * Callback will get the next data:
             * @param {Object} formValue  - forms's new value.
             * @param {Object} change     - value of the changed field.
             * @param {Object} formErrors - forms's validation errors.
             * ```js
             * {
             *     %fieldID%: %fieldNewValue%
             * }
             * ```
             */
            onChange:          React.PropTypes.func
        },

        mixins: MIXINS,

        /* =========================================================== */
        /* =================== Component Life Cycle ================== */
        /* =========================================================== */
        getDefaultProps: function () {
            return {
                key:          'generated-form-' + Date.now(),
                onChange:     function () {},
                onEvent:      function () {}
            };
        },
        
        
        /* =========================================================== */
        /* ========================= Helpers ========================= */
        /* =========================================================== */

        getFieldValue: function ( fieldID ) {
            return  getOrNull( this.props.value, fieldID );
        },

        getFieldErrors: function ( fieldID ) {
            var errors = getOrDefault( this, 'props.errors', {} );
            return getOrNull( errors, fieldID );
        },
        

        /* =========================================================== */
        /* ======================== Handlers ========================= */
        /* =========================================================== */
        
        handleFieldChanged: function ( fieldData ) {
            var fieldID    = fieldData.id
              , fieldMeta  = fieldData.meta
              , formValue  = this.props.value
              , fieldValue = getOrNull( fieldData.value, fieldID )
              , fieldErrs  = validate( fieldID, fieldMeta, fieldValue );

            this.props.onChange( merge( formValue, fieldData.value ),
                                 fieldData.value, 
                                 fieldErrs );
        },
        
        handleFieldEvent: function ( fieldID, eventName, eventInfo ) {
            this.props.onEvent( fieldID, eventName, eventInfo );
        },

        /* =========================================================== */
        /* ======================== Renderers ======================== */
        /* =========================================================== */

        render: function () {
            var meta   = getOrDefault( this, 'props.meta', {} )
              , fields = meta.fields;

            if ( !t.isDefined( fields ) ) 
                return null;
            else 
                return this.renderLayout( meta.layout.grid );
        },
        
        renderLayout: function ( grid, key ) {
            return (
                <div className={grid.css} key={key}>
                    {this.renderLayoutRows( grid.rows || [] )}
                </div>
            );
        },

        renderLayoutRows: function ( rows ) {
            var self = this;

            return rows.map(function ( row, idx ) {
                return (
                    <div key={'generated-layout-row'+idx} 
                         className={row.css}>
                        {self.renderLayoutCells( row )}
                    </div>
                );
            });
        },

        renderLayoutCells: function ( row ) {
            var self  = this
              , cells = getOrDefault( row, 'cells', [] );
            
            return cells.map(function ( cell, idx ) {
                return (
                    <div key={'generated-layout-cell'+idx} 
                         className={cell.css}>
                        {self.renderCellContent( cell )}
                    </div>
                );
            });
        },

        renderCellContent: function ( cell ) {
            var self     = this
              , meta     = this.props.meta || {}
              , contents = getOrDefault( cell, 'content', [] )
              , Layout;
            
            return contents.map(function ( cnt, idx ) {
                var cntSpec   = getOrDefault( cnt, 'rendererSpecific' )
                  , fldID     = cntSpec.fieldID
                  , fldMeta   = getOrNull( meta.fields, fldID );

                var config = {
                    fieldID:   fldID,
                    meta:      fldMeta,
                    css:       cntSpec.css,
                    value:     self.getFieldValue( fldID ),
                    errors:    self.getFieldErrors( fldID ),
                    onChange:  self.handleFieldChanged,
                    onEvent:   self.handleFieldEvent
                };
                
                var renderer = getOrNull(cnt, 'renderer')
                  , key      = 'generated-field-' + idx;

                if ( 'field' === renderer ) 
                    return (
                        <GeneratedField key={key} config={config} />
                    );
                else if ( 'grid' === renderer ) {
                    return self.renderLayout( cnt.rendererSpecific, 
                                              key );
                }
                else { 
                    Layout = LAYOUTS[ cnt.renderer || 'default' ];
                    return Layout 
                        ? <Layout key={key} meta={cnt} field={config}>
                              {fldID 
                                   ? (<GeneratedField config={config}/>)
                                   : null}
                          </Layout>
                        : null;
                }
            });
        }
    });
    

    var GeneratedField = React.createClass({
        mixins: [],

        render: function () {
            var props       = this.props
              , rendererId  = getOrNull( props, 'config.meta.renderer' )
              , Renderer    = getOrNull( RENDERERS, rendererId );

            return Renderer 
                ? (<Renderer config={props.config} />)
                : null;
        }
    });
    
    
    GeneratedForm.validateForm = v.validateForm;
    GeneratedForm.isFormValid  = v.isFormValid;
    return GeneratedForm;
}

formGenerator.tools = t;

module.exports = formGenerator;
