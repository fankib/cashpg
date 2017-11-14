import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CurrencyPipe } from '../currency.pipe';

import { Identity } from '../identity';

import { Payment } from '../model/payment';

import { IdentityService } from '../identity.service';
import { ContactService } from '../contact.service';
import { CashpgClientService } from '../cashpg-client.service';
import { OpenpgpService } from '../openpgp.service';
import { PaymentValidationService } from '../payment-validation.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-identity-detail',
  templateUrl: './identity-detail.component.html',
  styleUrls: ['./identity-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdentityDetailComponent implements OnInit {

  identity: Identity;
  currencyPipe: CurrencyPipe = new CurrencyPipe();

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private identityService: IdentityService,
    private contactService: ContactService,
    private cashpgClientService: CashpgClientService,
    private openpgpService : OpenpgpService,
    private paymentValidation : PaymentValidationService,
    private message : MessageService,
) {
  }

  update(){
    this.message.blockUI('Update')
      .then(this.doUpdate.bind(this));
  }

  doUpdate(){
    var to = this.identity.id;
    this.cashpgClientService.findByTo(to).subscribe(transactions =>{
      var newTransactions = [];
      for (let transaction of (<any>transactions)){
        if (! this.contains(transaction) ){
          newTransactions.push(transaction);
        }
      }
      for ( let transaction of newTransactions ){
        var from = transaction.from;
        var contact = this.identity.contacts.find(contact => contact.id == from);
        if (contact == null){
          this.contactService.createContactFromId(from).then(contact =>{
            this.identityService.addContact(this.identity, contact);
            this.processTransaction(contact, transaction);
          }).catch(this.message.errorCatcher());
        }else{
          this.processTransaction(contact, transaction);
        }
      }
      if (newTransactions.length == 0){
        this.message.unblockUI();
      }
    });
  }

  processTransaction(contact, transaction){
    this.openpgpService.decryptThenVerify({
      publicSignatureKey: contact.publicKeyArmored,
      privateDecryptionKey: this.identity.privateKeyArmored,
      message: transaction.paymentCipher
    }).then(paymentObj =>{
      var payment: Payment = (<Payment>paymentObj);
      // verify payment:
      if ( payment.id != transaction.id ){
        return;
      }
      if ( payment.to != this.identity.id ){
        return;
      }
      if (! this.paymentValidation.validAmount(payment.amount) ){
        return;
      }
      this.message.success('New payment from ' + contact.name + ' (' + this.currencyPipe.transform(payment.amount) +')');
      this.identityService.addIncommingTransaction(contact, transaction.id, payment.amount);
    });
    this.message.unblockUI();
  }

  contains(transaction){
    var id = transaction.id;
    for ( let contact of this.identity.contacts ){
      for ( let clearTx of contact.transactions ){
        if ( clearTx.id == id){
          return true;
        }
      }
    }
    return false;
  }

  // on init

  ngOnInit() {
    this.identity = this.getIdentity();
  }

  getIdentity(): Identity{
    const id = this.route.snapshot.paramMap.get('id');
    return this.identityService.findById(id);
  }

}
