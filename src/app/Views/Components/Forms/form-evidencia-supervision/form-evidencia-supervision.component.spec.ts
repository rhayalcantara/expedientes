import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEvidenciaSupervisionComponent } from './form-evidencia-supervision.component';

describe('FormEvidenciaSupervisionComponent', () => {
  let component: FormEvidenciaSupervisionComponent;
  let fixture: ComponentFixture<FormEvidenciaSupervisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEvidenciaSupervisionComponent]
    });
    fixture = TestBed.createComponent(FormEvidenciaSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
