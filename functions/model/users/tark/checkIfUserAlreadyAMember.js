/* eslint-disable linebreak-style */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author: Simran Nigam <nigamsimran14@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/

/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const {getTeam} = require("../../teams/lib");

exports.checkIfUserAlreadyAMember = function(request, response) {
  const organizationDomain = request.body.data.OrganizationDomain;
  const teamName = request.body.data.TeamName;
  const userEmail = request.body.data.UserEmail;
  let status = 200;
  let resultData = "";

  getTeam(organizationDomain, teamName).then((data) => {
    const teamMembers = data.TeamMembers;
    if (teamMembers.indexOf(userEmail)) {
      resultData = "true";
    } else {
      resultData = "false";
    }
    const result = {data: resultData};
    return response.status(status).send(result);
  }).catch((err) => {
    status = 500;
    resultData = "false";
    console.error("Error : " + err);
    const result = {data: resultData};
    return response.status(status).send(result);
  });
};
