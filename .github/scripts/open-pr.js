module.exports = async ({ github, context, branchName, originBranchName }) => {
  console.log(
    "BBBB",
    branchName,
    originBranchName,
    context.repo,
    context.actor
  );
  console.log("CCCC", github.actor);

  const params = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    base: originBranchName,
    head: `${context.actor}:${branchName}`,
  };

  const res = await github.rest.pulls.list(params);

  const existing = res.data;

  if (existing.length === 0) {
    await github.rest.pulls.create({
      ...params,
      title: branchName,
      body: "DO NOT SQUASH THIS BRANCH. merge to dev branch.",
    });
  }
};
