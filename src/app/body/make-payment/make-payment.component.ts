import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';
declare var Razorpay: any; 

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  rzp1;
  orderId: string;
  paymentStatus: string;
  payerMailId: string;
  payerName: string;
  // id;
  // customCard = '';
  // outletDetail;
  // payment_creation_id=null

  // obj = {
  //   reciepient_name: '',
  //   reciepient_email: '',
  //   your_name: '',
  //   your_email: '',
  //   radioValue: 500,
  //   couponCount: 1,
  //   radioValueCustom: ''
  // };

  constructor(public functions: AngularFireFunctions, private authService: AuthService) { }

  ngOnInit(): void {
  }

  options={
    "key": "rzp_live_rSjMAYRWbLGMBk",
    "amount":"5000",
    "name":"Worktez",
    "description":"Test Transaction",
    "image": "https://example.com/your_logo",
    "callback_url": "https://eneqd3r9zrjok.x.pipedream.net/",
    // "prefill": {
    //   "name": "Simran Nigam",
    //   "email": "abcd#gmail.com",
    //   "contact": "9090909000"
    // },
    "notes": {
      "address": "Razorpay Corporate O"
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  pay(){
    this.rzp1 = new this.authService.nativeWindow.Razorpay(this.options);
    this.rzp1.open();
  }
 
 

//   razorPayOptions = {
//     "key": '', // Enter the Key ID generated from the Dashboard
//     "amount": '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise or INR 500.
//     "currency": "INR",
//     "name": "Favouright",
//     "description": "favouright bill payment",
//     "order_id":"ORDERID_FROM_BACKEND",
//     "image": "https://example.com/your_logo",
//     "handler": function (response) {
//       console.log("this is the response ",response);
//     },
//     "notes": {
//         "address": "Thank you for saving people in need"
//     },
//     "theme": {
//         "color": "#8bf7a8"
//     },
// };

// Pay(event){
//   let finalObject = {
//     "user_id":"5e7a6fcd3cd6e61c5059ca62",
//     "business_id":this.outletDetail._id,
//     "amount": Number(this.obj.radioValue),
//     "recipient_name":this.obj.reciepient_name,
//     "recipient_email":this.obj.reciepient_email,
//     "user_email":this.obj.your_email,
//     "user_name":this.obj.your_name
//   }
//   console.log("this is the final object ",finalObject);

//   const callable = this.functions.httpsCallable('');
//   callable({}).subscribe({
//     next: (result) => {
//       console.log("response for purchase ");
//     let payload = result.payload;
//     if (payload["key"] && payload["dbRes"]["order"]["id"] && payload["dbRes"]["order"]["amount"]) {
//       this.razorPayOptions.key = payload["key"];
//       this.razorPayOptions.order_id = payload["dbRes"]["order"]["id"];
//       this.razorPayOptions.amount =  payload["dbRes"]["order"]["amount"];
//       this.razorPayOptions.handler =  this.razorPayResponseHandler;
//       this.payment_creation_id = payload["dbRes"]["_id"];
//       finalObject["_id"] =payload["dbRes"]["_id"]
//       sessionStorage.setItem("temp",JSON.stringify(finalObject))

//       console.log("op",this.razorPayOptions)

//     var rzp1 = new Razorpay(this.razorPayOptions);
//     rzp1.open();
//     console.log("opened");
//     } else {
//     console.log("error");
//     }
//     },
//     error: (error) => {
//       console.log(error);
//     },
//     complete: () => console.info('success')
// });
// }

// razorPayResponseHandler(response){
//    console.log("final response",response);
//   let storage_data =sessionStorage.getItem('temp') 
//   let sess =  JSON.parse(storage_data);
//   console.log("storage ",sess)
//   let paymentObject= {
//     _id:sess._id,
//     payment:response,
//     user_name:sess.user_email,
//     amount: sess.amount,
//     recipient_email:sess.recipient_email,
//     user_email:sess.user_name,
//   }
//   console.log("payment object ",paymentObject)
//   const callable = this.functions.httpsCallable('');
//   callable({}).subscribe({
//     next: (result) => {
//       console.log("success");
//       alert("payment success send to success page");
//       sessionStorage.removeItem('temp');
//     },
//     error: (error) => {
//       console.log("error in payment payment suucessfull deleted from db");
//     },
//     complete: () => console.info('successfully made payment')
//   });
// }

}