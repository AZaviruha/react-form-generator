<h2>Custom components</h2>

In this tutorial we will look how to teach our generator to build form with custom components. For example, we want to add `CheckGroup` component, which represents list of choices.

The first step of the custom component development is to design it's interface through describing component's metadata.

```javascript
    ...
    
    "fields": {
        ...,

        "variants": {
            "renderer": "checkgroup",
            "defaultValue": ["second"],
            "rendererSpecific": {
                "possibleValues": [
                    { "id": "first",  name: "form1[variants][]", "text": "First option" },
                    { "id": "second", name: "form1[variants][]", "text": "Second option" },
                    { "id": "third",  name: "form1[variants][]", "text": "Third option" }
                ]
            }
        },
```

As you can see, `CheckGroup` component will have some set of possible values and set of default values.
This is the first part of our component's public API - metadata format.

Now, we can add some code to render our component:

```javascript
var FG            = window.FormGenerator
  , t             = window.FormGenerator.tools
  , _             = require( 'lodash' );

/**
 * Custom components example: CheckGroup
 */
var CheckGroup = React.createClass({
    displayName: 'CheckboxRenderer',

    propTypes: {
        config: React.PropTypes.object.isRequired
    },

    /* =========================================================== */
    /* ======================== Renders ========================== */
    /* =========================================================== */
    render: function () {
        var props  = this.props
          , config = props.config || {}
          , meta   = config.meta || {}
          , spec   = meta.rendererSpecific || {}

        if ( meta.isHidden ) return null;

        return (
            <div className="generated-checkgroup-field"
                 id={config.fieldID}>
                {this.renderItems( spec.possibleValues )}
            </div>
        );
    },

    ...
```

So, our component is just a plain React component. What is interesting here, that's a `this.props.config` property. This property is filled by generator, when it's renders a whole form. When you write your custom component, you can expect that `this.props.config.meta` will get all metadata of the field, whose `renderer` matches with component's type.

The next fragment of code describes the mechanism, which helps us to
fulfill the second part of component's public API:

```javascript
    ...
    
    /* =========================================================== */
    /* ======================== Handlers ========================= */
    /* =========================================================== */
    handleOnChange: function ( e, item ) {
        var config   = this.props.config || {}
          , meta     = config.meta || {}
          , spec     = meta.rendererSpecific || {}
          , onChange = config.onChange || _.noop;

        var res = { 
            id:    config.fieldID,
            meta:  meta,
            value: {}
        };

        var oldValue = config.value || [];
        res.value[ res.id ] = _.contains( oldValue, item.id ) 
            ? _.without( oldValue, item.id ) : oldValue.concat([ item.id ]);

        onChange( res );
    },
```

We have a `handleOnChange` method, which is called, when user clicks on one of the rendered comboboxes. This handler should call `config.onChange` callback with single argument. Here is a fool description of this argument:

```javascript
{
    id    : ... // Field's ID
    meta  : ... // Fields metadata, that was used to render field
    value : {
        %fieldID% : %value%
    }
}
```

So, as you can see, custom component should fulfill a few contracts. First, it should "understand" metadata format ("input contract"). And second, it should call specified callback with specified argument ("output format").


The last part of custom component adding is to register our component during creation of the generator instance:

```javascript
var GeneratedForm = FG({
    primitives : { 'checkgroup' : CheckGroup }
});
```

The `primitives` section allows to add a whole "repository" of custom components. For example, if you have a commonjs module which exports a lots of components, you can just write:

```javascript
var GeneratedForm = FG({
    primitives : require('my-components')
});
```

Full source code of example is [here][example-source-code]

[example-source-code]: https://github.com/AZaviruha/react-form-generator/blob/master/demo/client/js/main.js

