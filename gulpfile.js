var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var del = require('del');

// Development Tasks
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './'
    }
  })
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
  gulp.watch('./assets/js/**/*.js', browserSync.reload);

})

// Sass
gulp.task('sass', function () {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'));
})

// Dev mode

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})
