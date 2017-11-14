import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  welcome;

  constructor(
    private route: ActivatedRoute,
    private identityService: IdentityService,
  ) {

    var source = this.route.snapshot.queryParams["source"];
    if ( Math.random() < 0.1 && (source === undefined || source != 'homescreen')){
    //  this.welcome = "Add me to your homescreen!";
    }
  }

  ngOnInit() {
    this.identities = this.identityService.findAll();



  }

}
