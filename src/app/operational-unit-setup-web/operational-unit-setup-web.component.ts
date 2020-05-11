/*
 * Component        :   OperationalUnitSetupWebComponent
 * Description      :   This component is for setting and updating Operational Unit
 * Created On       :   15 April 2020
 * Created By       :   Mohit Gouda
 */
import { Component, OnDestroy, Inject, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {
  SETUP_OPERATIONAL_UNIT,
  LOGGER_CONSTANTS,
  timingString,
  timingConstants,
  bannerId,
  operationalUnitId,
  setupSuccessMessage,
  setupWarningMessage,
} from '../constants/opertaional-unit-setup-constants';


/**
 * This is OperationalUnitSetupWebComponent
 */
@Component({
  selector: 'app-operational-unit-setup-web',
  templateUrl: './operational-unit-setup-web.component.html',
  styleUrls: ['./operational-unit-setup-web.component.css']
})
export class OperationalUnitSetupWebComponent implements OnDestroy {
  setupForm: any;
  public subscription: Subscription;
  storedData: any;
  filteredOptions: Observable<string[]>;
  public schedulerIncrements = SETUP_OPERATIONAL_UNIT.schedulerIncrements;
  public hospitalDays = SETUP_OPERATIONAL_UNIT.hospitalDays;
  public hospitalTimings = SETUP_OPERATIONAL_UNIT.hospitalTimings;
  time: any;
  setupData: any;
  operationalUnitAddresses: any = [];
  practiceTypes: any = '';
  dayControls: any;
  hospitalHoursPayload: any = [];
  formData = [];
  loadSetupData = true;
  @ViewChild('customTemplate', { static: true }) customNotificationTmpl;
  /**
   * Creates an instance of OperationalUnitSetupWebComponent
   * @param {OperationalUnitAdminFacade} operationalUnitFacade
   * @param {FormBuilder} formBuilder
   * @param {LoggingService} logService
   */
  constructor(
    private formBuilder: FormBuilder,
   
  ) {
  
    // this.getOperationalUnitData();
    this.addFormGroups();

   
  }


  /**
   * @Memberof OperationalUnitSetupWebComponent
   * This is to Add form group
   */
  addFormGroups() {
    this.operationalUnitAddresses = [];
    // for (let addressObject of this.setupData.address) {
    //   let address = '';
    //   if (addressObject.addressLine1 !== '') {
    //     address = address + addressObject.addressLine1.replace(',', '') + ', ';
    //   }
    //   if (addressObject.addressLine2 !== '') {
    //     address = address + addressObject.addressLine2.replace(',', '') + ', ';
    //   }
    //   if (addressObject.city !== '') {
    //     address = address + addressObject.city.replace(',', '') + ', ';
    //   }
    //   if (addressObject.state.name !== '') {
    //     address = address + addressObject.state.name.replace(',', '') + ', ';
    //   }
    //   if (addressObject.country.name !== '') {
    //     address = address + addressObject.country.name.replace(',', '') + ', ';
    //   }
    //   if (addressObject.zipCode !== '') {
    //     address = address + addressObject.zipCode.replace(',', '');
    //   }
    //   this.operationalUnitAddresses.push(address);
    // }
    // this.practiceTypes = '';
    // for (let practice of this.setupData.practiceTypes) {
    //   this.practiceTypes = this.practiceTypes + practice.name + ', ';
    // }
    // this.practiceTypes = this.practiceTypes.substring(
    //   0,
    //   this.practiceTypes.length - 2
    // );
    const mondayHospitalTime = this.formBuilder.group({
      OperatingStart: ['', [Validators.required]],
      OperatingEnd: '',
      ReceivingStart: '',
      ReceivingEnd: '',
      DropOffStart: '',
      DropOffEnd: '',
    });
    const tuesdayHospitalTime = this.formBuilder.group({
      OperatingStart: ['', [Validators.required]],
      OperatingEnd: '',
      ReceivingStart: '',
      ReceivingEnd: '',
      DropOffStart: '',
      DropOffEnd: '',
    });
    const wednesdayHospitalTime = this.formBuilder.group({
      OperatingStart: ['', [Validators.required]],
      OperatingEnd: '',
      ReceivingStart: '',
      ReceivingEnd: '',
      DropOffStart: '',
      DropOffEnd: '',
    });
    const thursdayHospitalTime = this.formBuilder.group({
      OperatingStart: ['', [Validators.required]],
      OperatingEnd: '',
      ReceivingStart: '',
      ReceivingEnd: '',
      DropOffStart: '',
      DropOffEnd: '',
    });
    const fridayHospitalTime = this.formBuilder.group({
      OperatingStart: ['', [Validators.required]],
      OperatingEnd: '',
      ReceivingStart: '',
      ReceivingEnd: '',
      DropOffStart: '',
      DropOffEnd: '',
    });
    const saturdayHospitalTime = this.formBuilder.group({
      OperatingStart: ['', [Validators.required]],
      OperatingEnd: '',
      ReceivingStart: '',
      ReceivingEnd: '',
      DropOffStart: '',
      DropOffEnd: '',
    });
    const sundayHospitalTime = this.formBuilder.group({
      OperatingStart: ['', [Validators.required]],
      OperatingEnd: '',
      ReceivingStart: '',
      ReceivingEnd: '',
      DropOffStart: '',
      DropOffEnd: '',
    });
    this.setupForm = this.formBuilder.group({
      schedulerTime: new FormControl({
        value:'',
        disabled: false,
      }),
      MonTiming: mondayHospitalTime,
      TueTiming: tuesdayHospitalTime,
      WedTiming: wednesdayHospitalTime,
      ThuTiming: thursdayHospitalTime,
      FriTiming: fridayHospitalTime,
      SatTiming: saturdayHospitalTime,
      SunTiming: sundayHospitalTime,
    });
    if (this.setupForm) {
      this.validateForm();
    }
    this.populateHours();
  
  }
  /**
   * @Memberof OperationalUnitSetupWebComponent
   * This is to Validate form
   */
  validateForm() {
    this.setupForm.valueChanges.subscribe(() => {
      this.formValueChange();
    });
    
  }

  formValueChange() {
    for (let day of this.hospitalDays) {
      this.dayControls = this.setupForm.controls[day.name + timingString];
      if (
        this.dayControls.value.OperatingStart === 1 ||
        this.dayControls.value.OperatingStart === 2 ||
        this.dayControls.value.OperatingStart === ''
      ) {
        this.dayControls.controls.OperatingEnd.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.OperatingEnd.clearValidators({
          emitEvent: false,
        });
        this.dayControls.controls.OperatingEnd.updateValueAndValidity({
          emitEvent: false,
        });
      } else {
        this.dayControls.controls.OperatingEnd.setValidators(
          Validators.required,
          { emitEvent: false }
        );
        this.dayControls.controls.OperatingEnd.updateValueAndValidity({
          emitEvent: false,
        });
      }
      if (
        this.dayControls.value.ReceivingStart === 1 ||
        this.dayControls.value.ReceivingStart === 2 ||
        this.dayControls.value.ReceivingStart === ''
      ) {
        this.dayControls.controls.ReceivingEnd.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingEnd.clearValidators({
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingEnd.updateValueAndValidity({
          emitEvent: false,
        });
      } else {
        this.dayControls.controls.ReceivingEnd.setValidators(
          Validators.required,
          { emitEvent: false }
        );
        this.dayControls.controls.ReceivingEnd.updateValueAndValidity({
          emitEvent: false,
        });
      }
      if (
        this.dayControls.value.DropOffStart === 1 ||
        this.dayControls.value.DropOffStart === 2 ||
        this.dayControls.value.DropOffStart === ''
      ) {
        this.dayControls.controls.DropOffEnd.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.DropOffEnd.clearValidators({
          emitEvent: false,
        });
        this.dayControls.controls.DropOffEnd.updateValueAndValidity({
          emitEvent: false,
        });
      } else {
        this.dayControls.controls.DropOffEnd.setValidators(
          Validators.required,
          { emitEvent: false }
        );
        this.dayControls.controls.DropOffEnd.updateValueAndValidity({
          emitEvent: false,
        });
      }
      if (this.dayControls.value.OperatingStart === 2) {
        this.dayControls.controls.OperatingEnd.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.OperatingEnd.clearValidators({
          emitEvent: false,
        });
        this.dayControls.controls.OperatingEnd.updateValueAndValidity({
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingStart.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingStart.clearValidators({
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingStart.updateValueAndValidity({
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingEnd.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingEnd.clearValidators({
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingEnd.updateValueAndValidity({
          emitEvent: false,
        });
        this.dayControls.controls.DropOffStart.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.DropOffStart.clearValidators({
          emitEvent: false,
        });
        this.dayControls.controls.DropOffStart.updateValueAndValidity({
          emitEvent: false,
        });
        this.dayControls.controls.DropOffEnd.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.DropOffEnd.clearValidators({
          emitEvent: false,
        });
        this.dayControls.controls.DropOffEnd.updateValueAndValidity({
          emitEvent: false,
        });
      }
      if (
        this.dayControls.value.OperatingStart !== 1 &&
        (this.dayControls.value.OperatingStart >
          this.dayControls.value.ReceivingStart ||
          this.dayControls.value.OperatingEnd <
            this.dayControls.value.ReceivingStart)
      ) {
        this.dayControls.controls.ReceivingStart.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingStart.updateValueAndValidity({
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingEnd.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingEnd.clearValidators({
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingEnd.updateValueAndValidity({
          emitEvent: false,
        });
      }
      if (
        this.dayControls.value.OperatingStart !== 1 &&
        (this.dayControls.value.OperatingStart >
          this.dayControls.value.ReceivingEnd ||
          this.dayControls.value.OperatingEnd <
            this.dayControls.value.ReceivingEnd)
      ) {
        this.dayControls.controls.ReceivingEnd.setValue('', {
          emitEvent: false,
        });
        this.dayControls.controls.ReceivingEnd.clearValidators({
          emitEvent: false,
        });
        if (
          this.dayControls.value.ReceivingStart !== '' &&
          this.dayControls.value.ReceivingStart !== 1 &&
          this.dayControls.value.ReceivingStart !== 2
        ) {
          this.dayControls.controls.ReceivingEnd.setValidators(
            Validators.required,
            { emitEvent: false }
          );
        }
        this.dayControls.controls.ReceivingEnd.updateValueAndValidity({
          emitEvent: false,
        });
      }
    }
    
  }
  /**
   * @Memberof OperationalUnitSetupWebComponent
   * This function is to close setup and route to landing page
   */
  closeSetup() {
   
  }
  /**
   * @Memberof OperationalUnitSetupWebComponent
   * This function is to populate Hours
   */
  populateHours() {
    if (this.hospitalHoursPayload?.length > 0) {
      this.formData = this.hospitalHoursPayload;
    } else {
      this.formData = this.setupData.hospitalHours;
    }
    for (let day of this.formData) {
      for (let weekday of this.hospitalDays) {
        this.dayControls = this.setupForm.controls[day.day + timingString];
        if (day.id === weekday.id) {
          for (let workingHours of day.workingHours) {
            if (workingHours.type === timingConstants[0].value) {
              if (workingHours.from.id !== '') {
                this.dayControls.controls.OperatingStart.setValue(
                  Number(workingHours.from.id),
                  {
                    emitEvent: false,
                  }
                );
                this.dayControls.controls.OperatingStart.updateValueAndValidity(
                  {
                    emitEvent: false,
                  }
                );
              }
              if (workingHours.to.id !== '') {
                this.dayControls.controls.OperatingEnd.setValue(
                  Number(workingHours.to.id),
                  {
                    emitEvent: false,
                  }
                );
                this.dayControls.controls.OperatingEnd.updateValueAndValidity({
                  emitEvent: false,
                });
              }
            }
            if (workingHours.type === timingConstants[1].value) {
              if (workingHours.from.id !== '') {
                this.dayControls.controls.ReceivingStart.setValue(
                  Number(workingHours.from.id),
                  {
                    emitEvent: false,
                  }
                );
                this.dayControls.controls.OperatingStart.updateValueAndValidity(
                  {
                    emitEvent: false,
                  }
                );
              }
              if (workingHours.to.id !== '') {
                this.dayControls.controls.ReceivingEnd.setValue(
                  Number(workingHours.to.id),
                  {
                    emitEvent: false,
                  }
                );
                this.dayControls.controls.ReceivingEnd.updateValueAndValidity({
                  emitEvent: false,
                });
              }
            }
            if (workingHours.type === 'dropOff') {
              if (workingHours.from.id !== '') {
                this.dayControls.controls.DropOffStart.setValue(
                  Number(workingHours.from.id),
                  {
                    emitEvent: false,
                  }
                );
                this.dayControls.controls.DropOffStart.updateValueAndValidity({
                  emitEvent: false,
                });
              }
              if (workingHours.to.id !== '') {
                this.dayControls.controls.DropOffEnd.setValue(
                  Number(workingHours.to.id),
                  {
                    emitEvent: false,
                  }
                );
                this.dayControls.controls.DropOffEnd.updateValueAndValidity({
                  emitEvent: false,
                });
              }
            }
          }
        }
      }
    }
   
  }
  /**
   * @Memberof OperationalUnitSetupWebComponent
   * This function is to update Operational Unit
   */
  updateOperationalUnit() {
    this.setupForm.markAllAsTouched();
    if (!this.setupForm.invalid) {
      this.hospitalHoursPayload = [];
      for (let day of this.hospitalDays) {
        this.dayControls = this.setupForm.controls[day.name + timingString];
        let operatingDay = {
          id: timingConstants[0].id,
          type: timingConstants[0].value,
          from: {
            id: '',
            value: '',
          },
          to: {
            id: '',
            value: '',
          },
        };
        let operateFrom;
        let operateTo;
        if (this.dayControls.value.OperatingStart === '') {
          operateFrom = {
            id: '',
            value: '',
          };
        } else {
          operateFrom = {
            id: this.hospitalTimings[
              this.dayControls.value.OperatingStart - 1
            ].id.toString(),
            value: this.hospitalTimings[
              this.dayControls.value.OperatingStart - 1
            ].value,
          };
        }
        if (this.dayControls.value.OperatingEnd === '') {
          operateTo = {
            id: '',
            value: '',
          };
        } else {
          operateTo = {
            id: this.hospitalTimings[
              this.dayControls.value.OperatingEnd - 1
            ].id.toString(),
            value: this.hospitalTimings[this.dayControls.value.OperatingEnd - 1]
              .value,
          };
        }
        operatingDay.from = operateFrom;
        operatingDay.to = operateTo;
        let receiveFrom;
        let receiveTo;
        let receivingDay = {
          id: timingConstants[1].id,
          type: timingConstants[1].value,
          from: {
            id: '',
            value: '',
          },
          to: {
            id: '',
            value: '',
          },
        };
        if (this.dayControls.value.ReceivingStart === '') {
          receiveFrom = {
            id: '',
            value: '',
          };
        } else {
          receiveFrom = {
            id: this.hospitalTimings[
              this.dayControls.value.ReceivingStart - 1
            ].id.toString(),
            value: this.hospitalTimings[
              this.dayControls.value.ReceivingStart - 1
            ].value,
          };
        }
        if (this.dayControls.value.ReceivingEnd === '') {
          receiveTo = {
            id: '',
            value: '',
          };
        } else {
          receiveTo = {
            id: this.hospitalTimings[
              this.dayControls.value.ReceivingEnd - 1
            ].id.toString(),
            value: this.hospitalTimings[this.dayControls.value.ReceivingEnd - 1]
              .value,
          };
        }
        receivingDay.from = receiveFrom;
        receivingDay.to = receiveTo;
        let dropFrom;
        let dropTo;
        let dropOffDay = {
          id: timingConstants[2].id,
          type: timingConstants[2].value,
          from: {
            id: '',
            value: '',
          },
          to: {
            id: '',
            value: '',
          },
        };
        if (this.dayControls.value.DropOffStart === '') {
          dropFrom = {
            id: '',
            value: '',
          };
        } else {
          dropFrom = {
            id: this.hospitalTimings[
              this.dayControls.value.DropOffStart - 1
            ].id.toString(),
            value: this.hospitalTimings[this.dayControls.value.DropOffStart - 1]
              .value,
          };
        }
        if (this.dayControls.value.DropOffEnd === '') {
          dropTo = {
            id: '',
            value: '',
          };
        } else {
          dropTo = {
            id: this.hospitalTimings[
              this.dayControls.value.DropOffEnd - 1
            ].id.toString(),
            value: this.hospitalTimings[this.dayControls.value.DropOffEnd - 1]
              .value,
          };
        }
        dropOffDay.from = dropFrom;
        dropOffDay.to = dropTo;
        let dayObject = {
          id: day.id,
          day: day.name,
          workingHours: [operatingDay, receivingDay, dropOffDay],
        };
        this.hospitalHoursPayload.push(dayObject);
      }
      let schedulePayload;
      this.schedulerIncrements.forEach((timeObject) => {
        if (timeObject.id === this.setupForm.controls.schedulerTime.value) {
          schedulePayload = timeObject;
        }
      });
      // this.operationalUnitFacade.getState(
      //   AdminSelectors.operationalUnitSchedulerResponse
      // );
      // this.operationalUnitFacade.setState(
      //   adminActions.onScheduleSuccess({
      //     SchedulePayload: {
      //       bannerId,
      //       ouId: operationalUnitId,
      //       reqObj: schedulePayload,
      //     },
      //   })
      // );
      // const ScheduleSuccess = this.operationalUnitFacade.getState(
      //   adminActions.onScheduleSuccess
      // );
      // if (ScheduleSuccess) {
      //   this.showSuccessNotification(setupSuccessMessage);
      // }
      // this.operationalUnitFacade.getState(
      //   AdminSelectors.getOperationalUnitWorkHourResponse
      // );
      // this.operationalUnitFacade.setState(
      //   adminActions.getOperationalUnitWorkinghoursSuccess({
      //     WorkHoursPayload: {
      //       bannerId,
      //       ouId: operationalUnitId,
      //       requestPayload: this.hospitalHoursPayload,
      //     },
      //   })
      // );
      // const workingHoursPass = this.operationalUnitFacade.getState(
      //   adminActions.getOperationalUnitWorkinghoursSuccess
      // );
      // if (workingHoursPass) {
      //   // this.getOUData();
      // }
    } else {
      // this.showWarningNotification(setupWarningMessage);
    }
   
  }
  /**
   * @Memberof OperationalUnitSetupWebComponent
   * This function is to get Operational Unit Data
   */
  async getOperationalUnitData() {
    const payload = {
      bannerId: 800001,
      OUId: 700001
    }
    
  }
  /**
   * @Memberof OperationalUnitSetupWebComponent
   * This is Lifecycle method to destroy the subscription
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
