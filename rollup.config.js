import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';

const copyConfig = {
    targets: [
        { src: 'node_modules/@webcomponents', dest: 'public/node_modules' },
        { src: 'index.html', dest: 'public' },
    ],
};

const config = {
    input: 'app.js',
    output: {
        dir: 'public/',
        format: 'es',
    },
    plugins: [
        minifyHTML(),
        copy(copyConfig),
        resolve(),
        terser(),
    ],
    preserveEntrySignatures: false,
};

export default config;
