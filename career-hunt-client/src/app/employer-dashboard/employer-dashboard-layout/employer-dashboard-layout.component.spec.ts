import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerDashbaordLayoutComponent } from './employer-dashboard-layout.component';

describe('EmployerDashbaordLayoutComponent', () => {
  let component: EmployerDashbaordLayoutComponent;
  let fixture: ComponentFixture<EmployerDashbaordLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerDashbaordLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerDashbaordLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
