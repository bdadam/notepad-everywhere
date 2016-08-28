const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const noop = () => {};

const options = {
    minify: true,
    paths: {
        public: 'public'
    }
};

gulp.task('set-dev', () => {
    options.minify = false;
});

gulp.task('sass', function () {
    const sass = require('gulp-sass');
    const pleeease = require('gulp-pleeease');

    gulp.src('src/main.scss')
        .pipe(sass({
            outputStyle: 'expanded',
            importer: require('node-sass-import')
        })
        .on('error', sass.logError))
        .pipe(pleeease({
            minifier: options.minify,
            mqpacker: true
        }))
        .pipe(gulp.dest('public'));
});

gulp.task('sass:watch', ['sass'], () => {
    gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('browser-sync', () => {
    const superstatic = require('superstatic');
    const config = require('./firebase.json').hosting;

    browserSync.init({
        open: false,
        middleware: superstatic({ config: config })
    });
});

var cache;
gulp.task('js', done => {
    const rollup = require( 'rollup' );
    const babel = require('rollup-plugin-babel');
    const commonjs = require('rollup-plugin-commonjs');
    const nodeResolve = require('rollup-plugin-node-resolve');
    const eslint = require('rollup-plugin-eslint');
    const uglify = require('rollup-plugin-uglify');
    const replace = require('rollup-plugin-replace');

    const config = {
        entry: 'src/index.js',
        cache,
        plugins: [
            eslint(),
            // babel(babelrc()),
            babel({ exclude: 'node_modules/**' }),
            nodeResolve({ jsnext: true, main: true }),
            commonjs({ include: 'node_modules/**' }),
            replace({
                'process.env.NODE_ENV': '"production"',
                'process.env.VUE_ENV': '"browser"'
            }),
            // options.minify ? uglify() : noop
        ]
    };

    if (options.minify) { config.plugins.push(uglify()); }

    return rollup.rollup(config).then(bundle => {
        cache = bundle;

        return bundle.write({
            format: 'iife',
            dest: 'public/index.js',
            sourceMap: true
        });
    })
});

gulp.task('js:watch', () => {
    gulp.watch(['src/**/*.js'], ['js']);
});

gulp.task('dev', ['set-dev', 'browser-sync', 'js', 'sass', 'js:watch', 'sass:watch']);
gulp.task('build', ['js', 'sass']);
gulp.task('default', ['build'])
