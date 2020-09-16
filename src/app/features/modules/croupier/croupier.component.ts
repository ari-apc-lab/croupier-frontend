import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-croupier',
  templateUrl: './croupier.component.html',
  styleUrls: ['./croupier.component.css']
})
export class CroupierComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  openNewTab() {
    window.open('https://sophora-103.man.poznan.pl/');
  }

}
