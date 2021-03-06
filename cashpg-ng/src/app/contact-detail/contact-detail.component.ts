import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { IdentityService } from '../identity.service';
import { MessageService } from '../message.service';

import { Identity } from '../identity';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactDetailComponent implements OnInit {

  identityId: string;
  contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private identityService: IdentityService,
    private message: MessageService
  ) { }

  verify(){
    console.log('jump here');
    var verified = this.identityService.toggleVerify(this.contact);
    if ( verified ){
      this.message.success('Fingerpint marked as verified');
    }
  }

  ngOnInit() {
    this.contact = this.getContact();
    
  }

  getContact(): Contact{
    this.identityId = this.route.snapshot.paramMap.get('id');
    var cid = this.route.snapshot.paramMap.get('cid');
    for ( let identity of this.identityService.findAll() ){
      if ( identity.id == this.identityId ){
        for ( let contact of identity.contacts){
          if ( contact.id == cid ){
            return contact;
          }
        }
      }
    }
    return null;
  }

}
