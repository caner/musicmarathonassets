module.exports = function(grunt) {

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
            layoutdir: 'src/layouts',
            flatten: true,
              data:'src/data/*.json'
          },
          pages: {
            src: ['src/emails/*.hbs'],
            dest: 'dist/'
          }
        },

        // Inlines your css
        premailer: {
          simple: {
            options: {
              removeComments: true,
                queryString: 'utm_source=tmmmail&utm_medium=email&utm_campaign=tmmbasvuran',
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
          files: ['src/css/scss/*','src/emails/*','src/layouts/*'],
          tasks: ['default','clean:minolmayanlar']
        }
    });
          

    // Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-premailer');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');


    // Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['sass','assemble','premailer','htmlmin','clean:minolmayanlar']);


};
