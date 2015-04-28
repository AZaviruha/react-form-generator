<h2>Metadata format description</h2>

WARNING! This is work-in-progress!

```javascript
{
    /**
     * # Logical model
     * This section contains information about form's logical model:
     * set of fields, type of each field, some type-specific
     * parameters, etc.
     */
    "fields": {

        /**
         * "text" renderer example.
         */
        "field1": {

            /**
             * All properties at this level are common for all
             * types of renderers.
             */

            "renderer":     "text",
            "defaultValue": "some default value",
            "isHidden":     false,
            "isDisabled":   false,
            "validators":   [
                {
                    "rule": "required",
                    "message": "Field is required"
                },
                {
                    "rule": "maxLength",
                    "value": 5,
                    "message": "Maximum length of field is 5 characters"
                },
                ...
            ],

            /**
             * All properties in "rendererSpecific" are
             * specific for different types of renderers.
             */
            "rendererSpecific": {}
        }, 

        /**
         * "textarea" renderer example.
         */
        "field2": {
            "renderer":     "textarea",
            "defaultValue": "some default value",
            "isHidden":     false,
            "isDisabled":   false,
            "validators":   [
                ...
            ],
            "rendererSpecific": {
                "cols": 42,
                "rows": 7
            }
        }, 

        /**
         * "checkbox" renderer example.
         */
        "field3": {
            "renderer":     "checkbox",
            "defaultValue": 1,
            "isHidden":     false,
            "isDisabled":   false,
            "validators":   [
                ...
            ],
            "rendererSpecific": {
                /**
                 * Allows declaratively set mapping of checkbox
                 * "checked" and "unchecked" value.
                 */
                "truthMap": {
                    "true":  1,
                    "false": 0
                }
            }
        }, 

        /**
         * "radiogroup" renderer example.
         * (set of radio-buttons).
         */
        "field4": {
            "renderer":     "radiogroup",
            "defaultValue": "second",
            "isHidden":     false,
            "isDisabled":   false,
            "validators":   [
                ...
            ],
            "rendererSpecific": {
                /**
                 * Set of elements for radio-buttons generation.
                 */
                "possibleValues": [
                    { "id": "first",  "text": "First" },
                    { "id": "second", "text": "Second" }
                ]
            }
        }, 


        /**
         * "select" renderer example.
         */
        "field5": {
            "renderer":     "select",
            "defaultValue": "second",
            "isHidden":     false,
            "isDisabled":   false,
            "validators":   [
                ...
            ],
            "rendererSpecific": {
                /**
                 * Set of elements for <options>'s generation.
                 */
                "possibleValues": [
                    { "id": "first",  "text": "First" },
                    { "id": "second", "text": "Second" }
                ]
            }
        }, 


        /**
         * "button" renderer example.
         */
        "field6": {
            "renderer":     "button",
            "isHidden":     false,
            "isDisabled":   false,
            "rendererSpecific": {
                "text": "Button Text"
            }
        }, 
        ...
    },

    /**
     * # Layout model
     * This section describes form's presentation part.
     * Layout is based on the grid system, and is represented
     * by simple hierarchy:
     *     grid > rows > cells > content
     *
     * It is also possible to form recursive hierarchy:
     *     "content": [{ "renderer": "grid" }]
     *
     * Layout is rendered to nested divs. It is possible 
     * to set custom css classes for each level of hierarchy.
     */
    "layout": {
        "grid": {
            "css": "container demo-form",
            "rows": [{
                "css": "row",
                "cells": [{
                    "css": "col-xs-12 col-sm-12 col-md-10 col-md-offset-1",
                    "content": [{
                        "renderer": "default",
                        "rendererSpecific": {
                            "fieldID": "field1",
                            "label": "Field #1:",
                            "css": {
                                "wrapper": "row",
                                "inner": "",
                                "label": "col-xs-12 col-sm-12 col-md-2",
                                "field": "col-xs-12 col-sm-12 col-md-10"
                            }
                        }
                    }]
                }]
            }]
        }
    }
}
```
