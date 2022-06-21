const core = require('@actions/core');
const pkg = require('../package.json');

const fullVersion = pkg.version;
const [major, minor] = fullVersion.split('.');
console.log('JJJJ', pkg.version, fullVersion, major, minor);
core.setOutput('version', `${major}.${minor}`);
core.setOutput('full_version', pkg.version);