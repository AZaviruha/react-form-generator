<h2>Complex events routing</h2>

We alredy [looked][simple-events-routing] how to do some basic event
routing. While that aproach works, it requires some boilerplates which
we perfer to avoid. So in this tutorial we will look at the routing
tools, that our `react-form-generator` provides.

We will use the same form's metadata, as in previous tutorial about routing:
```javascript
    ...
    
    "fields": {
        "field1": {
            "renderer": "text",
            "validators": [
                {
                    "rule": "required",
                    "message": "Field is required"
                },
                {
                    "rule": "maxLength",
                    "value": 15,
                    "message": "Maximum length of field is 15 characters"
                }
            ]
        },
        "field2": {
            "renderer": "text",
            "defaultValue": "1",
            "validators": [
                {
                    "rule": "required",
                    "message": "Field is required"
                },
                {
                    "rule": "numbers",
                    "value": 5,
                    "message": "Only numbers allowed"
                }
            ]
        }, 
        "btnSend": {
            "renderer": "button",
            "rendererSpecific": {
                "text": "Send"
            }
        }
    }
```

All routing tools are located in the `tools/routing` module and can be
accessed from `FormGenerator.tools`.

```javascript
var FG            = window.FormGenerator
  , t             = window.FormGenerator.tools
  , GeneratedForm = FG({})
  , validateForm  = GeneratedForm.validateForm;

var App = React.createClass({
    // ======================== Life cycle ======================= //
    getInitialState: function () {
        return {
            value:  t.evalDefaults( meta ), 
            errors: {} 
        };
    },

    componentDidMount: function () {
        this._route = t.buildRouter(
            'btnSend:click', [ btnClickHandler ]
        );
    },

    // ======================== Handlers ========================= //
    handleFormChanged: function ( newValue, change, fldErrors ) {
        this.setState({ 
            value:   newValue,
            errors:  t.merge( this.state.errors, fldErrors ), 
        });
    },

    handleFormEvent: function ( fieldID, eventName, eventInfo ) {
        this._route( fieldID + ':' + eventName );
    },
    
    // ======================== Renders ========================== //
    render: function() {
        return (<GeneratedForm meta={meta}
                               value={this.state.value}
                               errors={this.state.errors}
                               onChange={this.handleFormChanged}/>);
    }
});


function btnClickHandler () {
    this.setState({
        errors: validateForm( meta, this.state.value )
    });
}
```

There are a few steps to setup our "embeded" routing. First, we must
provide full set of event-to-handlers mapping. To do it, just call
function `buildRouter`. This function accepts variadic number of
arguments, where each odd argument is event mask, and each even
argument is list of handlers for this event.

We use variadic function instead of function-with-one-big-object-argument, because of this:
```
this._route = t.buildRouter(
    'btnSend:click', [ btnClickHandler ],
    /btn.+:click/,   [ myLoggingFunction ]
);
```

Yes, you can use regular expression as event mask, not just hardcoded
string names. This is very useful feature, and we will use it in
dynamic form example (in progress).

`buildRouter` function builds repository of events' handlers and
returns closure, that accepts event name.

When you call this closure, it executes each handler from list of
handlers of specified event. Each handler will be called with
closure's `this` context.


Here is interactive JSFiddle example for complex events routing.

<iframe width="100%" 
        height="300" 
        src="//jsfiddle.net/azaviruha/69z2wepo/5664/embedded/" 
        allowfullscreen="allowfullscreen" 
        frameborder="0">
</iframe>


[simple-events-routing]: http://react-form-generator.readthedocs.org/en/latest/basic/simple-events-routing/ 
