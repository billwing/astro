module.exports = function( grunt ) {

    grunt.initConfig({

        pkg : grunt.file.readJSON("../package.json"),

        smushit:{
            /*destination:{
                src:'<%= pkg.name %>/',
                dest:'opt_img/'
            },*/specificExtension: {
                src:['<%= pkg.name %>/**/*']
            }
        },
        jshint: {
            files: [
                'grunt.js',
                'tasks/**/*.js'
            ],
            options: {
                es5: true,
                esnext: true,
                bitwise: true,
                curly: true,
                eqeqeq: true,
                latedef: true,
                newcap: true,
                noarg: true,
                noempty: true,
                regexp: true,
                undef: true,
                strict: true,
                trailing: true,
                smarttabs: true,
                node: true
            }
        }
    });

    grunt.loadTasks('tasks');
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask( 'build', ['jshint','smushit'] );

};