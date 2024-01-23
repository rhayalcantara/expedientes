import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisoresPageComponent } from './supervisores-page.component';

describe('SupervisoresPageComponent', () => {
  let component: SupervisoresPageComponent;
  let fixture: ComponentFixture<SupervisoresPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisoresPageComponent]
    });
    fixture = TestBed.createComponent(SupervisoresPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
