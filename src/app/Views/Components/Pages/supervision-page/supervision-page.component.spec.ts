import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionPageComponent } from './supervision-page.component';

describe('SupervisionPageComponent', () => {
  let component: SupervisionPageComponent;
  let fixture: ComponentFixture<SupervisionPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisionPageComponent]
    });
    fixture = TestBed.createComponent(SupervisionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
