# State-less form generator #
[![Docs][docs-image]][docs-url]
[![Code Climate][cclimate-image]][cclimate-url] <br />
[![NPM version][npm-stats]][npm-url]

### Summary ###

React component, that generates form from metadata. 

Features:

* separated form's logic model and layout;
* validation (includes complex validators ```or``` and ```and```);
* grid-based layout (nested grids are possible too).
* extensibility (support for custom *primitive* and custom *layout* renderers)
 

### Usage ###

```javascript
var GeneratedForm = require( 'react-form-generator' )();

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

The last command compiles demo and runs simple *express* server.


### TODO ###
* Add documentation (in progress).
* Add unit-tests (in progress).
* Add full metadata formar description (in progress).
* Add metadata expanders.


### Contributors ###
* [afoninv](https://github.com/afoninv)
* [PolniyA](https://github.com/PolniyA)
* [aleksandr-pushkarev](https://github.com/aleksandr-pushkarev)


Distributed under the MIT License (see LICENSE file).

[docs-image]: https://readthedocs.org/projects/react-form-generator/badge/?version=latest
[docs-url]: http://react-form-generator.readthedocs.org/en/latest/
[npm-url]: https://www.npmjs.org/package/react-form-generator
[npm-stats]: https://nodei.co/npm/react-form-generator.png?downloads=true
[cclimate-image]: https://codeclimate.com/github/AZaviruha/react-form-generator/badges/gpa.svg
[cclimate-url]: https://codeclimate.com/github/AZaviruha/react-form-generator
