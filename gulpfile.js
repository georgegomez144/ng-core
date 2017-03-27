
// APPLICATION NAME
var appName = 'ng-core';

// APPLICATION BUILD METHODS
var dist = 'dist/';
var distCss = dist + 'css/';
var distJs = dist + 'js/';

var temp = 'temp/';
var tempCss = temp + 'css/';
var tempJs = temp + 'js/';


// ###########################################################
// ###########  Begin Application Build ######################
// ###########################################################


// Include gulp
var gulp = require('gulp');

// Include Plugins
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var jshint2 = require('jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var rename = require('gulp-rename');
var del = require('del');


// SERVER METHODS
const HOST = 'localhost';
const PORT = 7410;
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            host: HOST,
            port: PORT,
            directoryListing: { enable: false, path: './' },
            livereload: true,
            open: true,
            fallback: 'index.html'
        }));
});

// Lint Task
var jsDir = 'js/';
gulp.task('lint', function () {
    return gulp.src(jsDir + '**/*.js')
        .pipe(jshint({laxcomma: true}))
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', ['corejs'], function () {
    return gulp.src(jsDir + '**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest(tempJs))
        .pipe(sourcemaps.init({largeFile: true}))
        .pipe(rename(appName + '.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distJs));
});

gulp.task('corejs',function() {
    return gulp.src([
        'libs/angular/1.5.8/angular.min.js',
        'libs/angular/1.5.8/angular-route.min.js',
        'libs/angular/1.5.8/angular-animate.min.js',
        'libs/angular/1.5.8/angular-aria.min.js',
        'libs/angular/1.5.8/angular-cookies.min.js',
        'libs/angular/1.5.8/angular-messages.min.js',
        'libs/angular/1.5.8/angular-sanitize.min.js',
        'libs/angular-material/1.1.1/angular-material.min.js',
        'libs/sha1/sha1.js'
    ])
        .pipe(sourcemaps.init({largeFile: true}))
        .pipe(concat('angular-concat.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(distJs));
});

// Compile Our Sass
var sassDir = 'scss/';
gulp.task('sass', function () {
    return gulp.src(sassDir + '*.scss')
        .pipe(sass())
        .pipe(gulp.dest(tempCss));
});

// Minify CSS
gulp.task('css-uglify', ['sass'], function () {
    gulp.src(temp + 'css/*.css')
        .pipe(uglifycss({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(rename(appName + '.min.css'))
        .pipe(gulp.dest(distCss));
});


/*
 ================================================
 ============= Clean temp folder ================
 */
var tempAllCss = temp + 'css/**/*.css';
var tempAllJs = temp + 'js/**/*.js';
gulp.task('clean:temp', ['scripts', 'css-uglify'], function () {
    del(temp);
});
/*
 ================================================
 ================================================
 */







// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch(jsDir + '**/*.js', ['lint', 'clean:temp']);
    gulp.watch(sassDir + '**/*.scss', ['sass', 'clean:temp']);
});

// Default Task
gulp.task('Gulpify', ['lint', 'clean:temp']);
// Developing Task
gulp.task('default', ['Gulpify', 'watch']);
// Developing & Server Task
gulp.task('serve', ['Gulpify', 'watch', 'webserver']);