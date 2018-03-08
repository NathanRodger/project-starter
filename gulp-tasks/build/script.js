const babel = require('gulp-babel');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const lazypipe = require('lazypipe');
const yargs = require('yargs');

const { argv } = yargs;

const handleError = (err) => {
    console.log(err.toString());
    this.emit('end');
};

const development = lazypipe()
.pipe(sourcemaps.write, '.')
.pipe(gulp.dest, './_tmp');

const production = lazypipe()
.pipe(() => {
    return uglify();
})
.pipe(gulp.dest, './dist');

module.exports = () => gulp.src([
    'src/**/*.js',
])
.pipe(plumber({ errorHandler: handleError }))
.pipe(gulpif(!argv.production, sourcemaps.init()))
.pipe(babel({
    presets: ['env'],
}))
.pipe(gulpif(!argv.production, development()))
.pipe(gulpif(argv.production, production()));
