const core = require('@actions/core');
const pkg = require('../package.json');

console.log(pkg.version);
core.setOutput('version', pkg.version);