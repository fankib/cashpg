import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { IdentityService } from '../identity.service';
import { HkpService } from '../hkp.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-add-identity',
  templateUrl: './add-identity.component.html',
  styleUrls: ['./add-identity.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddIdentityComponent implements OnInit {

  name: string;

  constructor(
    private router: Router,
    private identityService: IdentityService,
    private hkpService: HkpService,
    private message: MessageService
  ) { }

  ngOnInit() {
  }

  createIdentity(){
    this.message.blockUI('Create identity')
      .then(() =>{
        this.identityService.create(this.name)
          .then(identity => {
            return this.hkpService.publishKey(identity.publicKeyArmored)
              .then(response => {
                this.message.unblockUI();
                this.identityService.addIdentity(identity);
                this.router.navigate(['/']);
              });
          })
          .catch(this.message.errorCatcher());
    });
  }
}
