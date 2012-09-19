/*global module:false*/
var markdown = require('markdown');
var fs = require('fs');
var jsdom = require('jsdom');

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      files: ['grunt.js', 'lib/**/*.js', 'test/**/*.js']
    },
    test: {
      files: ['test/**/*.js']
    },
    watch: {
      files: 'slides.md',
      tasks: 'process'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        jQuery: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'lint test');

  grunt.registerTask('process', function() {
    jsdom.env(
      markdown.markdown.toHTML(fs.readFileSync('slides.md')),
      [ 'http://code.jquery.com/jquery-1.8.1.min.js' ],
      function(err, window) {
        if (err) {
          throw err;
        }
        var $ = window.jQuery;
        $('h2').each(function() {
          console.log(this);
        });
      }
    );
  });

};
