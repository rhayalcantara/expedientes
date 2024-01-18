import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormZonasComponent } from './form-zonas.component';

describe('FormZonasComponent', () => {
  let component: FormZonasComponent;
  let fixture: ComponentFixture<FormZonasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormZonasComponent]
    });
    fixture = TestBed.createComponent(FormZonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
