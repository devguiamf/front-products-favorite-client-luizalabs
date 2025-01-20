import { TestBed } from '@angular/core/testing';

import { FavoritesService } from './favorites.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FavoritesService', () => {
  let service: FavoritesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Inclua o módulo de teste HTTP
      providers: [FavoritesService],
    });
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
