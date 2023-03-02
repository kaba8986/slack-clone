import { TestBed } from '@angular/core/testing';

import { EmojipickerService } from './emojipicker.service';

describe('EmojipickerService', () => {
  let service: EmojipickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmojipickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
