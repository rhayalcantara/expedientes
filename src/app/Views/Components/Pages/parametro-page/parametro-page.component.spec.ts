import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametroPageComponent } from './parametro-page.component';

describe('ParametroPageComponent', () => {
  let component: ParametroPageComponent;
  let fixture: ComponentFixture<ParametroPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParametroPageComponent]
    });
    fixture = TestBed.createComponent(ParametroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
