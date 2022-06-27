module.exports = (branch) => {
  console.log(branch);
  const parts = branch.split("/");
  const isHotfix = parts[2] === "hotfix";

  const desc = parts[parts.length - 1];
  const version = isHotfix ? parts[parts.length - 3] : parts[parts.length - 2];
  const ngVersion = isHotfix ? parts[parts.length - 2] : "";

  const ret = {
    version,
    desc,
    ngVersion,
  };
  console.log('RRR', ret);
  return ret;
};
