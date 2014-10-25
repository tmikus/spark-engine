var engineFiles = require("./EngineFilesList");
var engineLogicFiles = require("./EngineLogicFileList");

module.exports = function (grunt)
{
    grunt.initConfig(
    {
        pkg: grunt.file.readJSON("package.json"),

        concat:
        {
            engine:
            {
                options:
                {
                    separator: ';\n'
                },
                src: engineFiles,
                dest: 'dist/spark-engine.js'
            },
            "engine-logic":
            {
                options:
                {
                    separator: ';\n'
                },
                src: engineLogicFiles,
                dest: 'dist/spark-engine-logic.js'
            }
        },

        copy:
        {
            "example-test":
            {
                src:
                [
                    "dist/*"
                ],
                dest: 'examples/test/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['concat:engine', 'concat:engine-logic']);
    grunt.registerTask('build-example-test', ['build', 'copy:example-test']);
};