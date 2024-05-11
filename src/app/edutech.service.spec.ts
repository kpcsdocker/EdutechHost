import { TestBed } from '@angular/core/testing';

import { EdutechService } from './edutech.service';

describe('EdutechService', () => {
  let service: EdutechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdutechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
