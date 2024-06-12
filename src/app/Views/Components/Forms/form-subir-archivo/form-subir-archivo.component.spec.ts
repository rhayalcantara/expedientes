import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubirArchivoComponent } from './form-subir-archivo.component';

describe('FormSubirArchivoComponent', () => {
  let component: FormSubirArchivoComponent;
  let fixture: ComponentFixture<FormSubirArchivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSubirArchivoComponent]
    });
    fixture = TestBed.createComponent(FormSubirArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
