'use strict';

var gulp = require('gulp');
var del = require('del');

// Load plugins
var _ = require('gulp-load-plugins')();

// Javascripts
gulp.task('scripts', function() {
  return gulp.src('src/**/*.js')
  .pipe(_.jshint('.jshintrc'))
  .pipe(_.jshint.reporter('jshint-stylish'))
  .pipe(_.jshint.reporter('fail'))
  .pipe(_.size({ showFiles: true }))
  .pipe(_.umd({ templateName: 'amdCommonWeb' }))
  .pipe(_.banner(getBanner(), { pkg: require('./package.json') }))
  .pipe(gulp.dest('dist'))
  .pipe(_.uglify())
  .pipe(_.rename({ suffix: '.min' }))
  .pipe(_.size({ showFiles: true }))
  .pipe(gulp.dest('dist'));
});

// Tests
gulp.task('test', function() {
  return gulp.src('test/trellis.html')
  .pipe(_.qunit());
});

// Clean
gulp.task('clean', function() {
  return del(['dist/scripts']);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('test');
  gulp.start('scripts');
});

// Watch
gulp.task('watch', ['scripts'], function() {

  // Watch .js files
  gulp.watch('src/**/*.js', ['scripts']);
});

function getBanner() {
  return [
    '/**',
    ' * <%= pkg.name %> <%= pkg.version %>',
    ' * <%= pkg.description %>',
    ' *',
    ' * Copyright (c) 2014 - <%= new Date().getFullYear() %> <%= pkg.author.name %>',
    ' * Licensed under the <%= pkg.license %> license.',
    ' */',
    ''
  ].join('\n');
}
