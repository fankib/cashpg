import { Injectable } from '@angular/core';

@Injectable()
export class HkpService {

  constructor() { }

  publishKey(publicKey){
    return this.localHkp().upload(publicKey);
  }

  search(query):Promise<any>{
    var options = {
      query: query
    };
    return this.mitHkp()
      .lookup(options)
      .then(result =>{
        return (<any>window).openpgp.key.readArmored(result).keys;
      });
  }


  localHkp(){
    return new (<any>window).openpgp.HKP('http://localhost:11370');
  }

  mitHkp(){
    return new (<any>window).openpgp.HKP('https://pgp.mit.edu');
  }

}
