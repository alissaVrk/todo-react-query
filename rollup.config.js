import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import postcss from "rollup-plugin-postcss";


const packageJson = require('./package.json');

export default [
    {
    input: 'src/lib.ts',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
            name: 'react-lib'
        }, {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        injectProcessEnv({ 
            NODE_ENV: 'development',
        }),
        terser()
    ]
}, 
{
    input: "src/App.css",
    output: {
        file: "lib/App.css"
    },
    plugins: [
        postcss({
            config: {
              path: "./postcss.config.js",
            },
            extensions: [".css"],
            minimize: false,
            extract: true,
            sourceMap: true
        })
    ]
}]