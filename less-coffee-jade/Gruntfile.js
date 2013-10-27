module.exports = function(grunt) {

  grunt.initConfig({

    coffee: {
      main: {
        options: {
          bare: true
        },
        expand: true,
        flatten: false,
        cwd: 'src/javascript',
        src: '**/*.coffee',
        dest: 'public/javascript',
        ext: '.js'
      }
    },

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
            'public/javascript/vendor/jquery*.js',
            'public/javascript/modules/*.js'
          ]
        }
      },
      css: {
        files: {
          'public/stylesheets/all.css': [
            'public/stylesheets/vendor/normalize.css',
            'public/stylesheets/vendor/html5bp-intro.css',
            'public/stylesheets/main.css',
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

    less: {
      main: {
        files: {
          'public/stylesheets/main.unprefixed.css': 'src/stylesheets/less/main.less'
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
      options: {
        browsers: ['> 1%', 'last 2 version', 'ie 8']
      },
      main: {
        files: {
          'public/stylesheets/main.css': 'public/stylesheets/main.unprefixed.css'
        }
      }
    },

    jade: {
      main: {
        options: {
          pretty: true
        },
        files: {
          "public/index.html": "src/templates/index.jade"
        }
      }
    },

    watch: {
      jade: {
        files: 'src/templates/**',
        tasks: ['jade']
      },
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

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('js', ['coffee', 'copy:js', 'concat:js', 'uglify']);
  grunt.registerTask('css', ['copy:css', 'less', 'autoprefixer', 'concat:css', 'cssmin']);
  grunt.registerTask('default', ['jade', 'js', 'css']);


};
