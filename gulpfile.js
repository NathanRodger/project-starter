const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const options = require('./gulp-helpers/options');

require('gulp-task-loader')('gulp-tasks');

gulp.task('build', done => gulpSequence('build:markup', 'build:style', 'build:script')(done));

gulp.task('lint', done => gulpSequence('lint:style', 'lint:script')(done));

gulp.task('watch', ['lint', 'build'], (done) => {
    options.sync();

    gulp.watch([
        'src/**/*.html',
    ], () => gulpSequence('build:markup')(() => options.reload()));
    gulp.watch([
        'src/**/*.scss',
    ], () => gulpSequence('build:style', 'lint:style')(() => options.reload()));
    gulp.watch([
        'src/**/*.js',
    ], () => gulpSequence('build:script', 'lint:script')(() => options.reload()));

    done();
});
