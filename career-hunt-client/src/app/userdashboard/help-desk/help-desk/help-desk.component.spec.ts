import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDeskComponent } from './help-desk.component';

describe('HelpDeskComponent', () => {
  let component: HelpDeskComponent;
  let fixture: ComponentFixture<HelpDeskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpDeskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
