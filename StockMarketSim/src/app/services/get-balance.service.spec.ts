import { TestBed } from '@angular/core/testing';

import { GetBalanceService } from './get-balance.service';

describe('GetBalanceService', () => {
  let service: GetBalanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBalanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
