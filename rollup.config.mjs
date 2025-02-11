import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' with { type: "json" };import json from '@rollup/plugin-json';

const banner = `// mailgun.js v${pkg.version} Copyright (c) ${new Date().getFullYear()} ${pkg.author} and contributors`;
const distFolder = './dist/'
export default [
{ // only declarations
  cache: false,
  input: './lib/index.ts',
  output: {
    dir: './dist/Types',
    esModule: false,
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.rollup.json',
      incremental: false,
      compilerOptions: {
        outDir: `${distFolder}Types/`,
        module: 'ESNext',
        target: 'es5',
        declaration: true,
        emitDeclarationOnly: true,
        declarationDir: `${distFolder}Types/`,
      },
      exclude: ['**/test/**', './integration_tests/**/**', "**/dist/*.js"],
    }),
    nodeResolve({
      preferBuiltins: true,
      browser: true,
      skip: ['./integration_tests/**']
    }),
    commonjs() // url-join doesn't have default export
  ]
},
{
  cache: false,
  input: './lib/index.ts',
  output: {
    file: `${distFolder}AMD/mailgun.amd.js`,
    banner,
    format: 'amd',
    esModule: false,
    exports: 'default'
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.rollup.json',
      incremental: false,
      // emitDeclarationOnly: true,
      compilerOptions: {
        outDir: `${distFolder}AMD/`,
        module: 'ESNext',
        target: 'es5',
        declaration: false,
        declarationDir: null,
      },
      exclude: ['**/test/**', './integration_tests/**/**', "**/dist/*.js"],
    }),
    nodeResolve({
      preferBuiltins: true,
      browser: true,
      skip: ['./integration_tests/**']
    }),
    commonjs() // url-join doesn't have default export
  ]
},
{ // for the definitions entry-point
  input: ['./lib/definitions.ts'],
  cache: false,
  output: {
    file: `${distFolder}AMD/definitions.amd.js`,
    banner,
    format: 'amd',
    esModule: false,
    exports: 'named',
  },
  plugins: [
  nodeResolve({
    preferBuiltins: true,
    browser: false,
    mainFields: 'main'
  }),
  typescript({
    tsconfig: './tsconfig.rollup.json',
    incremental: false,
    exclude: ['**/test/**', '**/integration_tests/**', "**/dist/**"],
    compilerOptions: {
      outDir: './dist/AMD/',
      module: 'ESNext',
      target: 'es5',
      declaration: false,
      declarationDir: null,
    }
  }),
  ]
},
{
  input: ['./lib/index.ts'],
  cache: false,
  output: {
    file: `${distFolder}/CJS/mailgun.node.js`,
    banner,
    format: 'cjs',
    exports: 'default'
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      browser: false,
      mainFields: 'main'
    }),
    typescript({
      tsconfig: './tsconfig.rollup.json',
      incremental: false,
      exclude: ['**/test/**', '**/integration_tests/**', "**/dist/**"],
      compilerOptions: {
        declaration: false,
        declarationDir: null,
        outDir: `${distFolder}/CJS/`,
        module: 'ESNext',
        target: 'es5',
      }
    }),
    commonjs(), // url-join doesn't have default export
    // nodePolyfills(),
    json(), // mime-db.json -> mime-types -> form-data
  ],
},
{ // for the definitions entry-point
  input: ['./lib/definitions.ts'],
  cache: false,
  output: {
    file: `${distFolder}/CJS/definitions.js`,
    banner,
    format: 'cjs',
    exports: 'named'
  },
  plugins: [
  nodeResolve({
    preferBuiltins: true,
    browser: false,
    mainFields: 'main'
  }),
  typescript({
    tsconfig: './tsconfig.rollup.json',
    incremental: false,
    exclude: ['**/test/**', '**/integration_tests/**', "**/dist/**"],
    compilerOptions: {
      declaration: false,
      declarationDir: null,
      outDir: `${distFolder}/CJS/`,
      module: 'ESNext',
      target: 'es5',
    }
  }),
  ]
},

// {
//   input: ['./lib/index.ts'],
//   cache: false,
//   output: {
//     file: './dist/ESM/mailgun.node.js',
//     banner,
//     format: 'esm',
//     // exports: 'default'
//   },
//   plugins: [
//     nodeResolve({
//       preferBuiltins: true,
//       browser: false,
//     }),
//     typescript({
//       tsconfig: './tsconfig.rollup.json',
//       incremental: false,
//       exclude: ['**/test/**', '**/integration_tests/**', "**/dist/**"],
//       emitDeclarationOnly: false,
//       compilerOptions: {
//         outDir: './dist/ESM',
//         module: 'nodenext',
//         target: 'es2020',
//         declarationDir: './dist/ESM',
//       }
//     }),
//     commonjs(), // url-join doesn't have default export
//     // nodePolyfills(),
//     json(), // mime-db.json -> mime-types -> form-data
//   ],
// },
// { // for the definitions entry-point
//   input: ['./lib/definitions.ts'],
//   cache: false,
//   output: {
//     file: './dist/ESM/definitions.js',
//     banner,
//     format: 'esm',
//     // exports: 'named'
//   },
//   plugins: [
//   nodeResolve({
//     preferBuiltins: true,
//     browser: false,
//     mainFields: 'main'
//   }),
//   typescript({
//     tsconfig: './tsconfig.rollup.json',
//     incremental: false,
//     // emitDeclarationOnly: true,
//     exclude: ['**/test/**', '**/integration_tests/**', "**/dist/**"],
//     compilerOptions: {
//       outDir: './dist/ESM',
//       module: 'nodenext',
//       target: 'es2020',
//       declarationDir: './dist/ESM',
//     }
//   }),
//   ]
// },
];
