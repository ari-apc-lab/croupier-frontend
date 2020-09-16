import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ckan',
  templateUrl: './ckan.component.html',
  styleUrls: ['./ckan.component.css']
})
export class CkanComponent implements OnInit {

  iFrameUrl: SafeResourceUrl; 

  constructor(private sanitizer: DomSanitizer) {
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://hidalgo1.man.poznan.pl/');    
    console.log(this.iFrameUrl)
  }

  ngOnInit(): void {
  }

}
