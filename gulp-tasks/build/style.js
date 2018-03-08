const autoprefixer = require('gulp-autoprefixer');
const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
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
.pipe(cleanCSS)
.pipe(gulp.dest, './dist');

module.exports = () => gulp.src([
    'src/**/*.scss',
])
.pipe(plumber({ errorHandler: handleError }))
.pipe(gulpif(!argv.production, sourcemaps.init()))
.pipe(sass())
.pipe(autoprefixer({
    browsers: ['last 30 versions'],
}))
.pipe(gulpif(!argv.production, development()))
.pipe(gulpif(argv.production, production()));
