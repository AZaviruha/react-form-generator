<h2>Composite validation</h2>

In the section about [simple validation][simple-validation] we saw how
to use a simple validation. Now we will learn how to create more
complex validation rules.

There are two "composite" validators in our framework: `or` and `and`
validators. First, let's look in which cases `or` validator can be useful.

For example we have a text field in our form, and this field can
accept either three-character alpabetic CODE or nine-character ID. This
situation can be easily solved with combination of `or` and `and` validators:

```javascript
    ...
    "field": {
        "renderer": "text",
        "validators": [{
            "rule": "or",
            "value": [{
                "rule": "and",
                "value": [{
                    "rule": "alphabetics"
                }, {
                    "rule": "length",
                    "value": 3
                }]
            }, {
                "rule": "and",
                "value": [{
                    "rule": "numbers"
                }, {
                    "rule": "length",
                    "value": 9
                }]
            }],
            "message": "Only 3-characters CODE or 9-characters ID allowed"
        }]
    }, 
    ...
```

You can nest "or" into "and" and vice verse. Below you will find a complete example of a composite validation.

<iframe width="100%" 
        height="300" 
        src="//jsfiddle.net/azaviruha/69z2wepo/6000/embedded/" 
        allowfullscreen="allowfullscreen" 
        frameborder="0">
</iframe>


[simple-validation]: http://react-form-generator.readthedocs.org/en/latest/basic/simple-validation/ 
