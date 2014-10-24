/**
 * Array of engine files.
 * The array specifies the files in order for including.
 * @type {Array}
 */
module.exports =
[
    'src/polyfills/Function.bind.js',
    'src/polyfills/Performance.now.js',
    'libs/es6-promise/es6-promise.js',
    'bower_components/three.js/build/three.js',
    'src/utils/Class.js',
    'src/**.js',
    'src/Engine.js'
];