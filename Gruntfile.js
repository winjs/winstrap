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
      css: ['./dist/css/winstrap.min.css']
    },

    sass: {
        options: {
          outputStyle: 'nested',
          sourceMap: true,
          precision: 5,
          includePaths: [
              "node_modules"
          ]
        },
        dist: {
          files: {
            './dist/css/winstrap.css': './src/scss/winstrap.scss',
            './dist/css/winstrap-optional.css': './src/scss/winstrap-optional.scss'
          }
        }
    },
    
    //  Minify CSS
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './dist/css',
          src: ['*.css', '!*.min.css'],
          dest: './dist/css/',
          ext: '.min.css'
        }]
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
          },
          {
            expand: true,
            cwd: './src/images/',
            src: '*',
            dest: './dist/images/'
          },
          
          //  Copy vendor js to dist and www
          {
            expand: true,
            cwd: 'node_modules/jquery/dist/',
            src: ['jquery.min.js', 'jquery.min.map'],
            dest: 'dist/js/vendor/'
          },
          {
            expand: true,
            cwd: 'node_modules/bootstrap-sass/assets/javascripts/',
            src: 'bootstrap.min.js',
            dest: 'dist/js/vendor/'
          },
          {
            expand: true,
            cwd: 'dist/js/vendor',
            src: ['jquery.min.js', 'jquery.min.map'],
            dest: 'www/js/vendor/'
          },
          {
            expand: true,
            cwd: 'dist/js/vendor',
            src: 'bootstrap.min.js',
            dest: 'www/js/vendor/'
          },
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
            cwd: './dist/css',
            src: ['*.min.css', '*.min.css.map'],
            dest: './www/css/'
          },
          {
            expand: true,
            cwd: './src/js/',
            src: '*.js',
            dest: './www/js/'
          },
          {
            expand: true,
            cwd: './dist/js/vendor/',
            src: ['*.js', '*.map'],
            dest: './www/js/vendor/'
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
      cssmin: {
        files: ['./dist/css/**.css', '!./dist/css/**.min.css'],
        tasks: ['cssmin', 'copy:doc']
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-file-exists');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('default', ['clean', 'sass', 'cssmin', 'assemble', 'copy', 'fileExists', 'jshint']);
  grunt.registerTask('server', ['connect', 'notify:server', 'watch']);
};
