"use strict";

// Helpers
const helpers = require("./helpers");

// Karma configuration
// reference: http://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = (config) => {
    const testWebpackConfig = require("./webpack.test.js");
    config.set({

        // base path that will be used to resolve all patterns (e.g. files, exclude)
        basePath: "",

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            "jasmine",
        ],

        // list of files to exclude
        exclude: [],
        
        // client configuration
        client: {
            // can be used to pass arguments to tests (see spec-bundle.ts)
            args: [{
                // path to the subset of the tests to consider (used to filter the unit tests to execute (see spec-bundle.ts)
                testPath: helpers.getTestPath(process.argv),
            }],
            
            // other client-side config
            captureConsole: true,
        },

        // list of files / patterns to load in the browser
        files: [
            {
                pattern: helpers.root("config/spec-bundle.ts"),
                watched: false,
            }
        ],
        
        // list of paths mappings
        // can be used to map paths served by the Karma web server to /base/ content
        // knowing that /base corresponds to the project root folder (i.e., where this config file is located)
        proxies: {},

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "./config/spec-bundle.ts": [
                "webpack",
                "sourcemap",
                "coverage",
            ]
        },

        // Webpack Config
        webpack: testWebpackConfig,

        // test coverage
        coverageReporter: {
            dir: helpers.root("reports/coverage"),
            reporters: [
                {type: "text-summary"},
                {type: "json"},
                {type: "html"},
                {type: "lcov"}, // format supported by Sonar
            ]
        },

        // Webpack please don"t spam the console when running in karma!
        webpackServer: {
            noInfo: true,
        },

        // test results reporter to use
        // possible values: "dots", "progress", "spec", "junit", "mocha", "coverage" (others if you import reporters)
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // https://www.npmjs.com/package/karma-junit-reporter
        // https://www.npmjs.com/package/karma-spec-reporter
        reporters: [
            "mocha",
            "progress",
            "coverage",
            "junit",
        ],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            "Chrome",
            "Firefox",
            //"IE",
        ],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,
        
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // JUnit reporter configuration
        junitReporter: {
            outputDir: helpers.root("reports/coverage/"),
            outputFile: "tests-unit/unit.xml",
            suite: "unit",
        },
        
        // How many browsers should be started simultaneously
        //concurrency: Infinity,
    });
};
