import { Injectable } from '@angular/core';

import {Identity} from './identity';
import {Contact} from './contact';

import {Transaction} from './model/transaction';
import {Payment} from './model/payment';

import {CashpgClientService} from './cashpg-client.service';
import {OpenpgpService} from './openpgp.service';
import {IdentityService} from './identity.service';

@Injectable()
export class PaymentService {

  constructor(
    private cashpgClient: CashpgClientService,
    private openpgpService: OpenpgpService,
    private identityService: IdentityService
  ) { }

  uuid():number {
    return Math.floor(Math.random() * 1000000);
  }

  sendPayment(identity: Identity, contact:Contact, amount:number){
    var payment = new Payment();
    payment.amount = amount;
    return this.openpgpService.encryptThenSign({
      privateSignatureKey: identity.privateKeyArmored,
      publicEncryptionKey: contact.publicKeyArmored,
      message: payment
    }).then(cipher =>{
      var transaction = new Transaction();
      transaction.id = this.uuid();
      transaction.from = identity.id;
      transaction.to = contact.id;
      transaction.paymentCipher = cipher;
      this.cashpgClient.publish(transaction);
      this.identityService.addOutgoingTransaction(contact, transaction.id, amount);
    });
  }

}
