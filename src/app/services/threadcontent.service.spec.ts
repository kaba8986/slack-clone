import { TestBed } from '@angular/core/testing';

import { ThreadcontentService } from '../services/threadcontent.service';

describe('ThreadcontentService', () => {
  let service: ThreadcontentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadcontentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
