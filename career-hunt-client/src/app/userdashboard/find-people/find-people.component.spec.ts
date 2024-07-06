import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPeopleComponent } from './find-people.component';

describe('FindPeopleComponent', () => {
  let component: FindPeopleComponent;
  let fixture: ComponentFixture<FindPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindPeopleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
