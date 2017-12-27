import { TestBed, inject } from '@angular/core/testing';

import { LockiClientService } from './locki-client.service';

describe('LockiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LockiClientService]
    });
  });

  it('should be created', inject([LockiClientService], (service: LockiClientService) => {
    expect(service).toBeTruthy();
  }));
});
