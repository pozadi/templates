module.exports = function(grunt) {

  grunt.initConfig({

    copy: {
      js: {
        expand: true,
        flatten: false,
        cwd: 'src/javascript',
        src: '**/*.js',
        dest: 'public/javascript'
      },
      css: {
        expand: true,
        flatten: false,
        cwd: 'src/stylesheets',
        src: '**/*.css',
        dest: 'public/stylesheets'
      }
    },

    concat: {
      js: {
        files: {
          'public/javascript/all.js': [
            'public/javascript/vendor/jquery.min.js',
            'public/javascript/modules/*.js'
          ]
        }
      },
      css: {
        files: {
          'public/stylesheets/all.css': [
            'public/stylesheets/vendor/normalize.css',
            'public/stylesheets/vendor/html5bp-intro.css',
            'public/stylesheets/main.prefixed.css',
            'public/stylesheets/vendor/html5bp-outro.css'
          ]
        }
      }
    },

    uglify: {
      options: {
        banner: '/* <%= grunt.template.today("yyyy-mm-dd HH:MM:ss o") %> */\n\n'
      },
      main: {
        files: {
          'public/javascript/all.min.js': 'public/javascript/all.js'
        }
      }
    },

    cssmin: {
      options: {
        banner: '/* <%= grunt.template.today("yyyy-mm-dd HH:MM:ss o") %> */\n\n',
        keepSpecialComments: 0,
        keepBreaks: true
      },
      main: {
        files: {
          'public/stylesheets/all.min.css': 'public/stylesheets/all.css'
        }
      }
    },

    autoprefixer: {
      main: {
        files: {
          'public/stylesheets/main.prefixed.css': 'public/stylesheets/main.css'
        }
      }
    },

    watch: {
      javascript: {
        files: 'src/javascript/**',
        tasks: ['js']
      },
      css: {
        files: 'src/stylesheets/**',
        tasks: ['css']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('js', ['copy:js', 'concat:js', 'uglify']);
  grunt.registerTask('css', ['copy:css', 'autoprefixer', 'concat:css', 'cssmin']);
  grunt.registerTask('default', ['js', 'css']);


};
