import { Component, OnInit } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler/error-handler.service';
import { PopupHandlerService } from 'src/app/services/popup-handler/popup-handler.service';
import { ToolsService } from 'src/app/services/tool/tools.service';

declare var jQuery:any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  enableLoader: boolean = false;
  showClose: boolean = false;
  componentName: string = "MAKE-PAYMENT";

  makePaymentForm = new FormGroup({
    payerName: new FormControl('', Validators.required),
    emailAddress: new FormControl('',[Validators.required, Validators.email]),
    contactNumber: new FormControl(null, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
  })

  get payerName(){return this.makePaymentForm.get('payerName')};
  get emailAddress(){return this.makePaymentForm.get('emailAddress')};
  get contactNumber(){return this.makePaymentForm.get('contactNumber')};


  constructor(public popupHandlerService: PopupHandlerService, private functions: AngularFireFunctions, public errorHandlerService: ErrorHandlerService, private toolService: ToolsService, public router: Router) { }

  ngOnInit(): void {
  console.log();
  }

  onSubmit(form: NgForm){
    this.enableLoader=true;
    const payerName = this.payerName.value;
    const emailAddress = this.emailAddress.value;
    const contactNumber = this.contactNumber.value;
    const date = this.toolService.date();
    const time = this.toolService.time();

    const callable = this.functions.httpsCallable('payment/addPaymentDetails');
    callable({PayerName: payerName, EmailAddress: emailAddress, ContactNumber: contactNumber, PaymentDate: date, PaymentTime: time}).subscribe({
      next: (data) => {
        console.log('Successfully submited payment details');
      },
      error: (error) => {
        this.errorHandlerService.getErrorCode(this.componentName, "InternalErrors");
        this.enableLoader=false;
        console.error(error);
      },
      complete: () => {
        console.info('Successfully submited payment details');
        this.enableLoader=false;
        this.showClose=true; 
        this.router.navigate(['/Checkout']);
      }
    })
  }

  close(){
    jQuery('#makePayment').modal('hide');
    this.showClose = false;
    this.makePaymentForm.reset();
  }

}
