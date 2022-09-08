const {getApplicationData, updateApplication} = require("../../application/lib");
const {setPayment} = require("../lib");

exports.addPaymentDetails = function(request, response) {
//   const paymentId = request.body.data.PaymentId;
  const orderId = request.body.data.OrderId;
  const payerName = request.body.data.PayerName;
  const paymentTime = request.body.data.PaymentTime;
  const emailAddress = request.body.data.EmailAddress;
  const paymentsDate = request.body.data.PaymentDate;
  const contactNumber = request.body.data.ContactNumber;

  let result;
  const status = 200;

  const promise1 = getApplicationData().then((rawData) => {
    if (rawData) {
      let paymentCounter = rawData.PaymentCounter;
      paymentCounter = paymentCounter + 1;
      const paymentId = "Pay" + paymentCounter;

      setPayment(orderId, payerName, paymentsDate, paymentId, emailAddress, paymentTime).then((paymentData) => {
        console.log("payment added successfully");
      }).catch((error) => {
        result = {data: error};
        status = 500;
        console.error("Error", error);
      });
      const inputJson = {
        PaymentCounter: paymentCounter,
      };
      updateApplication(inputJson);
    }
  });

  const Promises = [promise1];
  return Promise.all(Promises).then(() => {
    result = {data: "User Payment Addd"};
    return response.status(status).send(result);
  }).catch((error) => {
    result = {data: error};
    console.error("Error adding Payment", error);
    return response.status(status).send(result);
  });
};