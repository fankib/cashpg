import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-fingerprint',
  templateUrl: './fingerprint.component.html',
  styleUrls: ['./fingerprint.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FingerprintComponent implements OnInit {

  @Input() fingerprint: string;

  first: string;
  second: string;

  constructor() { }

  ngOnInit() {
    var packets = [];
    packets.push(this.fingerprint.substring(0, 4));
    packets.push(this.fingerprint.substring(4, 8));
    packets.push(this.fingerprint.substring(8, 12));
    packets.push(this.fingerprint.substring(12, 16));
    this.first=packets.join(' ');

    packets = [];
    packets.push(this.fingerprint.substring(16, 20));
    packets.push(this.fingerprint.substring(20, 24));
    packets.push(this.fingerprint.substring(24, 28));
    packets.push(this.fingerprint.substring(28, 32));
    this.second=packets.join(' ');
  }

}
