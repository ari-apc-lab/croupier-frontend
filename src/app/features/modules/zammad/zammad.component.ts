import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-zammad',
  templateUrl: './zammad.component.html',
  styleUrls: ['./zammad.component.css']
})
export class ZammadComponent implements OnInit {

  //iFrameUrl: SafeResourceUrl; 

  constructor() { }

  //constructor(private sanitizer: DomSanitizer) {
  //  this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://support.hidalgo-project.eu/');    
  //  console.log(this.iFrameUrl)
  //}

  ngOnInit(): void {
  }

  openNewTab() {
    window.open('https://support.hidalgo-project.eu/');
  }

}
