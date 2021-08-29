import { TestBed } from '@angular/core/testing';

import { RetirementInfoService } from './retirement-info.service';

describe('RetirementInfoService', () => {
  let service: RetirementInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetirementInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
