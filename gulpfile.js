var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var reload = browserSync.reload;


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
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/'));
});

gulp.task('watch', ['css'], function () {

    browserSync({
        server: "."
    });

    gulp.watch("src/css/**/*.css", ['css']).on('change', reload);
    gulp.watch("*.html").on('change', reload);
});