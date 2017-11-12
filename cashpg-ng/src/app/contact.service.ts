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
    var localContacts = this.identityService.findAll()
    .map(identity => {
      var contact = new Contact();
      contact.id = +('2'+identity.id);
      contact.name = identity.name;
      contact.publicKeyArmored = identity.publicKeyArmored;
      contact.totalDebt = 0;
      return contact;
    });

    return this.hkpService.search(query)
      .then(keys =>{
          return keys.map(key => {
            var contact = new Contact();
            contact.name = key.users[0].userId.userid;
            return contact;
          });
      });

  }

}
