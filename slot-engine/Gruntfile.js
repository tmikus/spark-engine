var engineFiles = require("./EngineFilesList");

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
                dest: 'dist/slot-engine.js'
            }
        },

        "index-resources":
        {
            game:
            {
                cwd: 'games/<%= grunt.task.current.args[0] %>/',
                src:
                [
                    '**',
                    '!index.html'
                ],
                dest: 'games/<%= grunt.task.current.args[0] %>/json/resources.json',
                replacements:
                [
                    { "what": /^json\//i, "with": "" }
                ],
                minify: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.loadTasks("grunt-tasks");

    grunt.registerTask('build', ['concat:engine', 'index-resources:game:sample-game']);
};