import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProcesoComponent } from './form-proceso.component';

describe('FormProcesoComponent', () => {
  let component: FormProcesoComponent;
  let fixture: ComponentFixture<FormProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormProcesoComponent]
    });
    fixture = TestBed.createComponent(FormProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
