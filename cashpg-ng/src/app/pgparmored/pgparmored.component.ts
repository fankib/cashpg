import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pgparmored',
  templateUrl: './pgparmored.component.html',
  styleUrls: ['./pgparmored.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PgparmoredComponent implements OnInit {

  @Input() title: string;
  @Input() armored: string;

  constructor() { }

  ngOnInit() {
  }

}
