import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarFotoPage } from './editar-foto.page';

describe('EditarFotoPage', () => {
  let component: EditarFotoPage;
  let fixture: ComponentFixture<EditarFotoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarFotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
