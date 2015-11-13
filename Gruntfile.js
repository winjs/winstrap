module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      options: {
        force: true
      },
      all: ['dist/']
    },

    fileExists: {
      css: ['dist/css/winstrap.css']
    },

    sass: {
      options: {
        outputStyle: 'nested',
        sourceMap: true,
        precision: 5,
        includePaths: [
            "bower_components"
        ]
      },
      dist: {
        files: {
          'dist/css/winstrap.css': 'src/scss/winstrap.scss'
        }
      }
    },

    // Copy doc files
    copy: {
      assets: {
        files: [
        {
          expand: true,
          cwd: 'src/fonts/',
          src: '**',
          dest: 'dist/fonts/'
        },
        {
          expand: true,
          cwd: 'src/images/',
          src: '*',
          dest: 'dist/images/'
        }
        ]
      },
      doc: {
        files: [
        {
          expand: true,
          cwd: 'src/js/',
          src: '*.js',
          dest: 'dist/js/'
        },
        {
          expand: true,
          cwd: 'bower_components/jquery/dist/',
          src: ['jquery.min.js', 'jquery.min.map'],
          dest: 'dist/js/vendor/'
        },
        {
          expand: true,
          cwd: 'bower_components/bootstrap-sass/assets/javascripts/',
          src: 'bootstrap.min.js',
          dest: 'dist/js/vendor/'
        }
        ]
      }
    },

    // Build the main HTML file of the style guide
    assemble: {
      options: {
        partials: ['src/doc/partials/**/*.hbs'],
        layout: ['src/doc/layouts/default.hbs'],
        helpers: ['handlebars-helpers/*.js'],
        flatten: true,
        data: 'src/doc/data/*.json',

        // Set the version number
        version: '<%= pkg.version %>',

        // Name of the project
        name: '<%= pkg.name %>',
      },
      pages: {
        src: ['src/doc/*.hbs'],
        dest: './dist/'
      }
    },

    watch: {
      sass: {
        files: 'src/scss/**/*.scss',
        tasks: ['sass']
      },

      doc: {
        files: ['src/doc/**/*', 'src/js/*.js'],
        tasks: ['jshint', 'assemble', 'copy:doc']
      },
      configFiles: {
        files: ['gruntfile.js'],
        options: {
          reload: true
        }
      },
      options: {
        livereload: true,
        tasks: ['notify:assemble']
      }
    },

    connect: {
      server: {
        options: {
          port: 9001,
          base: ['./', './dist/'],
          hostname: 'localhost',
          livereload: true,
          open: true
        }
      }
    },

    bump: {
      options: {
        files: ['package.json'],
        commit: true,
        commitMessage: 'Release version %VERSION%',
        commitFiles: ['package.json'],
        updateConfigs: ['pkg'],
        createTag: true,
        tagName: '%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },
    notify: {
      server: {
        options: {
          title: 'Winstrap',
          message: 'Server started'
        },
      },
      watch: {
        options: {
          title: 'Winstrap',
          message: 'assemble completed', //required
        }
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      all: ['gruntfile.js', 'src/js/**/*']
    }
  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-file-exists');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['clean', 'sass', 'assemble', 'copy', 'fileExists', 'jshint']);
  grunt.registerTask('server', ['connect', 'notify:server', 'watch']);

};
