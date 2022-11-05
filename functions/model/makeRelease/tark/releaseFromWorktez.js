// exports.releaseFromWorktez = function(request, response) {
//   const TagName= request.body.data.TagName;
//   const targetBranch = request.body.data.TargetBranch;
//   const releaseName = request.body.data.ReleaseName;
//   const releaseDescription = request.body.data.ReleaseDescription;
//   const draft = request.body.data.IfDraft;
//   const preRelease = request.body.data.IfPreRelease;
//   const generateRelease = request.body.data.IfGenerateRelease;
//   let status = 200;
//   let result;

//   // Octokit.js
// // https://github.com/octokit/core.js#readme
// const octokit = new Octokit({
//     auth: 'YOUR-TOKEN'
//   })
//   await octokit.request('POST /repos/{owner}/{repo}/releases', {
//     owner: 'OWNER',
//     repo: 'REPO',
//     tag_name: 'v1.0.0',
//     target_commitish: 'master',
//     name: 'v1.0.0',
//     body: 'Description of the release',
//     draft: false,
//     prerelease: false,
//     generate_release_notes: false
//   })

// };
