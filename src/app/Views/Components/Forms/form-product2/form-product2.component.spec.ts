import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProduct2Component } from './form-product2.component';

describe('FormProduct2Component', () => {
  let component: FormProduct2Component;
  let fixture: ComponentFixture<FormProduct2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormProduct2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormProduct2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
