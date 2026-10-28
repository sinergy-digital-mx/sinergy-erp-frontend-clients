const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const backendDir = path.resolve(rootDir, '..', 'sinergy-erp-backend-clients');
const backendLib = path.resolve(backendDir, 'scripts', 'lib', 'release-notes.js');
const changelogLib = path.resolve(backendDir, 'scripts', 'lib', 'session-changelog.js');
const recordScript = path.resolve(
  rootDir,
  '..',
  'sinergy-erp-backend-clients',
  'scripts',
  'record-system-version.js',
);

function run(command) {
  console.log(`> ${command}`);
  execSync(command, { stdio: 'inherit', cwd: rootDir, shell: true, env: process.env });
}

function runOutput(command) {
  return execSync(command, { encoding: 'utf8', cwd: rootDir, shell: true, env: process.env }).trim();
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

function loadReleaseNotes() {
  if (process.env.RELEASE_NOTES_FILE && fs.existsSync(process.env.RELEASE_NOTES_FILE)) {
    return JSON.parse(fs.readFileSync(process.env.RELEASE_NOTES_FILE, 'utf8'));
  }

  if (!fs.existsSync(backendLib)) {
    console.warn('No se encontró el lector de notas del backend. La versión saldrá sin detalle de cambios.');
    return {
      channel: 'frontend',
      changes: [{ scope: 'frontend', message: 'Actualización de la plataforma.' }],
    };
  }

  const { collectChanges } = require(backendLib);
  return {
    channel: 'frontend',
    changes: collectChanges(rootDir, 'frontend'),
  };
}

function writeLastRelease(published) {
  if (!fs.existsSync(backendLib)) {
    return null;
  }

  const { buildReleasePayload } = require(backendLib);
  const payload = buildReleasePayload({
    version: published.version,
    buildId: published.buildId,
    channel: published.channel || 'frontend',
    changes: published.changes || [],
    releasedAt: published.builtAt,
  });
  const target = path.join(rootDir, 'scripts', '.last-release.json');
  fs.writeFileSync(target, `${JSON.stringify(payload, null, 2)}\n`);
  return { payload, target };
}

let baseHref = process.argv[2] || '/';
if (!baseHref.startsWith('/')) {
  baseHref = `/${baseHref}`;
}
if (!baseHref.endsWith('/')) {
  baseHref = `${baseHref}/`;
}

run('npm version patch --no-git-tag-version');

const notes = loadReleaseNotes();
const notesPath = path.join(rootDir, 'scripts', '.release-changes.json');
fs.writeFileSync(notesPath, `${JSON.stringify(notes, null, 2)}\n`);

run('node scripts/generate-app-version.js');
run(`npx ng build --configuration production --base-href ${baseHref}`);

const published = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'public', 'app-version.json'), 'utf8'),
);
const lastRelease = writeLastRelease(published);

if (process.env.DEPLOY_BOTH === '1') {
  console.log('deploy:both registrará la versión desde el backend.');
} else if (lastRelease && fs.existsSync(recordScript)) {
  try {
    run(`node "${recordScript}" --payload "${lastRelease.target}"`);
    require(backendLib).writeReleaseSnapshot(rootDir);
  } catch (error) {
    console.warn(`No se pudo registrar la versión en la base: ${error.message}`);
  }
} else {
  console.warn('No se registró la versión en la base: falta el script del backend.');
}

fs.rmSync(notesPath, { force: true });

run('git add .');

const status = runOutput('git status --porcelain');
if (!status) {
  console.log('No changes to commit.');
  process.exit(0);
}

const versionTitle = `Deploying version ${published.version} (${published.buildId})`;
if (fs.existsSync(changelogLib)) {
  const changelog = require(changelogLib);
  const notes = changelog.pendingEntries(backendDir);
  changelog.commitWithMessage(rootDir, changelog.deployCommitMessage(versionTitle, notes));
} else {
  run(`git commit -m "${versionTitle}"`);
}
ensureGitSshAuth();
run('git push origin main');

if (process.env.DEPLOY_BOTH !== '1' && process.env.CHANGELOG_HOLD !== '1' && fs.existsSync(changelogLib)) {
  try {
    require(changelogLib).shipPendingChangelog(backendDir, published.version);
  } catch (error) {
    console.warn(`No se pudo cerrar el changelog en el backend: ${error.message}`);
  }
}
