var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');


var processor = [
    require('precss'),
    require('rucksack-css'),
    require('autoprefixer')({browsers: ['last 3 versions']}),
    require('css-mqpacker'),
    require('cssnano')
];

var cssDependency = [
    './node_modules/bootstrap/dist/fonts/*.*',
    './node_modules/font-awesome/fonts/*.*'
];

gulp.task('css', function () {

    var postcss = require('gulp-postcss');
    return gulp.src('src/**/style.css')
        .pipe(postcss(processor))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));
});

gulp.task('move', function(){
    gulp.src(cssDependency)
        .pipe(gulp.dest('build/fonts')
    );
});

gulp.task('img', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('html', function(){
    gulp.src('./*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('serve',  function () {

    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });

    gulp.watch("src/css/**/*.css", ['css', 'img']);
    gulp.watch("*.html", ['html', 'img']).on('change', reload);
    gulp.watch("src/js/**/*.js", ['scripts']).on('change', reload);
});

gulp.task('build', ['move', 'css', 'scripts', 'html', 'img']);