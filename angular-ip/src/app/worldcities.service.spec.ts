import { TestBed } from '@angular/core/testing';

import { WorldcitiesService } from './worldcities.service';

describe('WorldcitiesService', () => {
  let service: WorldcitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldcitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
