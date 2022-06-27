module.exports = async ({ github, context, brancName }) => {
  console.log("BBBB", brancName, context.repo, context.actor);

  const params = {
    owner: context.repo.owner,
    repo: context.repo.repo,
    base: "main",
    head: `${context.actor}:${brancName}`,
  };

  const res = await github.rest.pulls.list(params);

  const existing = res.data;

  if (existing.length === 0) {
    await github.rest.pulls.create({
      ...params,
      title: brancName,
      body: 'DO NOT SQUASH THIS BRANCH. merge to dev branch.',
    });
  }
};
