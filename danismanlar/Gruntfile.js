module.exports = function (grunt) {

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

        clean : {
            options : {},
            'minolmayanlar' : {
                src : ['dist/*.html','!dist/*.min.html']
            }
        },


            // Takes your scss files and compiles them to css
            sass: {
                dist: {
                    options: {
                        style: 'expanded'
                    },
                    files: {
                        'src/css/main.css': 'src/css/scss/main.scss'
                    }
                }
            },



            // Assembles your email content with html layout
            assemble: {
                options: {
                    production: true,
                    layoutdir: 'src/layouts',
                    flatten: true,
                    data:'src/data/*.yaml'

                },
                pages: {
                    src: ['src/pages/*.hbs'],
                    dest: 'dist/'
                },
                prettify: {
                    indent: 2,
                    condense: true,
                    padcomments: true
                }
            },

            // Inlines your css
            premailer: {
                simple: {
                    options: {
                        removeComments: true,
                        removeClasses: true

                    },
                    files: [{
                        expand: true,
                        src: ['dist/*.html'],
                        dest: ''
            }]
                }
            },

           htmlmin: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                minifyCSS: true,
                keepClosingSlash: true
            },
            files: {
                expand: true,
                ext: '.min.html',
                src: ['dist/*.html'],
                dest:''
            }
        },

        // Watches for changes to css or email templates then runs grunt tasks
        watch: {
            files: ['src/css/scss/*', 'src/pages/*', 'src/layouts/*', 'src/data/*'],
            tasks: ['default','clean:minolmayanlar']
        },


    });

// Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('assemble');

grunt.loadNpmTasks('grunt-premailer');
grunt.loadNpmTasks('grunt-contrib-htmlmin');
grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'assemble', 'premailer','htmlmin','clean:minolmayanlar']);

};