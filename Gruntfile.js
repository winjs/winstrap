module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    clean: {
      options: {
        force: true
      },
      all: ['./dist/', './www/']
    },

    fileExists: {
      css: ['./www/css/winstrap.min.css']
    },

    sass: {
      options: {
        outputStyle: 'compressed',
        sourceMap: true,
        precision: 5,
        includePaths: [
            "node_modules"
        ]
      },
      dist: {
        files: {
          './dist/css/winstrap.min.css': './src/scss/winstrap.scss',
          './dist/css/winstrap.css': './src/scss/winstrap.scss'
        }
      }
    },
    
    //  Uglify winstrap.js
    uglify: {
      winstrapjs: {
        options: {
          beautify: true
        },
        files:{
          './dist/js/winstrap.js': [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
            './src/js/winstrap.js'
          ]
        }
      },
      winstrapjs_min:{
        files: {
          './dist/js/winstrap.min.js': [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
            './src/js/winstrap.js'
          ]
        }
      }
    },

    // Copy files
    copy: {
      //  Copy distribution assets from src folder to dist
      dist:{
        files:[
          {
            expand: true,
            cwd: './src/fonts/',
            src: '**',
            dest: './dist/fonts/'
          }
        ]
      },
      //  Copy assets from src folder to www
      assets: {
        files: [
        {
          expand: true,
          cwd: './src/fonts/',
          src: '**',
          dest: './www/fonts/'
        },
        {
          expand: true,
          cwd: './src/images/',
          src: '*',
          dest: './www/images/'
        }
        ]
      },
      //  Copy css and js from dist to www
      doc: {
        files: [
          {
            expand: true,
            cwd:'./dist/css',
            src: ['*.min.css', '*.min.css.map'],
            dest: './www/css/'
          },
          {
            expand: true,
            cwd: './dist/js/',
            src: '*.min.js',
            dest: './www/js/'
          }
        ]
      }      
    },

    // Build the main HTML files of the style guide
    assemble: {
      options: {
        partials: ['./src/doc/partials/**/*.hbs'],
        layout: ['./src/doc/layouts/default.hbs'],
        helpers: ['./handlebars-helpers/*.js'],
        flatten: true,
        data: './src/doc/data/*.json',

        // Set the version number
        version: '<%= pkg.version %>',

        // Name of the project
        name: '<%= pkg.name %>',
      },
      pages: {
        src: ['./src/doc/*.hbs'],
        dest: './www/'
      }
    },
    // Watch javascript and css files of the style guide
    watch: {
      sass: {
        files: './src/scss/**/*.scss',
        tasks: ['sass']
      },
      doc: {
        files: ['./src/doc/**/*', './src/js/*.js'],
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
          base: ['./', './www/'],
          hostname: 'localhost',
          livereload: true,
          open: true
        }
      }
    },

    bump: {
      options: {
        files: ['./package.json'],
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
      all: ['./gruntfile.js', './src/js/**/*']
    }
  });

  grunt.loadNpmTasks('grunt-assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-file-exists');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['clean', 'sass', 'assemble','uglify','copy', 'fileExists', 'jshint']);
  grunt.registerTask('server', ['connect', 'notify:server', 'watch']);
};