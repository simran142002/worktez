const Razorpay = require("razorpay");

const RazorpayConfig= {
  key_id: "",
  key_secret: "",
};

const instance = new Razorpay(RazorpayConfig);

module.exports.config = RazorpayConfig;
module.exports.Instance = instance;

