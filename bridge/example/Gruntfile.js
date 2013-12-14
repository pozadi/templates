module.exports = function(grunt) {

  grunt.initConfig({
    bridge: {
      options: {
        copyTo: 'public/',
        removePrefix: '_public/',
        urlPrefix: '/'
      },
      foo: {
        files: {
          'foo.html': [
            '_public/css/foo.css',
            '_public/javascript/*'
          ]
        }
      },
      bar: {
        files: [
          {src: '_public/**', dest: 'bar1.html', filter: 'isFile'},
          {src: '_public/css/*', dest: 'bar2.html', filter: 'isFile'}
        ]
      }
    }
  });

  grunt.loadTasks('../tasks');

};
