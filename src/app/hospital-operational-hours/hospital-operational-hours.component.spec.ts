import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalOperationalHoursComponent } from './hospital-operational-hours.component';

describe('HospitalOperationalHoursComponent', () => {
  let component: HospitalOperationalHoursComponent;
  let fixture: ComponentFixture<HospitalOperationalHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HospitalOperationalHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HospitalOperationalHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
