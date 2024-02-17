import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionSucursalProcesoComponent } from './selecion-sucursal-proceso.component';

describe('SelecionSucursalProcesoComponent', () => {
  let component: SelecionSucursalProcesoComponent;
  let fixture: ComponentFixture<SelecionSucursalProcesoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelecionSucursalProcesoComponent]
    });
    fixture = TestBed.createComponent(SelecionSucursalProcesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
