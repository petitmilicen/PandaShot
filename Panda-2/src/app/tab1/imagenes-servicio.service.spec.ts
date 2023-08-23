import { TestBed } from '@angular/core/testing';

import { ImagenesServicioService } from './imagenes-servicio.service';

describe('ImagenesServicioService', () => {
  let service: ImagenesServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagenesServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
