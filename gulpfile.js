const gulp = require('gulp');
const browserSync = require('browser-sync').create();

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
    const fs = require('fs');

    const babel = require('rollup-plugin-babel');
    const commonjs = require('rollup-plugin-commonjs');
    const nodeResolve = require('rollup-plugin-node-resolve');
    const eslint = require('rollup-plugin-eslint');
    const uglify = require('rollup-plugin-uglify');
    const replace = require('rollup-plugin-replace');


    const cfg = {
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
            // uglify()
        ]
    };


    return rollup.rollup(cfg).then(bundle => {
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

gulp.task('dev', ['browser-sync', 'js', 'js:watch']);