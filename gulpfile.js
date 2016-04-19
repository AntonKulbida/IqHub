'use strict';
var gulp = require('gulp');
var sass = require('gulp-less');
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var htmlmin = require('gulp-htmlmin');
var image = require('gulp-image');
var gulpif = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var revReplace = require('gulp-rev-replace');
// var browserSync = require('browser-sync');


gulp.task('index:dist', function(){
	return gulp.src('./src/index.html')
		   .pipe(useref())
		   .pipe(gulpif('*.css', minifyCss()))
		   .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true, removeComments: true}))
		   .pipe(gulpif('*.css', rev()))
		   .pipe(revReplace())

		   .pipe(gulp.dest('./dist'))
})

	gulp.task('img:dist', function () {
  return gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./dist/img'));
});


	gulp.task('fonts:dist', function(){
	return gulp.src('./src/fonts/*.*')
		   .pipe(gulp.dest('./dist/fonts'))
})

	gulp.task('fontawesome:dist', function(){
	return gulp.src('./src/components/font-awesome/fonts/*.*')
		   .pipe(gulp.dest('./dist/fonts'))
})

	gulp.task('less', function () {
  return gulp.src('./src/less/main.less')
    .pipe(less().on('error', less.logError))
    .pipe(gulp.dest('./src/css'));
});

	gulp.task('dist', function (cb) {
  runSequence('less', 'index:dist', 'img:dist', 'fonts:dist', 'fontawesome:dist', cb);
});

gulp.task('less:watch', function () {
  gulp.watch('./src/less/**/*.less', ['less']);
});

gulp.task('watch', function(cb){
	runSequence('less', 'less:watch', cb);
});
