import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Application } from '../features/applications/application';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const applications = [
      {
        id: 10,
        name: 'Social Networks',
        description:
          'Analyze and simulate the spread of information in social networks',
        owner: 1
      },
      {
        id: 20,
        name: 'Urban Air Pollution',
        description:
          'Analyze and simulate the evolution of air pollution in urban areas',
        owner: 1
      },
      {
        id: 30,
        name: 'Migration',
        description: 'Analyze and simulate migration flows and refugee movements',
        owner: 1
      }
    ];

    const instances = [
      {
        id: 11,
        name: 'Single run',
        description: 'Test with only one core',
        owner: 1,
        app: 10,
        lastExecution: 'abcd'
      },
      {
        id: 12,
        name: '4 cores run',
        description: 'Test with 4 cores',
        owner: 2,
        app: 10,
        lastExecution: 'abcd'
      },
      {
        id: 13,
        name: 'Full run',
        description: '4x24 cores',
        owner: 2,
        app: 10,
        lastExecution: 'abcd'
      },
      {
        id: 21,
        name: 'Single run',
        description: 'Test with only one core',
        owner: 2,
        app: 20,
        lastExecution: 'abcd'
      },
      {
        id: 22,
        name: '4 cores run',
        description: 'Test with 4 cores',
        owner: 2,
        app: 20,
        lastExecution: 'abcd'
      },
      {
        id: 23,
        name: 'Full run',
        description: '4x24 cores',
        owner: 1,
        app: 20,
        lastExecution: 'abcd'
      },
      {
        id: 31,
        name: 'Single run',
        description: 'Test with only one core',
        owner: 1,
        app: 30,
        lastExecution: 'abcd'
      },
      {
        id: 32,
        name: '4 cores run',
        description: 'Test with 4 cores',
        owner: 1,
        app: 30,
        lastExecution: 'abcd'
      },
      {
        id: 33,
        name: 'Full run',
        description: '4x24 cores',
        owner: 1,
        app: 30,
        lastExecution: 'abcd'
      }
    ];

    return { applications, instances };
  }

  // Overrides the genId method to ensure that an app always has an id. If the
  // applications array is empty, the method below returns the initial number
  // (11). if the applictions array is not empty, the method below returns the
  // highest app id + 1.
  genId(applications: Application[]): number {
    return applications.length > 0
      ? Math.max(...applications.map(hero => hero.id)) + 1
      : 11;
  }
}
