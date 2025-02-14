import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' with { type: "json" };import json from '@rollup/plugin-json';

const banner = `// mailgun.js v${pkg.version} Copyright (c) ${new Date().getFullYear()} ${pkg.author} and contributors`;
const distFolder = './dist/'
export default [
{ // only Type declarations
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
        declaration: true,
        emitDeclarationOnly: true,
        declarationDir: `${distFolder}Types/`,
      },
      exclude: ['**/tests/**', "**/dist/*.js"],
    }),
    nodeResolve({
      preferBuiltins: true,
      browser: true,
      skip: ['./tests/**']
    }),
    commonjs() // url-join doesn't have default export
  ]
},
{ // AMD Main build
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
      compilerOptions: {
        outDir: `${distFolder}AMD/`,
        module: 'ESNext',
        target: 'es5',
      },
      exclude: ['**/tests/**', "**/dist/*.js"],
    }),
    nodeResolve({
      preferBuiltins: true,
      browser: true,
      skip: ['./tests/**']
    }),
    commonjs() // url-join doesn't have default export
  ]
},
{ // AMD definitions entry-point
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
    exclude: ['**/tests/**', "**/dist/**"],
    compilerOptions: {
      outDir: './dist/AMD/',
      module: 'ESNext',
      target: 'es5',
    }
  }),
  ]
},
{ // CJS Main build
  input: ['./lib/index.ts'],
  cache: false,
  output: {
    file: `${distFolder}CJS/mailgun.node.cjs`,
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
      exclude: ['**/tests/**', "**/dist/**"],
      compilerOptions: {
        outDir: `${distFolder}/CJS/`,
        module: 'ESNext',
        target: 'es5',
      }
    }),
    commonjs(), // url-join doesn't have default export
    json(), // mime-db.json -> mime-types -> form-data
  ],
},
{ // CJS the definitions entry-point
  input: ['./lib/definitions.ts'],
  cache: false,
  output: {
    file: `${distFolder}CJS/definitions.cjs`,
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
    exclude: ['**/tests/**', "**/dist/**"],
    compilerOptions: {
      outDir: `${distFolder}/CJS/`,
      module: 'ESNext',
      target: 'es5',
    }
  }),
  ]
},

{ // ESM Node main build
  input: ['./lib/index.ts'],
  cache: false,
  output: {
    file: './dist/ESM/mailgun.node.js',
    banner,
    format: 'es',
    esModule: true
  },
  plugins: [
    nodeResolve({
      preferBuiltins: true,
      browser: false,
      mainFields: ['module']
    }),
    typescript({
      tsconfig: './tsconfig.rollup.json',
      incremental: false,
      exclude: ['**/tests/**', "**/dist/**"],
      compilerOptions: {
        outDir: './dist/ESM',
        module: "NodeNext",
        target: "ESNext",
      }
    }),
    commonjs(), // url-join doesn't have default export
    json(), // mime-db.json -> mime-types -> form-data
  ],
},
{ // ESM Node definitions entry-point
  input: ['./lib/definitions.ts'],
  cache: false,
  output: {
    file: './dist/ESM/definitions.node.js',
    banner,
    format: 'es',
    exports: 'named'
  },
  plugins: [
  typescript({
    tsconfig: './tsconfig.rollup.json',
    incremental: false,
    exclude: ['**/tests/**', "**/dist/**"],
    compilerOptions: {
      outDir: './dist/ESM',
      module: "NodeNext",
      target: "ESNext",
    }
  }),
  ]
},

{ // ESM Browser main build
  input: ['./lib/index.ts'],
  cache: false,
  output: {
    file: './dist/ESM/mailgun.browser.js',
    banner,
    format: 'es',
    esModule: true
  },
  plugins: [
    nodeResolve({
      browser: true,
      preferBuiltins: true,
    }),
    typescript({
      tsconfig: './tsconfig.rollup.json',
      incremental: false,
      exclude: ['**/tests/**', "**/dist/**"],
      compilerOptions: {
        outDir: './dist/ESM',
        module: "ESNext",
        target: "ESNext",
      }
    }),
    commonjs(), // url-join doesn't have default export
    json(), // mime-db.json -> mime-types -> form-data
  ],
},
{ // ESM Browser definitions entry-point
  input: ['./lib/definitions.ts'],
  cache: false,
  output: {
    file: './dist/ESM/definitions.browser.js',
    banner,
    format: 'es',
    exports: 'named'
  },
  plugins: [
  nodeResolve({
    preferBuiltins: true,
    browser: true,
  }),
  typescript({
    tsconfig: './tsconfig.rollup.json',
    incremental: false,
    exclude: ['**/tests/**', "**/dist/**"],
    compilerOptions: {
      outDir: './dist/ESM',
      module: "ESNext",
      target: "ESNext",
    }
  }),
  ]
},
];
