const { execSync } = require('child_process');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: 'inherit', cwd: rootDir, shell: true });
}

function runOutput(command) {
  return execSync(command, { encoding: 'utf8', cwd: rootDir, shell: true }).trim();
}

let baseHref = process.argv[2] || '/';
if (!baseHref.startsWith('/')) {
  baseHref = `/${baseHref}`;
}
if (!baseHref.endsWith('/')) {
  baseHref = `${baseHref}/`;
}

const { version, buildId } = require('./generate-app-version.js');

run(`npx ng build --configuration production --base-href ${baseHref}`);

run('git add .');

const status = runOutput('git status --porcelain');
if (!status) {
  console.log('No changes to commit.');
  process.exit(0);
}

run(`git commit -m "Deploying version ${version} (${buildId})"`);
run('git push origin main');
