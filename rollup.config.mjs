import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy'
import json from '@rollup/plugin-json';
import pkg from './package.json' assert { type: "json" };
// const year = new Date().getFullYear();
// const banner = `// mailgun.js v${pkg.version} Copyright (c) ${year} ${pkg.author} and contributors`;

const getBuildConfig = ({ output, browser = false, plugins = [] }) => {
  const year = new Date().getFullYear();
  const banner = `// mailgun.js v${pkg.version} Copyright (c) ${year} ${pkg.author} and contributors`;
  return {
    input: 'lib/index.ts',
    output:{
      ...output,
      banner,
      validate: true
    },
    plugins: [
      nodeResolve({
        preferBuiltins: true,
        browser,
      }),
      typescript({
        useTsconfigDeclarationDir: true,
        exclude: ["**/*.test.ts", "**/*.spec.ts"]
      }),
      commonjs(),
      json(),
      ...plugins
    ],
  };
};

export default [
  // node builds
  getBuildConfig({
    output: {
      file: 'dist/node/esm/mailgun.esm.mjs',
      format: 'esm',
      exports: 'named',
    }
  }),
  getBuildConfig({
    output: { file: 'dist/node/cjs/mailgun.cjs.js', format: 'cjs',  }
  }),
  // browser builds
  getBuildConfig({
    output: {
      file: 'dist/browser/esm/mailgun.esm.js',
      format: 'esm',
      exports: 'named',
    },
    browser: true,
    plugins: [
      copy({
        targets: [
          { src: 'dist/browser/esm/', dest: 'examples/browser/ESM' } // needed for running `npm run start:esm-example` command
        ]
      })
    ]
  }),
  getBuildConfig({
    output: {
      file: 'dist/browser/umd/mailgun.umd.js',
      format: 'umd',
      name: 'Mailgun',
      exports: 'default',
    },
    browser: true
  })
  // {
  //   input: 'lib/index.ts',
  //   output: [
  //     {
  //       file: 'dist/node/esm/mailgun.esm.mjs',
  //       format: 'esm',
  //       exports: 'named',
  //       banner
  //     },
  //     { file: 'dist/node/cjs/mailgun.cjs.js', format: 'cjs', banner },
  //   ],
  //   plugins: [
  //     nodeResolve({
  //       preferBuiltins: true,
  //       browser: false
  //     }),
  //     typescript({
  //       useTsconfigDeclarationDir: true
  //     }),
  //     commonjs(),

  //     json()
  //   ],
  // },

  // {
  //   input: 'lib/index.ts',
  //   output: [

  //     {
  //       file: 'dist/browser/esm/mailgun.esm.js',
  //       format: 'esm',
  //       exports: 'named',
  //       banner
  //     },
  //     {
  //       file: 'dist/browser/umd/mailgun.umd.js',
  //       format: 'umd',
  //       name: 'Mailgun',
  //       exports: 'default',
  //       banner
  //     }
  //   ],
  //   plugins: [
  //     nodeResolve({
  //       preferBuiltins: true,
  //       browser: true
  //     }),
  //     typescript({
  //       useTsconfigDeclarationDir: true
  //     }),
  //     commonjs(),

  //     json()
  //   ],
  // }
];
