import { TestBed } from '@angular/core/testing';

import { ORDSDataService } from './ordsdata.service';

describe('ORDSDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ORDSDataService = TestBed.get(ORDSDataService);
    expect(service).toBeTruthy();
  });
});
