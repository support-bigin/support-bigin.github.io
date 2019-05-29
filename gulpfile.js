var gulp = require('gulp');
var runSequence = require('run-sequence');
var rimraf = require('rimraf');
var openURL = require('open');
var connect = require('gulp-connect');

var browserSync = require('browser-sync').create();

gulp.task('server', function () {
    browserSync.init({
        server: {
            // baseDir: ["./pages", "./js", "./images", "./css"],
            baseDir: ["./"],
        },
        port:4200
    });

    gulp.watch("js/*.js").on('change', browserSync.reload);
    gulp.watch("pages/*.html").on('change', browserSync.reload);
});