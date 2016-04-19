
// =========================================================================

gulp.task('img', function () {
  return gulp.src('./src/img/**/*.*')
    .pipe(gulp.dest('./dist/img'));
});

var less = require('gulp-less'),
     path = require('path');
 
gulp.task('less', function () {
  return gulp.src('./src/less/.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./src/css'));
});