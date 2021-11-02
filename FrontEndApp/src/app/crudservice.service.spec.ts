import { TestBed } from '@angular/core/testing';

import { Crudservice } from './crudservice.service';

describe('CrudserviceService', () => {
  let service: Crudservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Crudservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
