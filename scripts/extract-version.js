const pkg = require("../package.json");

module.exports = (core) => {
  const fullVersion = pkg.version;
  const [major, minor] = fullVersion.split(".");
  core.setOutput("version", `${major}.${minor}`);
  core.setOutput("full_version", fullVersion);
};
