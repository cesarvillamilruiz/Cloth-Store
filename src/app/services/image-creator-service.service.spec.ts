import { TestBed } from '@angular/core/testing';

import { ImageCreatorServiceService } from './image-creator-service.service';

describe('ImageCreatorServiceService', () => {
  let service: ImageCreatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageCreatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
