var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var rename = require("gulp-rename");
var sass = require('gulp-sass');


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
        .pipe(sourcemaps.write('./build'))
        .pipe(gulp.dest('build/'))
        .pipe(browserSync.stream());
});

gulp.task('html', function(){
    gulp.src('./*.html')
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', ['css', 'html'],  function () {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/css/**/*.css", ['css']);
    gulp.watch("*.html", ['html']).on('change', reload);
});