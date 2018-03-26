const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const yargs = require('yargs');
const webpack = require('webpack-stream');
const options = require('../../gulp-helpers/options');

const { argv } = yargs;

module.exports = () => gulp.src([
    './src/script/main.js',
])
.pipe(webpack({
    output: {
        filename: 'script/main.js',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js'],
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules\/(?!identicons).*/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'minify'],
                    plugins: ['angularjs-annotate'],
                },
            },
        }],
    },
}))
.pipe(plumber({ errorHandler: options.plumber }))
.pipe(gulpif(!argv.production, gulp.dest('./_tmp')))
.pipe(gulpif(argv.production, gulp.dest('./dist')));
