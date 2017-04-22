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
var ngAnnotate = require('gulp-ng-annotate');
var runSequence = require('run-sequence');
var gulpFilter = require('gulp-filter');
var debug = require('gulp-debug');

/*
 * Compile SASS files into CSS and combine
 * into a single file, optimized for production
 */



gulp.task('sass', function() {

  var sass_files = [
      './src/css/bootstrap/css/bootstrap.min.css',
      './src/css/palette.scss',
      './src/css/app.scss',
      './src/pages/**/*.scss' // include all individual page styles
  ]
    console.log("Compiling SAAS...");
    return gulp.src(sass_files)
        .pipe(concat("app.min.css"))
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist'));
});

gulp.task('bowerfilesjs', function(){
    var filterJS = gulpFilter('**/*.js');
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles( ))
        .pipe(filterJS)
        //.pipe(debug({title: 'bowerfiles-js:'}))
        .pipe(concat("lib.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

gulp.task('bowercss', function(){
    var filterCSS = gulpFilter('**/*.scss');
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles( ))
        .pipe(filterCSS)
        .pipe(debug({title: 'bowerfiles-css:'}))
        .pipe(concat("lib.min.css"))
        .pipe(sass())
        .pipe(cleanCSS())
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


gulp.task('scripts', function() {

  var js_files = [
      './src/musicbox.js',
      './src/musicbox.routes.js',
      './src/**/*.js', // include all pages
  ];
    console.log("Gulping JS...");

    return gulp.src(js_files)
        .pipe(concat("app.min.js"))
        .pipe(stripDebug())
        .pipe(ngAnnotate())
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
gulp.task('build', runSequence('clean',
              [ 'index', 'bowerfilesjs','bowercss', 'html', 'sass', 'scripts' ]));
