import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormZonaListComponent } from './form-zona-list.component';

describe('FormZonaListComponent', () => {
  let component: FormZonaListComponent;
  let fixture: ComponentFixture<FormZonaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormZonaListComponent]
    });
    fixture = TestBed.createComponent(FormZonaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
