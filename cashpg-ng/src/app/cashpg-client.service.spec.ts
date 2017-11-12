import { TestBed, inject } from '@angular/core/testing';

import { CashpgClientService } from './cashpg-client.service';

describe('CashpgClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CashpgClientService]
    });
  });

  it('should be created', inject([CashpgClientService], (service: CashpgClientService) => {
    expect(service).toBeTruthy();
  }));
});
