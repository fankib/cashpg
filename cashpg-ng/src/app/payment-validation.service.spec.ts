import { TestBed, inject } from '@angular/core/testing';

import { PaymentValidationService } from './payment-validation.service';

describe('PaymentValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PaymentValidationService]
    });
  });

  it('should be created', inject([PaymentValidationService], (service: PaymentValidationService) => {
    expect(service).toBeTruthy();
  }));
});
