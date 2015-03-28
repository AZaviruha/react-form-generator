<h3>Simple validation</h3>

Validation is one of the most frequently occurring task in a typical
CRUD application. So in this section we will look how to add
validation into our simple form.

For the most situations, validation is very declarative by it's
nature. Of course, there are situations in which validation rules are
changed during the field's lifecycle (we will see example of such
dynamic validation in one of the future tutorials). But in the most
case validation rules are static.
For example, "e-mail" field in the authentication form requires
correct e-mail during the whole form's lifecycle.

That's why, in our form genertor validation is a part of the form's
metadata.

To add validation of the specific field, first, fill the `validators`
section in the field's logical model:

```javascript
    ...
    "field": {
        "renderer": "text",
        "validators": [
            {
                "rule": "required",
                "message": "Field is required"
            },
            {
                "rule": "maxLength",
                "value": 5,
                "message": "Maximum length of field is 5 characters"
            }
        ]
    }, 
    ...
```

Now you need somehow to get information about validations error from
GeneratedForm. The good news is that out `onChange` callback already gets
field's errors as it third argument:

```javascript
    ...
    handleFormChanged: function ( newValue, change, fldErrors ) {
            this.setState({ 
                value:   newValue,
                errors:  tools.merge( this.state.errors, fldErrors )
            })
    },
    ...
```

To render those errors you need to fill `errors` property of GeneratedForm.

```javascript
    return (<GeneratedForm meta={meta}
                           value={this.state.value}
                           errors={this.state.errors}
                           onChange={this.handleFormChanged}
                           ...
```


Here is the complete example of our simple validation. Try to remove
all text from "field #1", or uncheck the "field #2" to see validation
error message.

<iframe width="100%" 
        height="300" 
        src="//jsfiddle.net/azaviruha/69z2wepo/5003/embedded/" 
        allowfullscreen="allowfullscreen" 
        frameborder="0">
</iframe>


There are some other standard validators. For now you can read
about them [here][validators].
There are also a few of "complex" validators, like `or` and `and`. We
will look at them in the "Complex validation" section.

[validators]: https://github.com/AZaviruha/react-form-generator/blob/master/src/validation/validators.js
