var gulp  = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var react = require('gulp-react');

// var path = {
//   HTML: 'src/index.html',
//   ALL: ['src/js/*.js', 'src/js/**/*.js', 'src/index.html'],
//   JS: ['src/js/*.js', 'src/js/**/*.js'],
//   MINIFIED_OUT: 'build.min.js',
//   DEST_SRC: 'dist/src',
//   DEST_BUILD: 'dist/build',
//   DEST: 'dist'
// };




gulp.task('compileJSX', function () {
    var stream = gulp.src('./public/js/react/**/*')
      // .pipe(sourcemaps.init())
      // .pipe(babel({experimental: true}))
      // .on('error', handleBabelErrors)
      .pipe(react())
      // .pipe(sourcemaps.write('.'))
    	.pipe(concat('bundle.js'))
      .pipe(gulp.dest('./public/js/'));

    return stream;
});


gulp.task('watch', function() {
	gulp.watch('./public/js/**/*', ['compileJSX']);
});

gulp.task('default', ['watch']);


function handleBabelErrors(err) {
  console.log("\n\nERROR: YOU DONE GOOFED\n\n", err.fileName, err.loc, "\n\n\n" , err, "\n\n\n");
  this.end();
  gulp.task('default', ['watch']);
}
