import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Identity } from '../identity';
import { Contact } from '../contact';

import { IdentityService } from '../identity.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentComponent implements OnInit {

  identity: Identity;
  contact: Contact;
  amountStr: string;
  currency: string = "Fr";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private identityService: IdentityService,
    private paymentService: PaymentService
  ) { }

  sendPayment(){
    var amount = parseInt(this.amountStr);
    if ( amount !== amount ){ // ugly NaN check
      return;
    }
    if ( this.currency == 'Fr' ){
      amount = amount * 100;
    }
    this.paymentService.sendPayment(this.identity, this.contact, amount).then(obj => {
      this.router.navigate(['../'], {
        relativeTo: this.route
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
