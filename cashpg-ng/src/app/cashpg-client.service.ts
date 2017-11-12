import { Injectable } from '@angular/core';

import {Transaction} from './model/transaction';
import {Payment} from './model/payment';

@Injectable()
export class CashpgClientService {

  transactions: Transaction[]=[];

  constructor() { }

  publish(transaction: Transaction){
    this.transactions.push(transaction);
  }

  findByTo(to:number){
    return this.transactions.filter(transaction => {return transaction.to == to});
  }

}
