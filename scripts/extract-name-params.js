const core = require('@actions/core');

const branch  = process.env.branch;

console.log('BBBB', branch);

const parts = branch.split('/');
const isHotfix = parts[2] === 'hotfix';

const desc = parts[parts.length - 1]; 
const version = isHotfix ? parts[parts.length - 3] : parts[parts.length - 2];
const ngVersion = isHotfix ? parts[parts.length - 2] : '';

core.setOutput('version', version);
core.setOutput('desc', desc);
core.setOutput('ngVersion', ngVersion);
