import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-visualizer',
  templateUrl: './visualizer.component.html',
  styleUrls: ['./visualizer.component.css']
})
export class VisualizerComponent implements OnInit {

  iFrameUrl: SafeResourceUrl; 

  constructor(private sanitizer: DomSanitizer) {
    this.iFrameUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://visualization.hidalgo-project.eu/');    
    console.log(this.iFrameUrl)
  }

  ngOnInit(): void {
  }

}
