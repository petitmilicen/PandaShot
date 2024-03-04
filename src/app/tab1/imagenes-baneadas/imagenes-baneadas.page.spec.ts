import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImagenesBaneadasPage } from './imagenes-baneadas.page';

describe('ImagenesBaneadasPage', () => {
  let component: ImagenesBaneadasPage;
  let fixture: ComponentFixture<ImagenesBaneadasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ImagenesBaneadasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
