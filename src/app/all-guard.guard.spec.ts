import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { allGouardGuard } from './all-guard.guard';

describe('allGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => allGouardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
