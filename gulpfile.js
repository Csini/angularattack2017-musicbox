var gulp = require('gulp');

// include plug-ins
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var templateCache = require('gulp-angular-templatecache');
var gulpCopy = require('gulp-copy');
var clean = require('gulp-clean');
var mainBowerFiles = require('gulp-main-bower-files');

/*
 * Compile SASS files into CSS and combine
 * into a single file, optimized for production
 */

var sass_files = [
    './src/css/bootstrap/css/bootstrap.min.css',
    './src/css/palette.scss',
    './src/css/app.scss',
    './src/pages/**/*.scss' // include all individual page styles
]

gulp.task('sass', function() {
    console.log("Compiling SAAS...");
    gulp.src(sass_files)
        .pipe(concat("app.min.css"))
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist'));
});

gulp.task('bowerfiles', function(){
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles( ))
        .pipe(concat("lib.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});


gulp.task('clean', function () {
    return gulp.src('./dist', {read: false})
        .pipe(clean());
});

/*
 * Combine all js files into single minified file
 * optimized for production
 */

var js_files = [
    './src/js/app.js',
    './src/pages/**/*.js', // include all pages
    './src/services/*.js' // include all services
];

gulp.task('scripts', function() {

    console.log("Gulping JS...");

    gulp.src(js_files)
        .pipe(concat("app.min.js"))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest("./dist/"));

});


gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(templateCache({module : 'musicbox'}))
        .pipe(gulp.dest('./dist/'));
});



gulp.task('index', function() {
    return gulp
        .src('./index.html')
        .pipe(gulpCopy('./dist'));
});

//gulp clean & gulp index & gulp bowerfiles & gulp html & gulp sass & gulp scripts
gulp.task('default', [ 'index', 'bowerfiles', 'html', 'sass', 'scripts' ]);
