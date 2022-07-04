
module.exports = (core, branch) => {
  console.log(branch);
  const parts = branch.split("/");
  const isHotfix = parts[0] === "hotfix";

  if (!isHotfix) {
    const desc = parts[parts.length - 1];
    core.setOutput("desc", desc);
  } else {
    const ngVersion = parts[parts.length - 1];
    core.setOutput("ngVersion", ngVersion);
  }
  
  const version = parts[parts.length - 2];
  core.setOutput("version", version);
};
