/** @jsx React.DOM */

var $     = require( 'jquery' )
  , React = require( 'react' )
  , log   = window.log = require( 'front-log' )
  , FG    = require( '../../../src/components/compiled/generated-form' )
  , t     = FG.tools
  , meta  = require( './meta.json' );


$(function () {
    var GeneratedForm = FG({})
      , validateForm  = GeneratedForm.validateForm
      , isFormValid   = GeneratedForm.isFormValid;

    var App = React.createClass({
        getInitialState: function () {
            var value = t.evalDefaults( meta );

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


