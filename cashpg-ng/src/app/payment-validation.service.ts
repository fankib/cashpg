import { Injectable } from '@angular/core';

@Injectable()
export class PaymentValidationService {

  constructor() { }

  public validAmount(amount): boolean{
    if ( amount == null){
      return false;
    }
    if ( amount < 0 || amount > 1000000){
      return false;
    }
    return true;
  }

}
