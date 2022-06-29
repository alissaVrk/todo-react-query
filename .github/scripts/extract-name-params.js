
module.exports = (core, branch) => {
  console.log(branch);
  const parts = branch.split("/");
  const isHotfix = parts[0] === "hotfix";

  const desc = parts[parts.length - 1];
  const version = isHotfix ? parts[parts.length - 3] : parts[parts.length - 2];
  const ngVersion = isHotfix ? parts[parts.length - 2] : "";

  core.setOutput("version", version);
  core.setOutput("desc", desc);
  core.setOutput("ngVersion", ngVersion);
};