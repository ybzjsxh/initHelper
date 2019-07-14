'use strict';

const gulp = require('gulp');
// const browserify = require('browserify');
// const fs = require('fs');
// const source = require('vinyl-source-stream');
// const buffer = require('vinyl-buffer');
const $ = require('gulp-load-plugins')();

// const isProd = process.env.NODE_ENV === 'production';

gulp.task('default', () => {
  return gulp.src(['index.js'])
    .pipe($.babel())
    // .pipe(browserify({entries: 'index.js', debug: true}))
    // .bundle()
    // .pipe(source('./index.js'))
    // .pipe(buffer())
    .pipe($.uglify())
    .on('error', (err) => {
      $.util.log($.util.colors.red('[Error]'), err.toString());
    })
    .pipe($.rename({extname: '.min.js'}))
    .pipe(gulp.dest('./build/js'))
})
