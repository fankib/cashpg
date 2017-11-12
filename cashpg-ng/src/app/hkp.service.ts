import { Injectable } from '@angular/core';

@Injectable()
export class HkpService {

  constructor() { }

  publishKey(publicKey){
    return this.mitHkp().upload(publicKey);
  }

  search(query):Promise<any>{
    var options = {
      query: query
    };
    return this.mitHkp()
      .lookup(options);
  }

  getKey(fingerprint):Promise<any>{
    var options = {
      keyId: fingerprint
    }
    return this.mitHkp().lookup(options);
  }


  localHkp(){
    return new (<any>window).openpgp.HKP('http://localhost:11370');
  }

  mitHkp(){
    return new (<any>window).openpgp.HKP('https://pgp.mit.edu');
  }

}
