import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Identity } from '../identity';
import { IdentityService } from '../identity.service';
import { MessageService } from '../message.service';

import { Contact } from '../contact';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddContactComponent implements OnInit {

  identity: Identity;
  query: string;
  contacts: Contact[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private identityService: IdentityService,
    private contactService: ContactService,
    private message: MessageService,
  ) { }

  ngOnInit() {
    this.identity = this.getIdentity();
  }

  getIdentity(): Identity{
    const id = this.route.snapshot.paramMap.get('id');
    return this.identityService.findById(id);
  }

  search(){
    this.message.blockUI('Search')
      .then(() =>{
        return this.contactService.search(this.query)
          .then(contacts => {
            this.message.unblockUI();
            this.contacts = contacts
          })
          .catch(this.message.errorCatcher());
    }).catch(this.message.errorCatcher());
  }

  addContact(contact:Contact){
    if (this.identity.id == contact.id){
      this.message.error('You can not add yourself');
      return;
    }
    if (this.identityService.contains(this.identity, contact)){
      this.message.success('Already in your contacts');
      return;
    }
    this.message.blockUI('Add contact')
    .then(() =>{
      return this.contactService.updateWithPublicKeyArmored(contact).then(contact =>{
        this.message.unblockUI();
        this.identityService.addContact(this.identity, contact);
        this.router.navigate(["/identity", this.identity.id]);
      });
    })
    .catch(this.message.errorCatcher());

  }

}
