module.exports = async ({ github, context, branchName, originBranchName }) => {
  const params = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    base: originBranchName,
    head: `${context.actor}:${branchName}`,
  };

  const res = await github.rest.pulls.list(params);

  const existing = res.data;

  if (existing.length === 0) {
    const pull = await github.rest.pulls.create({
      ...params,
      title: branchName,
      body: "DO NOT SQUASH THIS BRANCH. merge to dev branch.",
    });

    const pullNumber = pull.data.number;

    //https://github.com/octokit/plugin-rest-endpoint-methods.js/blob/main/docs/pulls/requestReviewers.md
    await github.rest.pulls.requestReviewers({
      owner: context.repo.owner,
      repo: context.repo.repo,
      pull_number: pullNumber,
      reviewers: [context.actor],
    });
  }
};
