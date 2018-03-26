const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const yargs = require('yargs');
const options = require('../../gulp-helpers/options');

const { argv } = yargs;

module.exports = () => gulp.src([
    '**/*.js',
    '!node_modules/**',
    '!**/vendor/**',
    '!_tmp/**/*',
    '!dist/**/*',
])
.pipe(plumber({ errorHandler: options.plumber }))
.pipe(eslint({
    fix: argv.fix,
}))
.pipe(eslint.format())
.pipe(eslint.failAfterError())
.pipe(gulpif(argv.fix, gulp.dest('.')));
