import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  rzp1;
  orderId: string;
  paymentStatus: string;
  payerMailId: string;
  payerName: string;

  constructor(public functions: AngularFireFunctions, private authService: AuthService) { }

  ngOnInit(): void {
  }

  options={
    "key": "rzp_live_rSjMAYRWbLGMBk",
    "amount":"100",
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

}
