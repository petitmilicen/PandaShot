import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarImagenPage } from './agregar-imagen.page';

describe('AgregarImagenPage', () => {
  let component: AgregarImagenPage;
  let fixture: ComponentFixture<AgregarImagenPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(AgregarImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
