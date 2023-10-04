import { TestBed } from '@angular/core/testing';

import { CustomInterceptionInterceptor } from './custom-interception.interceptor';

describe('CustomInterceptionInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CustomInterceptionInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CustomInterceptionInterceptor = TestBed.inject(CustomInterceptionInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
