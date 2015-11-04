var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var debug = require('gulp-debug');


var processor = [
    require('precss'),
    require('rucksack-css'),
    require('autoprefixer')({browsers: ['last 3 versions']}),
    require('css-mqpacker'),
    require('cssnano')
];

gulp.task('css', function () {

    var postcss = require('gulp-postcss');
    return gulp.src('src/**/style.css')
        .pipe(postcss(processor))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
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

gulp.task('watch', ['css','html'],  function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/css/**/*.css", ['css', 'img']);
    gulp.watch("*.html", ['html', 'img']).on('change', reload);
});