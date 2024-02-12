import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormParametroListComponent } from './form-parametro-list.component';

describe('FormParametroListComponent', () => {
  let component: FormParametroListComponent;
  let fixture: ComponentFixture<FormParametroListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormParametroListComponent]
    });
    fixture = TestBed.createComponent(FormParametroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
