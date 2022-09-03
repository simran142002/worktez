/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const orderId = request.body.data.OrderId;
const paymentStatus = request.body.data.PaymentStatus;
const payerName = request.body.data.PayerName;
const paymentDate = request.body.data.PaymentDate;

exports.getPaymentDetails = function(request, response) {
  const paymentsData = [];
  const status = 200;
  let result;

  const getPaymentPromise = getAllPaymentDetails().then((paymentData) => {
    paymentData.forEach((paymentDoc) => {
      paymentsData.push(paymentDoc.data());
    });
  }).catch((error) => {
    status = 500;
    console.log("Error:", error);
  });

  const promises = [getPaymentPromise];
  Promise.all(promises).then(() => {
    if (paymentsData) {
      result = {data: {status: "OK", data: paymentsData}};
      console.log("Got Payments Successfully");
      return response.status(status).send(result);
    }
  }).catch((error) => {
    console.error("Error getting Payment Details", error);
    result = {data: {status: "Error", data: undefined}};
    return response.status(status).send(result);
  });
};
