import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Application } from './application';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const applications = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return { applications };
  }

  // Overrides the genId method to ensure that an app always has an id. If the
  // applications array is empty, the method below returns the initial number
  // (11). if the applictions array is not empty, the method below returns the
  // highest app id + 1.
  genId(applications: Application[]): number {
    return applications.length > 0 ? Math.max(...applications.map(hero => hero.id)) + 1 : 11;
  }
}
