const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: 'inherit', cwd: rootDir, shell: true });
}

function runOutput(command) {
  return execSync(command, { encoding: 'utf8', cwd: rootDir, shell: true }).trim();
}

function getSshKeyPath() {
  return path.resolve(rootDir, '..', '..', '..', 'ssh', 'sinergy');
}

function ensureGitSshAuth() {
  const keyPath = getSshKeyPath();
  if (!fs.existsSync(keyPath)) {
    console.warn(`SSH key not found at ${keyPath}; git push may fail.`);
    return;
  }

  const keyForSsh = keyPath.replace(/\\/g, '/');
  process.env.GIT_SSH_COMMAND = `ssh -i "${keyForSsh}" -o IdentitiesOnly=yes`;

  if (process.platform === 'win32') {
    try {
      run('powershell -NoProfile -Command "Start-Service ssh-agent -ErrorAction SilentlyContinue"');
      run(`ssh-add "${keyPath}"`);
    } catch {
      // GIT_SSH_COMMAND is enough for Git on Windows.
    }
  } else {
    try {
      run('eval "$(ssh-agent -s)"');
      run(`ssh-add "${keyPath}"`);
    } catch {
      // GIT_SSH_COMMAND still applies for git push.
    }
  }
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
ensureGitSshAuth();
run('git push origin main');
