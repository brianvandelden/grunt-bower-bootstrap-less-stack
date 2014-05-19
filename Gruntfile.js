// commands:
// grunt >> watch
// grunt build >> generate build
// grunt prod >> generated assets folder
module.exports = function (grunt) {

    // Configurable paths
    var config = {
        app: '',
        dist: 'public/'
    };

    grunt.initConfig({

        // Project settings
        config: config,

        pkg: grunt.file.readJSON('package.json'),

        /******************************************************************
         *
         *    Compiling the Less files
         *
         ******************************************************************/

        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },
            all: {
                src: ['scripts/**/*.js']
            }
        },

        less: {
            build: {
                options: {
                    paths: ["<%= config.dist %>/styles"]
                },
                files: {
                    '<%= config.dist %>/styles/app.css': ['styles/app.less']
                }
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            js: {
                src: [
                    'bower_components/modernizr/modernizr.js',
                    'bower_components/foundation/js/foundation.js',
                    'scripts/**/*.js',
                ],
                dest: '<%= config.dist %>/scripts/app.js'
            },
            css: {
                src: [
                    'bower_components/foundation/css/normalize.css',
                    'bower_components/foundation/css/foundation.css',
                    '<%= config.dist %>/styles/app.css',
                ],
                dest: '<%= config.dist %>/styles/app.css'
            }
        },

        cssmin: {
            prod: {
                files: {
                    '<%= config.dist %>/styles/app.min.css': ['<%= config.dist %>/styles/app.css']
                }
            }
        },

        uglify: {
            prod: {
                src: ['<%= config.dist %>/scripts/app.js'],
                dest: '<%= config.dist %>/scripts/app.min.js'
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            prod: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        copy: {
            prod: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '',
                        dest: '<%= config.dist %>',
                        src: [
                            '*.{ico,txt}',
                            '.htaccess',
                            'images/{,*/}*.webp',
                            'styles/fonts/*'
                        ]
                    }
                ]
            }
        },


        /******************************************************************
         *
         *    Watch looks for changes in the file, and runs a specific task when there is a change.
         *
         ******************************************************************/

        watch: {
            options: {
                livereload: true, // Hier ben ik nog mee bezig... Werkt nog niet helemaal. Zou geralateerd moeten zijn aan express
            },
            grunt: {
                files: ['Gruntfile.js']
            },
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            css: {
                files: ['styles/*.less'],
                tasks: ['less', 'concat']
            },
            scripts: {
                files: ['scripts/**/*.js'],
                tasks: ['jshint', 'concat'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            html: {
                files: '**.html',
                options: {
                    livereload: true
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('build', ['jshint', 'less', 'concat']);
    grunt.registerTask('prod', ['build', 'uglify', 'cssmin', 'imagemin', 'copy']);
    grunt.registerTask('default', ['build', 'watch']); // Called by default when starting grunt

}