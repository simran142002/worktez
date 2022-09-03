/* eslint-disable max-len */
/** *********************************************************
 * Copyright (C) 2022
 * Worktez
 *
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
const {getPaymentDetails} = require("./tark/getPaymentDetails");
const {payment} = require("./tark/payment");
const {razorpay} = require("./tark/razorpay");
const {addPayment} = require("./tark/addPayment");

/**
 * Description
 * @param {any} "/getPaymentDetails"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/getPaymentDetails", (req, res) => {
  getPaymentDetails(req, res);
});

/**
 * Description
 * @param {any} "/payment"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/payment", (req, res) => {
  payment(req, res);
});

/**
 * Description
 * @param {any} "/razorpay"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/razorpay", (req, res) => {
  razorpay(req, res);
});

/**
 * Description
 * @param {any} "/addPayment"
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
fastify.post("/addPayment", (req, res) => {
  addPayment(req, res);
});

/**
 * Description
 * @param {any} req
 * @param {any} res
 * @returns {any}
 */
exports.payment = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    fastify.ready((err) => {
      if (err) throw err;
      requestHandler(req, res);
    });
  });
});


