# react-form-generator

## Usage

*react-form-generator* is pure (state-less) React component, that generates complex forms from declarative metadata.


### Basic form example

Let's start from building the simple form:
<iframe width="100%" 
        height="300" 
        src="//jsfiddle.net/azaviruha/69z2wepo/4581/embedded/" 
        allowfullscreen="allowfullscreen" 
        frameborder="0">
</iframe>

To see our form, go to the tab "Result". In the tab "HTML", you can see some basic metadata, that Generator uses to render form.

```javascript
window.meta = {
    "fields": {
        "field1": {
            "renderer": "text",
            "defaultValue": "test read-only value",
            "isReadOnly": true
        },
        "field2": {
            "renderer": "text"
        }
    },

    "layout": {
        "grid": {
            "css": "container demo-form",
            "rows": [{
                "css": "row",
                "cells": [{
                    "css": "col-xs-12 col-sm-12 col-md-10",
                    "content": [{
                        "renderer": "default",
                        "rendererSpecific": {
                            "fieldID": "field1",
                            "label": "Field #1:",
                            "css": {
                                "wrapper": "row",
                                "inner": "",
                                "label": "col-xs-2 col-sm-2 col-md-2",
                                "field": "col-xs-10 col-sm-10 col-md-10"
                            }
                        }
                    }]
                }]
            },
            ...]
        }
    }
}
```

At the top level, our metadata consists of two sections: `fields` and
`layout`. The `fields` sections describes logical model of generated
form, and `layout` section describes ... well, layout.

Logical model includes some essential information about each of
fields: type (text, checkbox, etc.), visibility, readonly-ness,
validation rules and other.

Layout describes form's presentation: how to draw each of fields in
the page, where to drive field's label, field's errors of validation
and so on.

Layout system is *grid-based*. If you are familiar with bootstrap's
grid system, then you know, what I mean.
