const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');
const sourceMaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin'); // старая версия
const changed = require('gulp-changed'); // старая версия

gulp.task('clean:dev', function (done) {
  if (fs.existsSync('./build/')) {
    return gulp.src('./build/', { read: false }).pipe(clean({ force: true }));
  }
  done();
});

const fileIncludeSettings = {
  prefix: '@@',
  basepath: '@file',
};

const plumberNotify = (title) => {
  return {
    errorHandler: notify.onError({
      title: title,
      message: 'Error <%= error.message %>',
      sound: false,
    }),
  };
};

gulp.task('html:dev', function () {
  return gulp
    .src(['./src/html/**/*.html', '!./src/html/blocks/*.html'])
    .pipe(changed('./build/', { hasChanged: changed.compareContents }))
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileInclude(fileIncludeSettings))
    .pipe(gulp.dest('./build/'));
});

gulp.task('sass:dev', function () {
  return (
    gulp
      .src('./src/scss/*.scss')
      .pipe(changed('./build/css/'))
      .pipe(plumber(plumberNotify('SCSS')))
      .pipe(sourceMaps.init())
      //.pipe(sassGlob())
      .pipe(sass())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest('./build/css/'))
  );
});

gulp.task('images:dev', function () {
  return gulp
    .src('./src/img/**/*')
    .pipe(changed('./build/img/'))
    //.pipe(imagemin({verbose: true}))
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('fonts:dev', function () {
  return gulp
    .src('./src/fonts/**/*')
    .pipe(changed('./build/fonts/'))
    .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('files:dev', function () {
  return gulp
    .src('./src/files/**/*')
    .pipe(changed('./build/files/'))
    .pipe(gulp.dest('./build/files/'));
});

gulp.task('js:dev', function () {
  return gulp
    .src('./src/js/*.js')
    .pipe(changed('./build/js/'))
    .pipe(plumber(plumberNotify('JS')))
    //.pipe(babel())
    .pipe(webpack(require('./../webpack.config.js')))
    .pipe(gulp.dest('./build/js/'));
});

const serverOptions = {
  livereload: true,
  open: true,
};

gulp.task('server:dev', function () {
  return gulp
    .src('./build/')
    .pipe(server(serverOptions));
});

const { watch, parallel } = require('gulp');

gulp.task('watch:dev', function () {
  watch('./src/scss/**/*.scss', parallel('sass:dev'));
  watch('./src/**/*.html', parallel('html:dev'));
  watch('./src/img/**/*', parallel('images:dev'));
  watch('./src/fonts/**/*', parallel('fonts:dev'));
  watch('./src/files/**/*', parallel('files:dev'));
  watch('./src/js/**/*.js', parallel('js:dev'));
});
