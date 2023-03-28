module.exports = async (github, core) => {
  const allBranches = await github.rest.branches.list({
    owner: context.repo.owner,
    repo: context.repo.repo,
    protected: true,
  });

  const releaseBranches = allBranches.data.filter((branch) => {
    const branchName = branch.name;
    return branchName.startsWith("release/");
  });

  const releaseBranchNames = releaseBranches.map((branch) => branch.name);
  releaseBranchNames.push("main");

  console.log("Release branches: ", releaseBranchNames);
  core.setOutput("release_branches", releaseBranchNames);
};
