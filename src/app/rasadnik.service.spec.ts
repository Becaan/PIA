import { TestBed } from '@angular/core/testing';

import { RasadnikService } from './rasadnik.service';

describe('RasadnikService', () => {
  let service: RasadnikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RasadnikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
