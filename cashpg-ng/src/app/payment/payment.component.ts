import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Identity } from '../identity';
import { Contact } from '../contact';

import { IdentityService } from '../identity.service';
import { PaymentService } from '../payment.service';
import { PaymentValidationService } from '../payment-validation.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {

  identity: Identity;
  contact: Contact;
  comment: string;
  amountStr: string;
  currency: string = "Fr";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private identityService: IdentityService,
    private paymentService: PaymentService,
    private paymentValidation: PaymentValidationService,
    private message : MessageService
  ) { }

  sendPayment(){
    var amountFloat = parseFloat(this.amountStr);
    if ( amountFloat !== amountFloat ){ // ugly NaN check
      this.message.error('Not a number!');
      return;
    }
    if ( this.currency == 'Fr' ){
      amountFloat = amountFloat * 100;
    }
    var amount = Math.floor(amountFloat);

    if ( ! this.paymentValidation.validAmount(amount) ){
      this.message.error('Invalid amount!');
      return false;
    }

    this.message.blockUI('Send payment')
      .then(()=>{
        this.paymentService.sendPayment(this.identity, this.contact, this.comment, amount).then(obj => {
          this.message.unblockUI();
          this.router.navigate(['../'], {
            relativeTo: this.route
          });
        });
      });

  }

  ngOnInit() {
    this.loadContact();
  }

  // copy paste
  loadContact(){
    const id = this.route.snapshot.paramMap.get('id');
    const cid = this.route.snapshot.paramMap.get('cid');
    for ( let identity of this.identityService.findAll() ){
      if ( identity.id == id ){
        this.identity = identity;
        for ( let contact of identity.contacts){
          if ( contact.id == cid ){
            this.contact = contact;
            return;
          }
        }
      }
    }
    return;
  }

}
