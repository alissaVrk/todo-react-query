module.exports = async (github, context, core) => {
  //https://github.com/octokit/plugin-rest-endpoint-methods.js/blob/main/docs/repos/listBranches.md
  const allBranches = await github.rest.repos.listBranches({
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
