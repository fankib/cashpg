import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { IdentityService } from '../identity.service';
import { Identity } from '../identity';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContactDetailComponent implements OnInit {

  @Input() contact: Contact;

  constructor(
    private route: ActivatedRoute,
    private identityService: IdentityService
  ) { }

  ngOnInit() {
    this.contact = this.getContact();
  }

  getContact(): Contact{
    const id = +this.route.snapshot.paramMap.get('id');
    const cid = +this.route.snapshot.paramMap.get('cid');
    for ( let identity of this.identityService.findAll() ){
      if ( identity.id == id ){
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
