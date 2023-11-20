import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagenDetallePage } from './imagen-detalle.page';

describe('ImagenDetallePage', () => {
  let component: ImagenDetallePage;
  let fixture: ComponentFixture<ImagenDetallePage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ImagenDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
