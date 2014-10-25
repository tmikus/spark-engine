/**
 * Array of engine files.
 * The array specifies the files in order for including.
 * @type {Array}
 */
module.exports =
[
    'src/polyfills/*.js',
    'libs/es6-promise/es6-promise.js',
    'bower_components/three.js/build/three.js',
    'src/utils/Class.js',
    'src/application/*.js',
    'src/core/*.js',
    'src/debugging/*.js',
    'src/network/*.js',
    'src/resources/ResourceManager.js',
    'src/worker/WorkerInitialisationStatus.js',
    'src/Engine.js'
];