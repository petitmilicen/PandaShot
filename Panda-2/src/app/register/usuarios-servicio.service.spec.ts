import { TestBed } from '@angular/core/testing';

import { UsuariosServicioService } from './usuarios-servicio.service';

describe('UsuariosServicioService', () => {
  let service: UsuariosServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
