import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Identity } from '../identity';
import { IdentityService } from '../identity.service';

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
    private contactService: ContactService
  ) { }

  ngOnInit() {
    this.identity = this.getIdentity();
  }

  getIdentity(): Identity{
    const id = +this.route.snapshot.paramMap.get('id');
    return this.identityService.findById(id);
  }

  search(){
    this.contactService.search(this.query).then(contacts => this.contacts = contacts);
  }

  addContact(contact){
    this.identityService.addContact(this.identity, contact);
    this.router.navigate(["/identity", this.identity.id]);
  }

}
