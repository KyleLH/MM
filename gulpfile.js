var jshint = require("gulp-jshint");
var scsslint = require("gulp-scss-lint");
var gulp = require("gulp");
var scss = require("gulp-scss");
var autoprefixer = require("gulp-autoprefixer");
var nodemon = require("gulp-nodemon");

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
    .pipe(autoprefixer({
      browsers: [ 'last 2 versions' ],
      cascade: false
    }))
    .pipe(gulp.dest("./public/assets/css"));
});

gulp.task("lint", [ "lint:scss", "lint:js" ]);

gulp.task("build", [ "scss" ]);

gulp.task("nodemon", function () {
  return nodemon({
    script: "app.js",
    ext: "scss js html",
    env: { "NODE_ENV": "development" },
    tasks: [ "lint", "build" ]
  });
});

gulp.task("default", [ "lint:js", "lint:scss", "scss", "nodemon" ]);

