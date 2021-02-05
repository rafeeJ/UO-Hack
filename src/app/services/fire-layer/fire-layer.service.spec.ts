import { TestBed } from '@angular/core/testing';

import { FireLayerService } from './fire-layer.service';

describe('FireLayerService', () => {
  let service: FireLayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireLayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
