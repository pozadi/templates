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
            
            
            
## Compile Stylus file to file, but not recursively

1. Install plugin

        npm install grunt-contrib-stylus --save-dev


2. Add to `initConfig()`

        stylus:
          main:
            options:
              compress: false
              linenos: true
            expand: true
            cwd: "src/stylesheets/stylus"
            src: "*.styl"
            dest: "tmp/stylesheets-unprefixed"
            ext: ".css"
            
            
            
## Compile LESS file to file, but not recursively

1. Install plugin

        npm install grunt-contrib-less --save-dev


2. Add to `initConfig()`

        less:
          main:
            expand: true
            cwd: "src/stylesheets/less"
            src: "*.less"
            dest: "tmp/stylesheets-unprefixed"
            ext: ".css"
            
            
            
            
## Add vendor prefixes with Autoprefixer

1. Install plugin

        npm install grunt-autoprefixer --save-dev


2. Add to `initConfig()`

        autoprefixer:
          main:
            expand: true
            cwd: "tmp/stylesheets-unprefixed"
            src: "*.css"
            dest: "tmp/stylesheets"
            ext: ".css"
            


## Copy js/css that not need to be compiled (file to file)

1. Install plugin

        npm install grunt-contrib-copy --save-dev


2. Add to `initConfig()`

        copy:
          js:
            expand: true
            flatten: false
            cwd: "src/javascript"
            src: "**/*.js"
            dest: "tmp/javascript"
          css:
            expand: true
            flatten: false
            cwd: "src/stylesheets"
            src: "**/*.css"
            dest: "tmp/stylesheets"
            
            

## Copy some other files

1. Install plugin

        npm install grunt-contrib-copy --save-dev


2. Add to `copy` section of `initConfig()`

        copy:
          other:
            expand: true
            flatten: false
            cwd: "src/copy-to-public"
            src: "**"
            dest: "public"
            
            
            
## Compile Jade templates file to file, but not recursively

1. Install plugin

        npm install grunt-contrib-jade --save-dev


2. Add to  `initConfig()`

        jade:
          main:
            options:
              pretty: true
              data:
                foo: 'bar'
            expand: true
            cwd: "src/templates"
            src: "*.jade"
            dest: "public"
            ext: ".html"




## Clean

1. Install plugin

        npm install grunt-contrib-clean --save-dev


2. Add to  `initConfig()`

        clean:
          'before-build':
            src: ['public', 'tmp']



## Setup development web server

1. Install plugin

        npm install grunt-contrib-connect --save-dev


2. Add to `initConfig()`

        connect:
          main:
            options:
              port: 8042
              base: 'public'
              hostname: '*'
              open: true
              keepalive: true


    
    
