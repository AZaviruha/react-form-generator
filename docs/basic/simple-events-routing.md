<h2>Simple events routing</h2>

As stated in the [previous section][useful-helpers-defaults], it's not very useful to show validation errors before user even starting to type anything. So, it this tutorial we will look at the better way to process form validation.

Let us consider a simple scenario: you want to build a simple form, with some validations rule. Whe user types something into one on of the fields, you want to check its validity and to show validatior errors of this field. But when user clicks to the "Send" button, you want to show all validation errors.

To implement this scenario, we will start with the simple metadata:
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

First, let's see, how we can accumulate information about form validity during form's lifecycle.


```javascript
var FG            = window.FormGenerator
  , t             = window.FormGenerator.tools
  , GeneratedForm = FG({})
  , validateForm  = GeneratedForm.validateForm;

var App = React.createClass({
    getInitialState: function () {
        return {
            value:  t.evalDefaults( meta ), 
            errors: {} 
        };
    },

    handleFormChanged: function ( newValue, change, fldErrors ) {
        this.setState({ 
            value:   newValue,
            errors:  t.merge( this.state.errors, fldErrors ), // this line
        });
    },
    
    render: function() {
        return (<GeneratedForm meta={meta}
                               value={this.state.value}
                               errors={this.state.errors}
                               onChange={this.handleFormChanged}/>);
    }
```

As you can see, `onChange` callback already provide information about
field's validity, so all we need is merge it into form's validity state. So this part of our example scenario is easy to solve.

Now, what about second part - "when user clicks to the "Send" button, you want to show all validation errors"?

Because `button` primitive does not have concept of "change", like `text` or `textarea`, we can't process any button's events in `onChange` callback.

To process such cases `GeneratedForm` provides more general callback `onEvent`:

```javascript
    handleFormEvent: function ( fieldID, eventName, eventInfo ) {
        var repo = {
            'btnSend': {
                'click': btnClickHandler
            }
        };
        
        var handler = t.getOrNull( repo, [ fieldID, eventName ] );
        if ( handler ) handler.call( this, eventInfo );
        
        function btnClickHandler () {
            this.setState({
                errors: validateForm( meta, this.state.value )
            });
        }
    },

        
    render: function() {
        return (<GeneratedForm meta={meta}
                               value={this.state.value}
                               errors={this.state.errors}
                               onChange={this.handleFormChanged}
                               onEvent={this.handleFormEvent}/>);
    }
```

Of course, it is not very smart to create `repo` at the every `onEvent` call, so we should to move repo's definition out of `handleFormEvent`.

Here is JSFiddle example that provides complete solution to our "problem".

<iframe width="100%" 
        height="300" 
        src="//jsfiddle.net/azaviruha/69z2wepo/5009/embedded/" 
        allowfullscreen="allowfullscreen" 
        frameborder="0">
</iframe>


[useful-helpers-defaults]: http://react-form-generator.readthedocs.org/en/latest/basic/useful-helpers-defaults/ 
