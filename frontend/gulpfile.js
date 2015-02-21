/*
gulpfile.js
gulp task runner for angular BeersApp

Copyright (c) 2015

Patrick Crager

*/

// required modules
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css');

// lint task
gulp.task('lint', function() {
    return gulp.src('js/*.js').
        pipe(jshint()).
        pipe(jshint.reporter('default'));
});

// concat & minify js task
gulp.task('scripts', function() {
    return gulp.src([
            'js/vendor/angular-1.2.26.min.js',
            'js/vendor/angular-route.min.js',
            'js/vendor/angular-touch.min.js',
            'js/vendor/jquery-1.11.0.min.js',
            'js/vendor/bootstrap-3.2.0.min.js',
            'js/vendor/ui-bootstrap-custom-tpls-0.12.0.min.js',
            'js/app.js',
            'js/services.js',
            'js/controllers.js'
        ]).
        pipe(concat('beersapp.js')).
        pipe(gulp.dest('release/js')).
        pipe(rename('beersapp.min.js')).
        pipe(uglify({
            mangle: false
        })).
        pipe(gulp.dest('release/js'));
});

// concat & minify css task
gulp.task('css', function() {
    return gulp.src([
            'css/vendor/SourceSansPro.css',
            'css/vendor/bootstrap-3.2.0.min.css',
            'css/main.css'
        ]).
        pipe(concat('beersapp.css')).
        pipe(gulp.dest('release/css')).
        pipe(rename('beersapp.min.css')).
        pipe(minifyCSS({
            keepSpecialComments: 0,
            processImport: false
        })).
        pipe(gulp.dest('release/css'));
});

// copy glyphicon font files
gulp.task('copyfonts', function() {
    return gulp.src('css/fonts/*.*').
       pipe(gulp.dest('release/fonts'));
});

// watch task
gulp.task('watch', function() {
    gulp.watch('js/**/*.js', ['lint', 'scripts']);
    gulp.watch('css/**/*.css', ['css']);
});

// default task
gulp.task('default', ['lint', 'scripts', 'css', 'copyfonts', 'watch']);
