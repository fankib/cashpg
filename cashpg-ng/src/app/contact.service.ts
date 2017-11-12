import { Injectable } from '@angular/core';

import { Contact } from './contact';

import { IdentityService } from './identity.service';
import { HkpService } from './hkp.service';


@Injectable()
export class ContactService {

  constructor(
    private identityService: IdentityService,
    private hkpService: HkpService
  ) { }

  search(query: string): Promise<any>{
  /*  var localContacts = new Promise((resolve, reject) =>{
      var contacts = this.identityService.findAll()
        .map(identity => {
          var contact = new Contact();
          contact.id = identity.id;
          contact.name = identity.name;
          contact.publicKeyArmored = identity.publicKeyArmored;
          contact.totalDebt = 0;
          return contact;
      });
      resolve(contacts);
    });*/

    var remoteContacts = this.hkpService.search(query)
      .then(armored =>{
          var keys = (<any>window).openpgp.key.readArmored(armored).keys;
          return keys.map(key => {
            let contact = new Contact();
            contact.id = key.primaryKey.fingerprint;
            contact.name = key.users[0].userId.userid;
            contact.totalDebt=0;
            return contact;
            });
          });

    return remoteContacts;
  }

  createContactFromId(id){
    return this.hkpService.getKey(id).then((armored) =>{
      var key = (<any>window).openpgp.key.readArmored(armored).keys[0];
      let contact = new Contact();
      contact.id = key.primaryKey.fingerprint;
      contact.name = key.users[0].userId.userid;
      contact.totalDebt=0;
      contact.publicKeyArmored=armored;
      return contact;
    });
  }

  updateWithPublicKeyArmored(contact){
    if (contact.publicKeyArmored != null){
      return new Promise((resolve, reject) => resolve(contact));
    }
    return this.hkpService.getKey(contact.id).then((armored) =>{
        contact.publicKeyArmored=armored;
        return contact;
      });
  }

}
