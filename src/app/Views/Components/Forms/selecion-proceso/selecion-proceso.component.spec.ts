import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionProcesoComponent } from './selecion-proceso.component';

describe('SelecionProcesoComponent', () => {
  let component: SelecionProcesoComponent;
  let fixture: ComponentFixture<SelecionProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelecionProcesoComponent]
    });
    fixture = TestBed.createComponent(SelecionProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
