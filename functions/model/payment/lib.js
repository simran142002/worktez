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
exports.setPayment = function(orderId, payerName, paymentDate, paymentId, emailAddress, paymentTime) {
    const addPaymentPromise = db.collection("Payment").doc(paymentId).set({
        OrderId: orderId,
        PayerName: payerName,
        EmailAddress: emailAddress,
        PaymentDate: paymentDate,
        PaymentTime: paymentTime,
        paymentStatus: "Success",
        PaymentId: paymentId,
        PaymentCounter: 0,
    });
    return Promise.resolve(addPaymentPromise);
};