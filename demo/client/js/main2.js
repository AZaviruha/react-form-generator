var $     = require( 'jquery' )
  , React = require( 'react' )
  , log   = window.log = require( 'front-log' )
  , FG    = window.FormGenerator
  , t     = FG.tools
  , meta  = require( './meta.json' );

log.debug( 'meta :: ', meta );


$(function () {
    var GeneratedForm = FG({})
      , validateForm  = GeneratedForm.validateForm;

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
            log.debug( 'handleFormEvent :: fieldID :: ', fieldID );
            log.debug( 'handleFormEvent :: eventName :: ', eventName );
            log.debug( 'handleFormEvent :: eventInfo :: ', eventInfo );
        },


        render: function() {
            return (<GeneratedForm meta={meta}
                                   value={this.state.value}
                                   errors={this.state.errors}
                                   onChange={this.handleFormChanged}
                                   onEvent={this.handleFormEvent}/>);
        }
    });

    React.render( <App />, document.body );
});


