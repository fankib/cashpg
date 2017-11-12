import { Injectable } from '@angular/core';
import { Identity } from './identity';
import { Contact } from './contact';
import { ClearTransaction } from './clear-transaction';

import { Transaction } from './model/transaction';

import { OpenpgpService } from './openpgp.service';

@Injectable()
export class IdentityService {

  identities: Identity[];
  idCounter: number = 1;

  constructor(
    private openpgpService: OpenpgpService
  ) {
    this.load();
  }

  create(name): Promise<Identity>{
    let promise = new Promise<Identity>((resolve, reject) => {
      var email = name+'@cashpg.ch';
      this.openpgpService.generateKey(name, email).then(key => {

        let identity = new Identity();

        identity.privateKeyArmored =  (<any>key).privateKeyArmored;
        identity.publicKeyArmored = (<any>key).publicKeyArmored;

        identity.id=this.idCounter++;
        identity.name=email;
        identity.contacts = [];

        this.identities.push(identity);
        this.save();

        resolve(identity);
      });
    });
    return promise;
  }

  findAll(){
    return this.identities;
  }

  findById(id:number){
    return this.findAll()
      .find(identity => identity.id == id);
  }

  addContact(identity, contact){
    identity.contacts.push(contact);
    this.save();
  }

  addOutgoingTransaction(contact:Contact, id:number, amount:number){
    var clearTransaction = new ClearTransaction();
    clearTransaction.id = id;
    clearTransaction.outgoing = true;
    clearTransaction.amount = amount;
    contact.transactions.push(clearTransaction);
    this.updateTotal(contact);
    this.save();
  }

  addIncommingTransaction(contact:Contact, id:number, amount:number){
    var clearTransaction = new ClearTransaction();
    clearTransaction.id = id;
    clearTransaction.outgoing = false;
    clearTransaction.amount = amount;
    contact.transactions.push(clearTransaction);
    this.updateTotal(contact);
    this.save();
  }

  updateTotal(contact:Contact){
    var incommings = contact.transactions.filter(transaction => !transaction.outgoing);
    var outgoings = contact.transactions.filter(transaction => transaction.outgoing);

    var sum = function(a, b){return a+b};

    var sumIn = incommings
      .map(transaction => transaction.amount)
      .reduce(sum, 0);

    var sumOut = outgoings
      .map(transaction => transaction.amount)
      .reduce(sum, 0);

    contact.totalDebt = sumOut - sumIn;
  }

  save(){
    var data = JSON.stringify(this.identities);
    localStorage.setItem('identities', data);
  }

  load(){
    var data = localStorage.getItem('identities');
    this.identities = JSON.parse(data);
    if (this.identities == null ){
      this.identities = [];
      return;
    }
    this.idCounter = this.identities[this.identities.length-1].id+1;
  }

}
