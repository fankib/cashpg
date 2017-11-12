import { TestBed, inject } from '@angular/core/testing';

import { HkpService } from './hkp.service';

describe('HpkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HkpService]
    });
  });

  it('should be created', inject([HkpService], (service: HkpService) => {
    expect(service).toBeTruthy();
  }));
});
