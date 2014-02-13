# Initial setup

1. Create `package.json` to hold npm dependencies

        npm init
    
2. Install some inital dependencies

        npm install coffee-script --save-dev
        npm install grunt --save-dev
        npm install load-grunt-tasks --save-dev
    
2. Create `Gruntfile.coffee` with following content

        module.exports = (grunt) ->

          grunt.initConfig(
          
          )
        
          require("load-grunt-tasks")(grunt)

          grunt.registerTask "default", []
      
      
# Snippets

## Compile CoffeeScript file to file

1. Install plugin

        npm install grunt-contrib-coffee --save-dev


2. Add to `initConfig()`

        coffee:
          main:
            options:
              bare: true
            expand: true
            flatten: false
            cwd: "src/javascript"
            src: "**/*.coffee"
            dest: "tmp/javascript"
            ext: ".js"



    
    
