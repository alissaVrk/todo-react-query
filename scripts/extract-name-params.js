const core = require('@actions/core');

const branch  = core.getInput('branch');
console.log('BBBB', branch);

const parts = branch.split('/');
const desc = parts[parts.length - 1]; 
const version = parts[parts.length - 2];

core.setOutput('version', version);
core.setOutput('desc', desc);
