var jshint = require("gulp-jshint");
var gulp = require("gulp");
var scsslint = require("gulp-scss-lint");
var scss = require("gulp-scss");

var paths = {
  js: "./public/assets/js/**/*.js",
  scss: "./public/assets/scss/**/*.scss"
};

gulp.task("lint:js", function () {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task("lint:scss", function () {
  return gulp.src(paths.scss)
    .pipe(scsslint());
});

gulp.task("scss", function () {
  return gulp.src(paths.scss)
    .pipe(scss())
    .pipe(gulp.dest("./public/assets/css"));
});

gulp.task("watch", function () {
  gulp.watch(paths.js, [ "lint:js" ]);
  gulp.watch(paths.scss, [ "lint:scss", "scss" ]);
});

gulp.task("default", [ "lint:js", "lint:scss", "scss", "watch" ]);

