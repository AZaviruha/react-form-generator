/** @jsx React.DOM */

var $            = require( 'jquery' )
  , _            = require( 'lodash' )
  , React        = require( 'react' )
  , log          = window.log = require( 'front-log' )
  , mixins       = require( '../../../src/mixins' )
  , FG           = require( '../../../src/components/compiled/generated-form' )
  , t            = FG.tools
  , getOrDefault = t.getOrDefault
  , getOrNull    = t.getOrNull
  , meta         = require( './meta.json' );


$(function () {
    /**
     * Custom components example: CheckGroup
     */
    var CheckGroup = React.createClass({
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
        handleOnChange: function ( e, item ) {
            var res = { 
                id:    this._conf().fieldID,
                meta:  this._meta(),
                value: {}
            };
            var oldValue = getOrDefault( this, 'props.config.value', [] );
            res.value[ res.id ] = _.contains(oldValue, item.id ) 
                ? _.without( oldValue, item.id ) : oldValue.concat([ item.id ]);

            this.handleEvent( 'change')( e );
            this._conf().onChange( res );
        },

        handleEvent: mixins.handleEvent,

        /* =========================================================== */
        /* ======================== Renders ========================== */
        /* =========================================================== */
        render: function () {
            var config = this._conf()
              , meta   = this._meta()
              , spec   = this._spec();
            
            if ( meta.isHidden ) return null;

            return (
                <div className="generated-checkgroup-field"
                     id={config.fieldID}>
                    {this.renderItems( spec.possibleValues )}
                </div>
            );
        },

        renderItems: function ( items ) {
            var self   = this
              , config = this._conf()
              , meta   = this._meta();

            return (items || []).map(function ( item, idx ) {
                var value      = getOrDefault( config, 'value', [] )
                  , isChecked  = _.contains( value, item.id )
                  , isReadOnly = meta.isReadOnly || meta.isDisabled
                  , key        = config.fieldID + '-' + idx;

                return (
                    <label key={key}>
                        <span className="generated-checkbox-label">{item.text}</span>
                        <input 
                            type="checkbox"
                            className="generated-checkbox-item"
                            name={item.name}
                            checked={isChecked}
                            readOnly={isReadOnly}
                            onChange={handler} />
                    </label>
                );
                
                function handler ( e ) {
                    return self.handleOnChange( e, item ); 
                }
            });
        }
    });


    var GeneratedForm = FG({
            primitives : { 'checkgroup' : CheckGroup }
        })
      , validateForm  = GeneratedForm.validateForm
      , isFormValid   = GeneratedForm.isFormValid;

    var App = React.createClass({
        getInitialState: function () {
            var value = t.evalDefaults( meta );
            value[ 'custom-comp-example' ] = [];

            var init = {
                value:   value,
                errors:  {},
                _errors: validateForm( meta, value )
            };

            log.debug( 'Init state :: ', init );
            return init;
        },

        handleFormChanged: function ( newValue, change, fldErrors ) {
            log.debug( 'handleFormChanged :: newValue :: ', newValue );
            log.debug( 'handleFormChanged :: change :: ', change );
            log.debug( 'handleFormChanged :: formErrors :: ', fldErrors );
            this.setState({ 
                value:   newValue,
                errors:  t.merge( this.state.errors, fldErrors ),
                _errors: t.merge( this.state._errors, fldErrors )
            });
        },
        

        handleFormEvent: function ( fieldID, eventName, eventInfo ) {
            log.debug( '=========================================' );
            log.debug( 'handleFormEvent :: fieldID :: ', fieldID );
            log.debug( 'handleFormEvent :: eventName :: ', eventName );
            // log.debug( 'handleFormEvent :: eventInfo :: ', eventInfo );

            this._route( eventInfo.path, eventInfo );
            log.debug( '=========================================' );
        },


        componentDidMount: function () {
            this._route = t.buildRouter(
                'btnSave:click',  [ sendForm ],
                'btnClear:click', [ clearForm ]
            );
        },


        render: function() {
            return (<GeneratedForm meta={meta}
                                   value={this.state.value}
                                   errors={this.state.errors}
                                   onChange={this.handleFormChanged}
                                   onEvent={this.handleFormEvent}/>);
        }
    });


    function sendForm () {
        this.setState({
            errors: validateForm( meta, this.state.value )
        }, function () {
            if ( !isFormValid( this.state.errors ) ) {
                alert( 'Form is not valid!' );
            }
        });
    }
    

    function clearForm () {
        this.setState({ 
            value:   t.evalDefaults( meta ),
            errors:  null,
            _errors: null
        });
    }


    React.render( <App />, document.body );
});


