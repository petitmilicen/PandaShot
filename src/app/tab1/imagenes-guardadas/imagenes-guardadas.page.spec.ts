import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagenesGuardadasPage } from './imagenes-guardadas.page';

describe('ImagenesGuardadasPage', () => {
  let component: ImagenesGuardadasPage;
  let fixture: ComponentFixture<ImagenesGuardadasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImagenesGuardadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
