import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaPageComponent } from './agenda-page.component';

describe('AgendaPageComponent', () => {
  let component: AgendaPageComponent;
  let fixture: ComponentFixture<AgendaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgendaPageComponent]
    });
    fixture = TestBed.createComponent(AgendaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
