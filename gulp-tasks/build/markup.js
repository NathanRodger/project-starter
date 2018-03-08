const gulp = require('gulp');
const gulpif = require('gulp-if');
const yargs = require('yargs');

const { argv } = yargs;

module.exports = () => gulp.src([
    'src/**/*.html',
])
.pipe(gulpif(!argv.production, gulp.dest('_tmp')))
.pipe(gulpif(argv.production, gulp.dest('dist')));
