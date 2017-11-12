import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Identity } from '../identity';

import { Payment } from '../model/payment';

import { IdentityService } from '../identity.service';
import { ContactService } from '../contact.service';
import { CashpgClientService } from '../cashpg-client.service';
import { OpenpgpService } from '../openpgp.service';

@Component({
  selector: 'app-identity-detail',
  templateUrl: './identity-detail.component.html',
  styleUrls: ['./identity-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdentityDetailComponent implements OnInit {

  identity: Identity;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private identityService: IdentityService,
    private contactService: ContactService,
    private cashpgClientService: CashpgClientService,
    private openpgpService : OpenpgpService
) {
  }

  update(){
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
          });
        }else{
          this.processTransaction(contact, transaction);
        }
      }
    });
  }

  processTransaction(contact, transaction){
    this.openpgpService.decryptThenVerify({
      publicSignatureKey: contact.publicKeyArmored,
      privateDecryptionKey: this.identity.privateKeyArmored,
      message: transaction.paymentCipher
    }).then(payment =>{
      this.identityService.addIncommingTransaction(contact, transaction.id, (<Payment>payment).amount);
    });
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
