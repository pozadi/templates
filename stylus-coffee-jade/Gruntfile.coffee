module.exports = (grunt) ->

  grunt.initConfig(

    coffee:
      main:
        options:
          bare: true
        expand: true
        flatten: false
        cwd: "src/javascript"
        src: "**/*.coffee"
        dest: "public/javascript"
        ext: ".js"

    copy:
      js:
        expand: true
        flatten: false
        cwd: "src/javascript"
        src: "**/*.js"
        dest: "public/javascript"
      css:
        expand: true
        flatten: false
        cwd: "src/stylesheets"
        src: "**/*.css"
        dest: "public/stylesheets"
      other:
        expand: true
        flatten: false
        cwd: "src/copy-to-public"
        src: "**"
        dest: "public"

    clean:
      'before-build':
        src: 'public'
      'after-css':
        src: [
          'public/stylesheets/main*.css',
          'public/stylesheets/vendor'
        ]
      'after-js':
        src: [
          'public/javascript/modules',
          'public/javascript/vendor'
        ]

    concat:
      js:
        files:
          "public/javascript/all.js": [
            "public/javascript/vendor/jquery.min.js",
            "public/javascript/modules/*.js"
          ]
      css:
        files:
          "public/stylesheets/all.css": [
            "public/stylesheets/vendor/normalize.css",
            "public/stylesheets/vendor/html5bp-intro.css",
            "public/stylesheets/main.css",
            "public/stylesheets/vendor/html5bp-outro.css"
          ]

    uglify:
      options:
        banner: "/* <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss o\") %> */\n\n"
      main:
        files:
          "public/javascript/all.min.js": "public/javascript/all.js"

    stylus:
      main:
        options:
          compress: false
          linenos: true
          paths: ["src/stylesheets/stylus/blocks"]
        files:
          "public/stylesheets/main.unprefixed.css": "src/stylesheets/stylus/main.styl"

    cssmin:
      options:
        banner: "/* <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss o\") %> */\n\n"
        keepSpecialComments: 0
        keepBreaks: true
      main:
        files:
          "public/stylesheets/all.min.css": "public/stylesheets/all.css"

    autoprefixer:
      main:
        files:
          "public/stylesheets/main.css": "public/stylesheets/main.unprefixed.css"

    jade:
      main:
        options:
          pretty: true
        files:
          "public/index.html": "src/templates/index.jade"

    watch:
      jade:
        files: "src/templates/**"
        tasks: ["jade"]
      js:
        files: "src/javascript/**"
        tasks: ["js", "clean:after-js"]
      css:
        files: "src/stylesheets/**"
        tasks: ["css", "clean:after-css"]
      'copy-other':
        files: "src/copy-to-public/**"
        tasks: ["copy:other"]
  )

  require("load-grunt-tasks")(grunt)

  grunt.registerTask "js", ["coffee", "copy:js", "concat:js", "uglify"]
  grunt.registerTask "css", ["copy:css", "stylus", "autoprefixer", "concat:css", "cssmin"]
  grunt.registerTask "default", [
    "clean:before-build",
    "jade", "js", "css", "copy:other",
    "clean:after-css", "clean:after-js"]
