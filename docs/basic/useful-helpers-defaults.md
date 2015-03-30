<h2>Useful helpers - evaluating form's defaults</h2>

#### evalDefaults

Let's look one more on the example from previous [section][simple-validation], in particular on the `getInitialState` method:
```javascript
var FG            = window.FormGenerator
  , t             = window.FormGenerator.tools;

...

var App = React.createClass({
    getInitialState: function () {
        return {
            value:   t.evalDefaults( meta ), // this line
            errors:  {}
        };
    }
```

Here `evalDefaults` helper allow us to get initial value of the form.
This function takes form's metadata, and brings together all `defaultValue` properties in the `fields` section.


#### validateForm

Another usefull helper is `validateForm`. It takes form's meta and
value and returns information about form's validations errors in the
same format, which is required by property `errors` of GeneratedForm.

So we can rewrite our example like this:
```javascript
var FG            = window.FormGenerator
  , t             = window.FormGenerator.tools
  , GeneratedForm = FG({})
  , validateForm  = GeneratedForm.validateForm;

var App = React.createClass({
    getInitialState: function () {
        var value = t.evalDefaults( meta );

        return {
            value:  value, 
            errors: validateForm( meta, value ) // this line
        };
    },

    ...
    
    render: function() {
        return (<GeneratedForm meta={meta}
                               value={this.state.value}
                               errors={this.state.errors}
                               onChange={this.handleFormChanged}/>);
    }
```

Here is JSFiddle example with default value and errors:
<iframe width="100%" 
        height="300" 
        src="//jsfiddle.net/azaviruha/69z2wepo/5005/embedded/" 
        allowfullscreen="allowfullscreen" 
        frameborder="0">
</iframe>

Of course, it's not very useful to show validation errors before user
even starting to type anything. So in the [next section][simple-events-routing] you will see more real-like example of `validateForm` using.


[simple-validation]: http://react-form-generator.readthedocs.org/en/latest/basic/simple-validation/ 
[simple-events-routing]: http://react-form-generator.readthedocs.org/en/latest/basic/simple-events-routing/ 
