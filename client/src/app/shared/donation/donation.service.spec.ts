import { TestBed, inject } from '@angular/core/testing';

import { DonationService } from './donation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DonationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DonationService]
    });
  });

  it('should be created', inject([DonationService], (service: DonationService) => {
    expect(service).toBeTruthy();
  }));
});
