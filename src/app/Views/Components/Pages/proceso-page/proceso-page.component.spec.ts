import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoPageComponent } from './proceso-page.component';

describe('ProcesoPageComponent', () => {
  let component: ProcesoPageComponent;
  let fixture: ComponentFixture<ProcesoPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProcesoPageComponent]
    });
    fixture = TestBed.createComponent(ProcesoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
