import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {LockiEntry} from '../locki-entry';
import {LockiClientService} from '../locki-client.service';

@Component({
  selector: 'app-external-locki-dashboard',
  templateUrl: './external-locki-dashboard.component.html',
  styleUrls: ['./external-locki-dashboard.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ExternalLockiDashboardComponent implements OnInit {

  destination: string;

  lockiEntries : LockiEntry[];

  constructor(
    private lockiClientService: LockiClientService
  ) { }

  ngOnInit() {
    this.lockiEntries = this.lockiClientService.findAll();
  }

  addEntry(){
    if( this.destination == ''){
      return;
    }

    var lockiEntry = new LockiEntry();
    lockiEntry.server = this.destination;
    this.lockiClientService.addLockiEntry(lockiEntry);
    this.destination = '';
  }

  unlock(lockiEntry:LockiEntry){
    alert('unlock ' + lockiEntry.server);
  }

}
