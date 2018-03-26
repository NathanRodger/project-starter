const gulp = require('gulp');
const stylelint = require('gulp-stylelint');
const plumber = require('gulp-plumber');
const options = require('../../gulp-helpers/options');

module.exports = () => gulp.src([
    '**/*.scss',
    '!dist/**',
    '!_tmp/**',
    '!node_modules/**',
])
.pipe(plumber({ errorHandler: options.plumber }))
.pipe(stylelint({
    failAfterError: true,
    debug: true,
    reporters: [{
        formatter: 'string',
        console: true,
    }],
}));
