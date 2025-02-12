const fs = require('fs');
const path = require('path');

/* DO NOT DELETE THIS FILE
This file is used by build system to build a clean npm package
with the compiled js files in the root of the package.
It will not be included in the npm package.
*/

function main() {
  const source = fs.readFileSync(path.join(__dirname, './package.json')).toString('utf-8');
  const sourceObj = JSON.parse(source);

  sourceObj.private = false;
  delete sourceObj.scripts;
  delete sourceObj.devDependencies;
  delete sourceObj.devDependencies;
  delete sourceObj['standard-version'];

  // Object.entries(sourceObj).forEach(([key, value]) => {
  //   if (typeof value === 'string' && value.startsWith('./dist/')) {
  //     sourceObj[key] = sourceObj[key].replace('./dist/', './');
  //   }
  // });
  fs.writeFileSync(path.join(__dirname, 'dist/package.json'), Buffer.from(JSON.stringify(sourceObj, null, 2), 'utf-8').toString());
  fs.writeFileSync(path.join(__dirname, 'dist/version.md'), Buffer.from(sourceObj.version, 'utf-8').toString());

  fs.copyFileSync(path.join(__dirname, 'README.md'), path.join(__dirname, 'dist/README.md'));
  fs.copyFileSync(path.join(__dirname, 'CHANGELOG.md'), path.join(__dirname, 'dist/CHANGELOG.md'));
}

main();
