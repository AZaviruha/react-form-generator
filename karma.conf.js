module.exports = function(config) {
    config.set({
        basePath:    './',
        frameworks:  [ 'jasmine' ],
        browsers:    [ 'PhantomJS' /*, 'Chrome'*/ ],
        singleRun:   true,
        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],
        files: [
            { 
                pattern:  'spec/compiled/primitives/*.js',
                watched:  true,
                included: true,
                served:   true
            }, { 
                pattern:  'spec/compiled/tools/*.js',
                watched:  true,
                included: true,
                served:   true
            }, { 
                pattern:  'spec/compiled/validation/*.js',
                watched:  true,
                included: true,
                served:   true
            },
            'dist/*.js'
            // 'src/**/*.js'
            // 'src/components/compiled/*.js',
            // 'src/components/compiled/**/*.js'
            // http://stackoverflow.com/questions/28236587/getting-karma-6to5ify-and-istanbul-to-play-ball
            // http://stackoverflow.com/questions/24944541/test-coverage-with-karma-browserify-and-coffeescript
        ],
        preprocessors: { 
            'dist/*.js':                       [ 'coverage' ],
            'src/**/*.js':                     [ 'coverage' ],
            'src/components/compiled/*.js':    [ 'coverage' ],
            'src/components/compiled/**/*.js': [ 'coverage' ] 
        },
        coverageReporter: {
            type: 'lcov',
            dir:  'coverage/'
        },
        reporters: [ 'progress', 'coverage' ],
        colors: true
        // logLevel: config.LOG_DEBUG
    });
};
