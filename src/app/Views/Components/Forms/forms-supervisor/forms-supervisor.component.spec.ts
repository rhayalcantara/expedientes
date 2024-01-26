import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsSupervisorComponent } from './forms-supervisor.component';

describe('FormsSupervisorComponent', () => {
  let component: FormsSupervisorComponent;
  let fixture: ComponentFixture<FormsSupervisorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormsSupervisorComponent]
    });
    fixture = TestBed.createComponent(FormsSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
