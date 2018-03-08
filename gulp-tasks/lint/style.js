const gulp = require('gulp');
const stylelint = require('gulp-stylelint');

module.exports = () => gulp.src([
    '**/*.scss',
    '!dist/**',
    '!_tmp/**',
    '!node_modules/**',
])
.pipe(stylelint({
    failAfterError: true,
    debug: true,
    reporters: [{
        formatter: 'string',
        console: true,
    }],
}));
