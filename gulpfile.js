const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const SetupSync = require('./gulp-helpers/browser-sync');

require('gulp-task-loader')('gulp-tasks');

gulp.task('build', done => gulpSequence('build:markup', 'build:style', 'build:script')(done));

gulp.task('lint', done => gulpSequence('lint:style', 'lint:script')(done));

gulp.task('watch', ['lint', 'build'], (done) => {
    SetupSync.init();

    gulp.watch([
        'src/**/*.html',
    ], () => gulpSequence('build:markup')(() => SetupSync.reload()));
    gulp.watch([
        'src/**/*.scss',
    ], () => gulpSequence('build:style', 'lint:style')(() => SetupSync.reload()));
    gulp.watch([
        'src/**/*.js',
    ], () => gulpSequence('build:script', 'lint:script')(() => SetupSync.reload()));

    done();
});
