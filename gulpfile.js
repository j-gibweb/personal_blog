var gulp  = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var react = require('gulp-react');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");


gulp.task('build', function () {
    var stream = gulp.src('./public/js/dist/app.js')
      // .pipe(sourcemaps.init())
      // .pipe(babel({experimental: true}))
      // .on('error', handleBabelErrors)
      // .pipe(react())
      .pipe(concat('bundle.js'))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./public/js/dist/'))

    return stream;
});


gulp.task("webpack", function(callback) {
    // run webpack
    webpack({
      entry: "./public/js/react/app.jsx",
      module: {
        loaders: [
          {test: /.jsx$/, loader: 'jsx-loader'}
        ],
      },
      output: {
        path: "public/js/dist/",
        filename: "app.js",
      },
      stats: {
        // Configure the console output
        colors: true,
        modules: true,
        reasons: true
      },
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
          // output options
        }));
        callback();
    });
});



gulp.task('watch', function() {
	gulp.watch(['./public/js/**/*', '!./public/js/dist/*'], ['webpack']);
});

gulp.task('default', ['watch']);


function handleBabelErrors(err) {
  console.log("\n\nERROR: YOU DONE GOOFED\n\n", err.fileName, err.loc, "\n\n\n" , err, "\n\n\n");
  this.end();
  gulp.task('default', ['watch']);
}
