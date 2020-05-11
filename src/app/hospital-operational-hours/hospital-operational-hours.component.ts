import { Component, OnInit } from '@angular/core';
import { SETUP_OPERATIONAL_UNIT } from '../constants/opertaional-unit-setup-constants';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hospital-operational-hours',
  templateUrl: './hospital-operational-hours.component.html',
  styleUrls: ['./hospital-operational-hours.component.css']
})
export class HospitalOperationalHoursComponent implements OnInit {
  public hospitalDays = SETUP_OPERATIONAL_UNIT.hospitalDays;
  public hospitalTimings = SETUP_OPERATIONAL_UNIT.hospitalTimings;
  mondayHospitalTime = this.formBuilder.group({
    OperatingStart: ['', [Validators.required]],
    OperatingEnd: '',
    ReceivingStart: '',
    ReceivingEnd: '',
    DropOffStart: '',
    DropOffEnd: '',
  });
  tuesdayHospitalTime = this.formBuilder.group({
    OperatingStart: ['', [Validators.required]],
    OperatingEnd: '',
    ReceivingStart: '',
    ReceivingEnd: '',
    DropOffStart: '',
    DropOffEnd: '',
  });
  wednesdayHospitalTime = this.formBuilder.group({
    OperatingStart: ['', [Validators.required]],
    OperatingEnd: '',
    ReceivingStart: '',
    ReceivingEnd: '',
    DropOffStart: '',
    DropOffEnd: '',
  });
  thursdayHospitalTime = this.formBuilder.group({
    OperatingStart: ['', [Validators.required]],
    OperatingEnd: '',
    ReceivingStart: '',
    ReceivingEnd: '',
    DropOffStart: '',
    DropOffEnd: '',
  });
  fridayHospitalTime = this.formBuilder.group({
    OperatingStart: ['', [Validators.required]],
    OperatingEnd: '',
    ReceivingStart: '',
    ReceivingEnd: '',
    DropOffStart: '',
    DropOffEnd: '',
  });
  saturdayHospitalTime = this.formBuilder.group({
    OperatingStart: ['', [Validators.required]],
    OperatingEnd: '',
    ReceivingStart: '',
    ReceivingEnd: '',
    DropOffStart: '',
    DropOffEnd: '',
  });
  sundayHospitalTime = this.formBuilder.group({
    OperatingStart: ['', [Validators.required]],
    OperatingEnd: '',
    ReceivingStart: '',
    ReceivingEnd: '',
    DropOffStart: '',
    DropOffEnd: '',
  });
  setupForm = this.formBuilder.group({
    schedulerTime: new FormControl({
      value:'',
      disabled: false,
    }),
    MonTiming: this.mondayHospitalTime,
    TueTiming: this.tuesdayHospitalTime,
    WedTiming: this.wednesdayHospitalTime,
    ThuTiming: this.thursdayHospitalTime,
    FriTiming: this.fridayHospitalTime,
    SatTiming: this.saturdayHospitalTime,
    SunTiming: this.sundayHospitalTime,
  });
  constructor(    private formBuilder: FormBuilder
    ) { }

  ngOnInit(): void {
  }

}
