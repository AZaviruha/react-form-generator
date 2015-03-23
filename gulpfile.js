var gulp       = require( 'gulp' )
  , react      = require( 'gulp-react' )
  , uglify     = require( 'gulp-uglify' )
  , concat     = require( 'gulp-concat' )
  , replace    = require( 'gulp-replace' )
  , insert     = require( 'gulp-insert' )
  , browserify = require( 'gulp-browserify' )
  , shell      = require( 'gulp-shell' )
  , path       = require( 'path' )
  , karma      = require( 'karma' ).server;


/**
 * Compiles all jsx primitives' renderers.
 */
gulp.task( 'compile-primitives', function () {
    return gulp
        .src( 'src/components/primitives/*.jsx' ) 
        .pipe( react() ) 
        .pipe( gulp.dest( 'src/components/compiled/primitives/' ) );
});


/**
 * Compiles all jsx layouts' renderers
 */
gulp.task( 'compile-layouts', function () {
    return gulp
        .src( 'src/components/layouts/*.jsx' ) 
        .pipe( react() ) 
        .pipe( gulp.dest( 'src/components/compiled/layouts/' ) );
});


/**
 * Compiles all jsx components. 
 */
gulp.task( 'compile-components', 
           [ 'compile-primitives', 'compile-layouts' ], function () 
{
    return gulp
        .src( 'src/components/*.jsx' ) 
        .pipe( react() ) 
        .pipe( gulp.dest( 'src/components/compiled/' ) );
});


/**
 * Builds version for "<script/>"
 */
gulp.task( 'build-min-global', [ 'compile-components' ], function () {
    return gulp
        .src( 'src/components/compiled/generated-form.js' ) 
        .pipe( replace("require( 'react' )", 
                       'window.React'))
        .pipe( browserify() )
        .pipe( replace( 'module.exports = formGenerator', 
                        'window.FormGenerator = formGenerator'))
        .pipe( uglify() )
        .pipe( concat( 'react-form-generator.global.min.js' ) )
        .pipe( gulp.dest( 'dist/' ) );
});


/**
 * To complie *.scss files into *css, run
 * ```gulp compile-scss```
 */
gulp.task( 'compile-scss' , shell.task([
    path.normalize( './node_modules/.bin/node-sass ' ) + 
    path.normalize( 'demo/client/scss/main.scss ' ) + 
    path.normalize( 'demo/client/css/main.css' )
]));


/**
 * To build "browserify" demo, execute
 * ```gulp build-demo```
 */
gulp.task( 'build-demo', 
           [ 'compile-components', 'compile-scss' ], function () {
    return gulp.src( 'demo/client/js/main.js' )
               .pipe( react() )
               .pipe( browserify() )
               .pipe( concat( 'bundle.js' ) )
               .pipe( gulp.dest( 'demo/client/js/' ) );
});


/**
 * To build "global script" demo, execute
 * ```gulp build-demo2```
 */
gulp.task( 'copy-global-fg', [ 'build-min-global' ], function () {
    return gulp.src( 'dist/*.js' )
               .pipe( gulp.dest( 'demo/client/js/' ) );
});
gulp.task( 'copy-global-react', function () {
    return gulp.src( 'node_modules/react/dist/react.js' )
               .pipe( gulp.dest( 'demo/client/js/' ) );
});
gulp.task( 'build-demo2', 
           [ 'copy-global-react', 'copy-global-fg', 
             'compile-components', 'compile-scss' ], function () {
    return gulp.src( 'demo/client/js/main2.js' )
               .pipe( react() )
               .pipe( browserify() )
               .pipe( concat( 'bundle2.js' ) )
               .pipe( gulp.dest( 'demo/client/js/' ) );
});


/**
 * To run demo, execute
 * ```gulp demo```
 */
gulp.task( 'demo' , [ 'build-demo' ], shell.task([
    'node ' + path.normalize( './app.js' )
], { cwd: './demo/' }));


/**
 * Builds test specs.
 */
gulp.task( 'build-tests', [ 'build' ], function () {
    return gulp.src( 'spec/component/*.jsx' )
               .pipe( react() )
               .pipe( browserify() )
               .pipe( concat( 'bundle.spec.js' ) )
               .pipe( gulp.dest( 'spec/' ) );
});


/**
 * Runs unit-tests.
 */
gulp.task( 'test', [ 'build-tests' ], function ( done ) {
    karma.start({
        configFile: __dirname + '/karma.conf.js'
    }, done );
});

