import babel from 'rollup-plugin-babel';
// import babelrc from 'babelrc-rollup';
// import istanbul from 'rollup-plugin-istanbul';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import eslint from 'rollup-plugin-eslint';
import uglify from 'rollup-plugin-uglify';

// const pkg = require('./package.json');

export default {
    entry: 'src/index.js',
    plugins: [
        eslint({ /* your options */ }),
        // babel(babelrc()),
        babel({ exclude: 'node_modules/**' }),
        nodeResolve({ jsnext: true, main: true }),
        commonjs({ include: 'node_modules/**' })
        // istanbul({
        //   exclude: ['test/**/*', 'node_modules/**/*']
        // })
    ],
    targets: [{
        dest: 'public/index.js',
        format: 'iife',
        sourceMap: true
    }]
};