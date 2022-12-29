/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-undef */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if
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

 const {functions, cors, fastify, requestHandler} = require("../application/lib");
 const {releaseFromWorktez} = require("./tark/releaseFromWorktez");
 const {addRelease} = require("./tark/addRelease");
 const {getAllReleases} = require("./tark/getAllReleases");
 const {getRelease} = require("./tark/getRelease");
 const {deleteRelease} = require("./tark/deleteRelease");
 const {editRelease} = require("./tark/editRelease");

 /**
  * Description
  * @param {any} "/releaseFromWorktez"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
 fastify.post("/releaseFromWorktez", (req, res) => {
    releaseFromWorktez(req, res);
 });

  /**
  * Description
  * @param {any} "/addRelease"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
   fastify.post("/addRelease", (req, res) => {
    addRelease(req, res);
 });

  /**
  * Description
  * @param {any} "/editRelease"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
   fastify.post("/editRelease", (req, res) => {
    editRelease(req, res);
 });

  /**
  * Description
  * @param {any} "/deleteRelease"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
   fastify.post("/deleteRelease", (req, res) => {
    deleteRelease(req, res);
 });

   /**
  * Description
  * @param {any} "/getAllReleases"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
    fastify.post("/getAllReleases", (req, res) => {
      getAllReleases(req, res);
   });

      /**
  * Description
  * @param {any} "/getRelease"
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
       fastify.post("/getRelease", (req, res) => {
        getRelease(req, res);
     });

 /**
  * Description
  * @param {any} req
  * @param {any} res
  * @returns {any}
  */
 exports.makeRelease = functions.https.onRequest((req, res) => {
   cors(req, res, () => {
     fastify.ready((err) => {
       if (err) throw err;
       requestHandler(req, res);
     });
   });
 });