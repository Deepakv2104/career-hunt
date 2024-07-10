import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationDetailsDialogComponent } from './application-details-dialog.component';

describe('ApplicationDetailsDialogComponent', () => {
  let component: ApplicationDetailsDialogComponent;
  let fixture: ComponentFixture<ApplicationDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
