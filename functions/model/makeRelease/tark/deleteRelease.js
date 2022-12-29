const {getReleaseData, updateRelease} = require("../lib");

exports.deleteRelease = function(request, response) {
  const orgDomain = request.body.data.OrgDomain;
  const releaseId = request.body.data.ReleaseId;
  let result;
  let status = 200;
  console.log(orgDomain, releaseId);
  const promise = getReleaseData(orgDomain, releaseId).then((releaseData) => {
    if (releaseData == undefined) {
      result = {data: {status: "Release does not exist"}};
    } else {
      const updateReleaseToJson={
        Status: "DELETED",
      };
      updateRelease(updateReleaseToJson, orgDomain, releaseId);
    }
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  Promise.resolve(promise).then(() => {
    result = {data: {status: "OK"}};
    console.log("Release Deleted Successfully");
    return response.status.send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error Deleting", error);
    return response.status(status).send(result);
  });
};
