import { TestBed } from '@angular/core/testing';

import { AppContentService } from './app-content.service';

describe('AppContentService', () => {
  let service: AppContentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppContentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
