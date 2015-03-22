# State-less form generator #
[![Docs][docs-image]][docs-url]

### Summary ###

React component, that generates form from metadata. 

Features:

* separated form's logic model and layout;
* validation (includes complex validators ```or``` and ```and```);
* grid-based layout (nested grids are possible too).
* extensibility (support for custom *primitive* and custom *layout* renderers)
 

### Usage ###

```javascript
<GeneratedForm meta={meta}
               value={this.state.value}
               errors={this.state.errors}
               onChange={this.handleFormChanged}/>
```

For full usage example see ```demo/client/main.js``` or [read the docs][docs-url].


### How do I get set up? ###

```shell
git clone git@github.com:AZaviruha/react-form-generator.git
npm install
gulp demo # or, if you don't have global gulp: ./node_modules/.bin/gulp demo
```

The last command compiles demo and runs simple express server.


### TODO ###
* Add documentation.
* Add unit-tests (a lot of!).
* Add metadata expanders.
* Add evetns routing.


### Contributors ###
* [afoninv](https://github.com/afoninv)
* [PolniyA](https://github.com/PolniyA)


Copyright (C) 2015 Alexei Zaviruha and contributors.
Distributed under the MIT License

[docs-image]: https://readthedocs.org/projects/react-form-generator/badge/?version=latest
[docs-url]: http://react-form-generator.readthedocs.org/en/latest/