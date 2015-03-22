# State-less form generator #

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

For full usage example see ```demo/client/main.js```.


### How do I get set up? ###

```shell
git clone git@bitbucket.org:azaviruha/react-form-generator.git
npm install
gulp demo # or, if you don't have global gulp: ./node_modules/.bin/gulp demo
```

The last command compiles demo and runs simple express server.


### TODO ###
* Add documentation (react-form-generator.github.io).
* Add unit-tests (a lot of!).
* Add metadata expanders.
* Add evetns routing.


### Contributors ###
* [azaviruha](https://github.com/azaviruha)
* [afoninv](https://github.com/afoninv)
