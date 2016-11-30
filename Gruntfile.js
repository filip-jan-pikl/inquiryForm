module.exports = function(grunt) {

  grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        less: {
            build: {
                files: {
                    '<%= pkg.destFolder %>/css/main.css': '<%= pkg.srcFolder %>/css/main.less',
                    '<%= pkg.destFolder %>/css/print.css': '<%= pkg.srcFolder %>/css/print.less',
                },
            },
            development: {
                files: {
                    '<%= pkg.destFolder %>/css/main.css': '<%= pkg.srcFolder %>/css/main.less',
                    '<%= pkg.destFolder %>/css/print.css': '<%= pkg.srcFolder %>/css/print.less',
                },
            },
        },

        cssmin: {
            build: {
                files: {
                    '<%= pkg.destFolder %>/css/main.min.css': ['<%= pkg.destFolder %>/css/main.css'],
                    '<%= pkg.destFolder %>/css/print.min.css': ['<%= pkg.destFolder %>/css/print.css'],
                },
            },
        },

        imagemin: {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.srcFolder %>/img',
                    src: '{,*/,*/*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= pkg.destFolder %>/img',
                }],
            },
        },

        concat: {
            build: {
                files: {
                    '<%= pkg.destFolder %>/js/main.js': ['<%= pkg.srcFolder %>/js/*.js'],
                },
            },
        },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
            },
            build: {
                files: {
                    '<%= pkg.destFolder %>/js/main.min.js': ['<%= pkg.destFolder %>/js/main.js'],
                },
            },
        },

        jshint: {
          files: ['Gruntfile.js', '<%= pkg.srcFolder %>/js/*.js'],
          options: {
            globals: {
              jQuery: true
            },
          },
        },

        watch: {
            livereload: {
                options: {
                    livereload: true,
                },
                files: ['<%= pkg.destFolder %>/**/*', '<%= pkg.srcFolder %>/**/*']
            },
            css: {
                files: ['<%= pkg.srcFolder %>/css/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true,
                },
            },
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            },
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');      //  sleduje upravy souboru
    grunt.loadNpmTasks('grunt-contrib-jshint');     //  validace JS  
    grunt.loadNpmTasks('grunt-contrib-concat');     //  spojí soubory JS
    grunt.loadNpmTasks('grunt-contrib-less');       //  převede LESS do CSS
    grunt.loadNpmTasks('grunt-contrib-cssmin');     //  minifikace CSS 
    grunt.loadNpmTasks('grunt-contrib-imagemin');   //  minifikace IMG
    grunt.loadNpmTasks('grunt-contrib-uglify');     //  minifikace JS
    //grunt.loadNpmTasks('grunt-contrib-copy');       //  kopiruje soubory do /dist

    grunt.registerTask('build', ['concat', 'jshint', 'uglify', 'less', 'cssmin', 'imagemin']);

};