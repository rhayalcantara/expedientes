import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProductoParametroComponent } from './form-producto-parametro.component';

describe('FormProductoParametroComponent', () => {
  let component: FormProductoParametroComponent;
  let fixture: ComponentFixture<FormProductoParametroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProductoParametroComponent]
    });
    fixture = TestBed.createComponent(FormProductoParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
