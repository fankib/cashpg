import { Injectable } from '@angular/core';

import { LockiEntry } from './locki-entry';

@Injectable()
export class LockiClientService {

  lockiEntries: LockiEntry[];

  constructor() {
    this.load();
  }

  addLockiEntry(lockiEntry: LockiEntry){
    this.lockiEntries.push(lockiEntry);
    this.save();
  }

  findAll(){
    return this.lockiEntries;
  }

  save(){
    var data = JSON.stringify(this.lockiEntries);
    localStorage.setItem('external-locki-entries', data);
  }

  load(){
    var data = localStorage.getItem('external-locki-entries');
    this.lockiEntries = JSON.parse(data);
    if (this.lockiEntries == null ){
      this.lockiEntries = [];
    }
  }

}
