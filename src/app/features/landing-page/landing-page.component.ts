import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faRetweet } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {

  sideBarOpen = false;
  displayCookies: boolean;
  newsList = [
    {
      title: 'Summary from HiDALGO Plenary Meeting (May 31st to June 2nd)',
      subtitle: 'The HiDALGO Plenary Meeting happened from 31st May until 2nd June. All project partners were present not only sharing ideas and knowledge, but also discussing about different topics. w',
      link: 'https://hidalgo-project.eu/media/summary-hidalgo-plenary-meeting-may-june-2021',
      image: 'https://hidalgo-project.eu/sites/default/files/2021-06/technology-2082642.jpg'
    },
    {
      title: 'HiDALGO Booth at TERATEC 21 Online Forum Europa Village 22.-24. June 2021',
      subtitle: 'HiDALGO researchers Francisco Javier Nieto de Santos and Marcin Lawenda will be available at the virtual booth and for all meeting requests at the upcoming TERATEC online conference, 22-24 June 2021.',
      link: 'https://hidalgo-project.eu/media/hidalgo-at-teratec',
      image: 'https://hidalgo-project.eu/sites/default/files/2021-06/internet-5402033.png'
    },
    {
      title: 'Online workshop on “Tackling Global challenges with HPC, HPDA and simulations” (7th-9th July 2021)',
      subtitle: 'The EU-funded projects HiDALGO and ESIWACE kindly invite you to a joint online workshop on “Tackling Global challenges with HPC, HPDA and simulations” (Wednesday, 7th till Friday, 9th July 2021).',
      link: 'https://hidalgo-project.eu/media/workshop-on-tackling-global-challenges',
      image: 'https://hidalgo-project.eu/sites/default/files/2021-06/icon-786978.png'
    }
  ]

  constructor(
    private router: Router
  ) { }

  faRetweet = faRetweet;
  ngOnInit(): void {
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  navigateExternal(url) {
    window.open(url, "_blank");
  }

  

}
