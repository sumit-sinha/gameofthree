const gulp = require("gulp"),
      del = require("del"),
      fs = require("fs"),
      typescript = require("gulp-typescript"),
      sass = require('gulp-sass'),
      paths = {
        dist: 'static/app',
        distFiles: 'static/app/**/*',
        srcFiles: 'src/angular/**/*',
        srcTsFiles: 'src/angular/**/*.ts',
        srcSassFiles: 'src/angular/**/*.scss'
      }

gulp.task('clean', function () {
  return del(paths.distFiles);
});

gulp.task('copy:libs', ['clean'], function() {
  return gulp.src([
      'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
      'node_modules/@angular/core/bundles/core.umd.js',
      'node_modules/@angular/router/bundles/router.umd.js',
      'node_modules/@angular/compiler/bundles/compiler.umd.js',
      'node_modules/@angular/common/bundles/common.umd.js',
      'node_modules/@angular/http/bundles/http.umd.js',
      'node_modules/systemjs/dist/system.src.js',
      'node_modules/zone.js/dist/zone.min.js',
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/rxjs/util/*.js',
      'node_modules/rxjs/symbol/*.js',
      'node_modules/rxjs/operator/*.js',
      'node_modules/rxjs/observable/*.js',
      'node_modules/rxjs/add/operator/map.js',
      'node_modules/rxjs/add/operator/catch.js',
      'node_modules/rxjs/add/observable/throw.js',
      'node_modules/rxjs/*.js'
    ])
    .pipe(gulp.dest(function(file) {
      var separator = "/";
      if (file.path.indexOf(separator) === -1) {
        separator = "\\";
      }

      var destinationFile = file.path.replace("node_modules", paths.dist + separator + "node_modules"),
          destinationFolder = destinationFile.substring(0, destinationFile.lastIndexOf(separator));

      return destinationFolder;
    }));
});

gulp.task('sass:components', ['clean'], function () {
  return gulp.src(paths.srcSassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(function(file) {
      return paths.dist;
    }));
});


gulp.task('compile', ['clean'], function () {
  const tscConfig = JSON.parse(fs.readFileSync('./tsconfig.json', 'UTF8'));
  return gulp
    .src(tscConfig.files)
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('prepare', ['clean', 'compile', 'copy:libs', 'sass:components']);
gulp.task('default', ['prepare']);
