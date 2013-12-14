var crypto = require('crypto');

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

module.exports = function(grunt) {

  grunt.registerMultiTask('bridge', function() {

    var options = this.options({
      copyTo: 'public/',
      removePrefix: '',
      urlPrefix: ''
    });

    this.files.forEach(function(files) {

      var sources = files.src.map(function(origPath) {
        var fileSource = grunt.file.read(origPath)
          , hashSum = crypto.createHash('md5').update(fileSource).digest('hex')
          , basePath = origPath
                        .replace(new RegExp("^" + escapeRegExp(options.removePrefix)), '')
                        .replace(/\.[^.]+$/, '')
          , extension = /\.[^.]+$/.exec(origPath)[0]
          , copyPath = options.copyTo + basePath + '.' + hashSum + extension
          , urlPath = options.urlPrefix + basePath + '.' + hashSum + extension;

        return [origPath, copyPath, urlPath, extension];
      });

      sources.forEach(function(data) {
        grunt.file.copy(data[0], data[1]);
        grunt.log.writeln(data[0] + ' copied to ' + data[1]);
      });

      var htmlFileSource = sources.map(function(data) {
        return {
          '.css': '<link rel="stylesheet" type="text/css" href="{path}">',
          '.js': '<script src="{path}"></script>'
        }[data[3]].replace('{path}', data[2]);
      }).join('\n');

      grunt.file.write(files.dest, htmlFileSource);
      grunt.log.writeln(files.dest + ' written');
    });

  });

}
