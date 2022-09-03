/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable valid-jsdoc */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
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

 const { db } = require("../application/lib");

 /**
 * Description
 * @param {any} orderId
 * @param {any} payerName
 * @param {any} paymentDate
 * @param {any} paymentStatus
 * @param {any} paymentId
 * @return {any}
 */
exports.setPayment = function(orderId, payerName, paymentsDate, paymentId) {
    const addPaymentPromise = db.collection("Payment").doc(paymentId).set({
        OrderId: orderId,
        PayerName: payerName,
        PaymentDate: paymentsDate,
        paymentStatus: "Success",
        PaymentId: paymentId,
        PaymentCounter: 0,
    });
    return Promise.resolve(addPaymentPromise);
};