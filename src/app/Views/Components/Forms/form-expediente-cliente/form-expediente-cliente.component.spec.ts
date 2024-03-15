import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormExpedienteClienteComponent } from './form-expediente-cliente.component';

describe('FormExpedienteClienteComponent', () => {
  let component: FormExpedienteClienteComponent;
  let fixture: ComponentFixture<FormExpedienteClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormExpedienteClienteComponent]
    });
    fixture = TestBed.createComponent(FormExpedienteClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
