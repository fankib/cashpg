import { Injectable } from '@angular/core';

@Injectable()
export class HkpService {

  constructor() { }

  publishKey(publicKey){
    return this.mitHkp().upload(publicKey);
  }

  search(query):Promise<any>{
    return new Promise((resolve, reject) =>{
      try{
        var options = {
          query: query
        };
        this.mitHkp()
          .lookup(options).then(resolve);
      } catch ( error ){
        reject('no result');
      }
    });
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
