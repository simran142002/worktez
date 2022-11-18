/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable max-len */

/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 * Author : Simran Nigam <nigamsimran14@gmail.com>
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the MIT License
 *
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the MIT License for more details.
 ***********************************************************/
const {updateMeetDetailsAtWorktez} = require("../lib");

exports.addAttendeeAtWorktez = function(request, response) {
  const attendees = request.body.data.Attendees;
  const add = request.body.data.Add;

  let result;
  const status = 200;

  const found = attendees.include(add);
  if (found) {
    result = {data: "Attendees already added"};
    console.log("Attendees already added");
  } else {
    attendees.push(add);
    const updateJson = {
      Attendees: attendees,
    };
    updateMeetDetailsAtWorktez(updateJson);
    result = {data: "Attendee added Successfully"};
    console.log("Attendee added Successfully");
  }
  return response.status(status).send(result);
};
