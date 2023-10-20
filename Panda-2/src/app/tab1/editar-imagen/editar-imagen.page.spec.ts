import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarImagenPage } from './editar-imagen.page';

describe('EditarImagenPage', () => {
  let component: EditarImagenPage;
  let fixture: ComponentFixture<EditarImagenPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
