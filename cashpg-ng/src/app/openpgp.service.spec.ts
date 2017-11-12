import { TestBed, inject } from '@angular/core/testing';

import { OpenpgpService } from './openpgp.service';

describe('OpenpgpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenpgpService]
    });
  });

  it('should be created', inject([OpenpgpService], (service: OpenpgpService) => {
    expect(service).toBeTruthy();
  }));
});
