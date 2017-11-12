import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { IdentityService } from '../identity.service';
import { HkpService } from '../hkp.service';

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
    private hkpService: HkpService
  ) { }

  ngOnInit() {
  }

  createIdentity(){
    this.identityService.create(this.name).then(identity => {
      this.hkpService.publishKey(identity.publicKeyArmored)
        .then(response => {
          console.log(response);
          this.router.navigate(['/']);
        });
    });
  }
}
