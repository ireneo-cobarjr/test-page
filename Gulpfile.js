'use strict';

const gulp = require('gulp');
const browserSnyc = require('browser-sync').create();
var sass = require('gulp-sass');
 
sass.compiler = require('node-sass');

gulp.task('process-css', () => {
    return gulp.src('./*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./'))
        .pipe(browserSnyc.stream())
});

gulp.task('serve', function () {
        browserSnyc.init({
            server: {
                baseDir: './'
            }
        });
        gulp.watch('./*.html').on('change', browserSnyc.reload);
        gulp.watch('./*.scss', gulp.series('process-css'));
        gulp.watch('./*.js', gulp.series('server-reload'));
});

gulp.task('server-reload', browserSnyc.reload);
gulp.task('default', 
    gulp.series('process-css', 'serve')
);
