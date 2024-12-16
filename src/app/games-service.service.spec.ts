import { TestBed } from '@angular/core/testing';

import { GamesServiceService } from './games-service.service';

describe('GamesServiceService', () => {
  let service: GamesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
