import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Identity } from '../identity';

import { IdentityService } from '../identity.service';

@Component({
  selector: 'app-identities',
  templateUrl: './identities.component.html',
  styleUrls: ['./identities.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IdentitiesComponent implements OnInit {

  identities;

  constructor(
    private identityService: IdentityService
  ) {
  }

  ngOnInit() {
    this.identities = this.identityService.findAll();
  }

}
