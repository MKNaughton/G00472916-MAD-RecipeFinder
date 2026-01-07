import { TestBed } from '@angular/core/testing';

import { RecipeApiService } from './recipe-api';

describe('RecipeApi', () => {
  let service: RecipeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
