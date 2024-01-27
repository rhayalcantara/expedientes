import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParametroComponent } from './form-parametro.component';

describe('FormParametroComponent', () => {
  let component: FormParametroComponent;
  let fixture: ComponentFixture<FormParametroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormParametroComponent]
    });
    fixture = TestBed.createComponent(FormParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
