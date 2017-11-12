import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {Transaction} from './model/transaction';
import {Payment} from './model/payment';

@Injectable()
export class CashpgClientService {

  server="https://cashpg.benjamin-fankhauser.ch";
  // prod:
  // server = '';

  constructor(
    private http: HttpClient
  ) { }

  publish(transaction: Transaction){
    this.http.post(this.server + '/api/transaction', transaction).subscribe();
  }

  findByTo(to:string){
    return this.http.get(this.server + '/api/transaction/' + to);
  }

}
