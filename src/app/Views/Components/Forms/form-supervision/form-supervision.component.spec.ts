import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSupervisionComponent } from './form-supervision.component';

describe('FormSupervisionComponent', () => {
  let component: FormSupervisionComponent;
  let fixture: ComponentFixture<FormSupervisionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormSupervisionComponent]
    });
    fixture = TestBed.createComponent(FormSupervisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
