import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json' with { type: "json" };import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const banner = `// mailgun.js v${pkg.version} Copyright (c) ${new Date().getFullYear()} ${pkg.author} and contributors`;
const isProductionBuild = process.env.NODE_ENV === 'production'
if(isProductionBuild) {
  console.log("Production build")
}
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
      exports: 'default',
      sourcemap: (isProductionBuild ? false : 'inline')
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.rollup.json',
        incremental: false,
        compilerOptions: {
          outDir: `${distFolder}AMD/`,
          module: 'ESNext',
          target: 'es5',
          sourceMap: false,
        },
        exclude: ['**/tests/**', "**/dist/*.js"],
      }),
      nodeResolve({
        preferBuiltins: true,
        browser: true,
        skip: ['./tests/**']
      }),
      commonjs(), // url-join doesn't have default export,
      (isProductionBuild && terser())
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
          sourceMap: false,
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
      exports: 'default',
      sourcemap: (isProductionBuild ? false : 'inline')
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
          sourceMap: false,
        }
      }),
      commonjs(), // url-join doesn't have default export
      json(), // mime-db.json -> mime-types -> form-data
      (isProductionBuild && terser())
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
          sourceMap: false,
        }
      }),
    ]
  },
  // ESM Node main build
  getESMConfig({isDefinition: false, isNode: true}),
  // ESM Node definitions entry-point
  getESMConfig({isDefinition: true, isNode: true}),
  // ESM Browser main build
  getESMConfig({isDefinition: false, isNode: false}),
  // ESM Browser definitions entry-point
  getESMConfig({isDefinition: true, isNode: false})
];

function getESMConfig({isDefinition, isNode}) {
  return {
    input: isDefinition ? ['./lib/definitions.ts'] : ['./lib/index.ts'],
    cache: false,
    output: {
      file: `./dist/ESM/${isDefinition ? 'definitions' : 'mailgun'}.${isNode ? 'node' : 'browser'}.js`,
      banner,
      format: 'es',
      exports: isDefinition ? 'named' : undefined,
      esModule: true,
      sourcemap: (!isDefinition && isProductionBuild ? false : 'inline')
    },
    plugins: [
      nodeResolve({
        preferBuiltins: true,
        browser: !isNode,
      }),
      typescript({
        tsconfig: './tsconfig.rollup.json',
        incremental: false,
        exclude: ['**/tests/**', "**/dist/**"],
        compilerOptions: {
          outDir: './dist/ESM',
          module: isNode ? "NodeNext" : "ESNext",
          target: "ESNext",
          moduleResolution: "NodeNext",
          sourceMap: false,
        }
      }),
      !isDefinition && commonjs(), // url-join doesn't have default export
      !isDefinition && json(), // mime-db.json -> mime-types -> form-data
      !isDefinition && isProductionBuild && terser()
    ]
  }
}
