module.exports = function(grunt){

    grunt.initConfig({

        pkg : grunt.file.readJSON("../package.json"),
        pkgjs : grunt.file.readJSON("package.json"),

        transport : {
            options : {
                paths : ['.'],
                alias : '<%= pkgjs.spm.alias %>'
            },

            main : {
                options : {
                    idleading : 'dist/<%= pkg.name %>/'
                },
                files : [
                    {
                        cwd : '<%= pkg.name %>',
                        src : '*',
                        filter : 'isFile',
                        dest : '.build/<%= pkg.name %>'
                    }
                ]
            }
        },

        concat : {
            options : {
                paths : ['.'],
                include : 'relative'
            },

            main : {
                options : {
                    include : 'relative'
                },
                files: [
                    {
                        expand: true,
                        cwd: '.build/',
                        src: ['<%= pkg.name %>/main.js', '<%= pkg.name %>/main-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            }
        },

        uglify: {
            main : {
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['<%= pkg.name %>/*.js', '!<%= pkg.name %>/*-debug.js'],
                        dest: 'dist/',
                        ext: '.js'
                    }
                ]
            },

            config : {
                files: [
                    {
                        src: ['<%= pkg.name %>/config.js'],
                        dest: 'dist/<%= pkg.name %>/config.js'
                    }
                ]
            }
        },

        clean : {
            spm : ['.build']
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('build',['transport','concat','uglify','clean']);
    //grunt.registerTask('build',['transport','concat','uglify']);
}