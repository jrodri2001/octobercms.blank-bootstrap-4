const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const minify = require('gulp-minify');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src("assets/scss/*.scss")
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

//minify
gulp.task('css-minify', () => {
    return gulp.src("./assets/css/*.css")
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', gulp.series(['sass', 'css-minify'], function() {

    browserSync.init({
        server: "./assets/"
    });

    gulp.watch("assets/scss/*.scss", gulp.series('sass'));
    gulp.watch("assets/css/*.css", gulp.series('css-minify'));
    gulp.watch("assets/*.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));