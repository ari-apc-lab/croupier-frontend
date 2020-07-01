import { Injectable } from '@angular/core';
import { InMemoryDbService, ResponseOptions, RequestInfo} from 'angular-in-memory-web-api';

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

  // Overrides id generator and delivers next available `id`, starting with 1001.
  genId<T extends { id: any }>(collection: T[], collectionName: string): any {
    return collection.length > 0 ? Math.max(...collection.map(app => app.id)) + 1 : 10;
  }
}
