import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionSupervisorComponent } from './selecion-supervisor.component';

describe('SelecionSupervisorComponent', () => {
  let component: SelecionSupervisorComponent;
  let fixture: ComponentFixture<SelecionSupervisorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelecionSupervisorComponent]
    });
    fixture = TestBed.createComponent(SelecionSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
