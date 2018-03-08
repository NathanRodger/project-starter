const eslint = require('gulp-eslint');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const yargs = require('yargs');

const { argv } = yargs;

module.exports = () => gulp.src([
    '**/*.js',
    '!node_modules/**',
    '!_tmp/**/*',
    '!dist/**/*',
])
.pipe(eslint({
    fix: argv.fix,
}))
.pipe(eslint.format())
.pipe(eslint.failAfterError())
.pipe(gulpif(argv.fix, gulp.dest('.')));
