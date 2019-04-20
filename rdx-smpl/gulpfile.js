var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
    return browserify('./src/app.js')
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('copy', function () {
    return gulp.src('./build/app.js').pipe(gulp.dest('../../../'));
  });

gulp.task('default', ['build'/*, 'copy'*/]);
