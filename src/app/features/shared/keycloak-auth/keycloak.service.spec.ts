import { TestBed } from '@angular/core/testing';

// import { KeycloakService } from './keycloak.service';
import { KeycloakService } from 'keycloak-angular';
import { AuthService } from './auth.service';

describe('KeycloakService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KeycloakService = TestBed.get(KeycloakService);
    expect(service).toBeTruthy();
  });
});
