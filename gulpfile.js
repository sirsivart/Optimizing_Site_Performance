"use strict";

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    maps = require('gulp-sourcemaps'),
    del = require('del'),
    clean = require('gulp-clean-css');

gulp.task("concatScripts", function() {
		gulp.src([
            'js/jquery.js',
            'js/fastclick.js',
            'js/foundation.js',
            'js/foundation.equalizer.js',
            'js/foundation.reveal.js',
            'js/scripts.js'
        ])
        .pipe(maps.init())
        .pipe(concat('app.js'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('js'));

        return gulp.src([
  	'css/normalize.css',
  	'css/foundation.css',
  	'css/basics.css',
  	'css/menu.css',
  	'css/hero.css',
  	'css/photo-grid.css',
  	'css/modals.css',
  	'css/footer.css'
  	])
        .pipe(maps.init())
        .pipe(concat('app.css'))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'));
});

gulp.task("minifyScripts", ['concatScripts'], function() {
   return gulp.src("js/app.js")
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('js'));
});

// gulp.task("concatScripts", function() {
//     return gulp.src([
//   	'css/normalize.css',
//   	'css/foundation.css',
//   	'css/basics.css',
//   	'css/menu.css',
//   	'css/hero.css',
//   	'css/photo-grid.css',
//   	'css/modals.css',
//   	'css/footer.css'
//   	])
//         .pipe(maps.init())
//         .pipe(concat('app.css'))
//         .pipe(maps.write('./'))
//         .pipe(gulp.dest('css'));
// });

gulp.task('minify-css', ['concatScripts'], () => {
   return gulp.src(["css/app.css"])
    .pipe(clean())
    .pipe(rename('app.min.css'))
    .pipe(gulp.dest('css'));
});

gulp.task("build", ['minifyScripts', 'minify-css'], function() {
    return gulp.src(["css/app.min.css", "js/app.min.js", 'index.html',
            "img/**"
        ], {
            base: './'
        })
        .pipe(gulp.dest('dist'));
});

gulp.task("default", ["build"]);