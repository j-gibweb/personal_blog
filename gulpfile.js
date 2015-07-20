var gulp  = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

gulp.task('es6to5', function () {
    var stream = gulp.src('lib/es6/**/*.js')
      .pipe(babel({experimental: true}))
      .on('error', handleBabelErrors)
    	.pipe(concat('all.js'))
      .pipe(gulp.dest('dist'));

    return stream;
});


gulp.task('watch', function() {
	gulp.watch('./lib/es6/**/*.js', ['es6to5']);
});

gulp.task('default', ['watch']);


function handleBabelErrors(err) {
  console.log("\n\nERROR: YOU DONE GOOFED\n\n", err.fileName, err.loc, "\n\n\n" , err, "\n\n\n");
  this.end();
  gulp.task('default', ['watch']);
}
