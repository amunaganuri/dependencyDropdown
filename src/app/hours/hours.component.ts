import { Component, OnInit, Input } from '@angular/core';
import { SETUP_OPERATIONAL_UNIT, ControlOperators } from '../constants/opertaional-unit-setup-constants';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';




@Component({
  selector: 'app-hours',
  templateUrl: './hours.component.html',
  styleUrls: ['./hours.component.css']
})
export class HoursComponent implements OnInit {

  @Input()
  parentFormGroup: FormGroup;
  @Input()
  childFormGroup: string

  OperatingStartHours: Observable<any>;
  OperatingEndHours: Observable<any>;
  RecievingStartHours: Observable<any>;
  RecievingEndHours: Observable<any>;
  DropoffStartHours: Observable<any>;
  DropoffEndHours: Observable<any>;


  constructor(private builder: FormBuilder) { }
  setupForm: FormGroup;

  ngOnInit(): void {
    this.setupForm = this.builder.group({
      operatingStartHours: [null, [Validators.required]],
      operatingEndHours: [null, [Validators.required]],
      recievingStartHours: [null, [Validators.required]],
      recievingEndHours: [null, [Validators.required]],
      dropOffStartHours: [null, [Validators.required]],
      dropOffEndHours: [null, [Validators.required]],
    })
    this.parentFormGroup.addControl(this.childFormGroup, this.setupForm);

    this.OperatingStartHours = this.setupForm.get('operatingStartHours').valueChanges
      .pipe(

        startWith(this.setupForm.get('operatingStartHours').value),
        map(value => this._operationalStartHoursFilter(value, [...SETUP_OPERATIONAL_UNIT.hospitalTimings]))
      );
    this.OperatingEndHours = this.setupForm.get('operatingEndHours').valueChanges
      .pipe(
        startWith(this.setupForm.get('operatingEndHours').value),
        map(value => this._operationalEndHoursFilter(value, [...SETUP_OPERATIONAL_UNIT.hospitalTimings]))
      );
    this.RecievingStartHours = this.setupForm.get('recievingStartHours').valueChanges
      .pipe(
        startWith(this.setupForm.get('recievingStartHours').value),
        map(value => this._recievingStartHoursFilter(value, [...SETUP_OPERATIONAL_UNIT.hospitalTimings]))
      );
    this.RecievingEndHours = this.setupForm.get('recievingEndHours').valueChanges
      .pipe(
        startWith(this.setupForm.get('recievingEndHours').value),
        map(value => this._recievingEndHoursFilter(value, [...SETUP_OPERATIONAL_UNIT.hospitalTimings]))
      );
    this.DropoffStartHours = this.setupForm.get('dropOffStartHours').valueChanges
      .pipe(
        startWith(this.setupForm.get('dropOffStartHours').value),
        map(value => this._dropoffStartHoursFilter(value, [...SETUP_OPERATIONAL_UNIT.hospitalTimings]))
      );
    this.DropoffEndHours = this.setupForm.get('dropOffEndHours').valueChanges
      .pipe(
        startWith(this.setupForm.get('dropOffEndHours').value),
        map(value => this._dropoffEndHoursFilter(value, [...SETUP_OPERATIONAL_UNIT.hospitalTimings]))
      );


  }

  toggleControls(controls, canEnableControl) {
    controls.forEach(control => {
      let operationalUnitControl = this.setupForm.get(control);
      if (canEnableControl) {
        operationalUnitControl.enable()
      }
      else {
        operationalUnitControl.setValue(null);
        operationalUnitControl.disable();
      }
    });
  }

  handleDependencySource(val, dependentField, Operator = ControlOperators.GREATER_THAN, controlOperand?) {
    let selectedControl = SETUP_OPERATIONAL_UNIT.hospitalTimings.filter(hour => hour.value == val);
    if (selectedControl.length) {
      if (Operator == ControlOperators.GREATER_THAN)
        return [...SETUP_OPERATIONAL_UNIT.hospitalTimings].filter(hour => hour.id > selectedControl[0].id);
      if (Operator == ControlOperators.GREATER_THAN_EQUAL)
        return [...SETUP_OPERATIONAL_UNIT.hospitalTimings].filter(hour => hour.id >= selectedControl[0].id)
      if (Operator == ControlOperators.LESS_THAN_EQUAL)
        return [...SETUP_OPERATIONAL_UNIT.hospitalTimings].filter(hour => hour.id <= selectedControl[0].id)
      if (Operator == ControlOperators.IN_BETWEEN) {
        let controlValue = this.customValueHandler(controlOperand);
        let dependentControlId = SETUP_OPERATIONAL_UNIT.hospitalTimings.filter(hour => hour.value == controlValue);
        return [...SETUP_OPERATIONAL_UNIT.hospitalTimings]
          .filter(hour => hour.id >= selectedControl[0].id && hour.id < (dependentControlId.length ? dependentControlId[0].id : ''))
      }
      if (Operator == ControlOperators.IN_BETWEEN_TEST) {
        let controlValue = this.setupForm.get(controlOperand).value
        let dependentControlId = SETUP_OPERATIONAL_UNIT.hospitalTimings.filter(hour => hour.value == controlValue);
        return [...SETUP_OPERATIONAL_UNIT.hospitalTimings]
          .filter(hour => hour.id > selectedControl[0].id && hour.id <= (dependentControlId.length ? dependentControlId[0].id : ''))
      }

    }


  }
  private _operationalStartHoursFilter(value: string, dropdownSource): { id: number, value: string; }[] {
    const filterValue = value ? value : '';
    switch (filterValue) {
      case "Closed":
        let Operatingcontrols = ['operatingEndHours', 'recievingStartHours', 'recievingEndHours', 'dropOffStartHours', 'dropOffEndHours']
        this.toggleControls(Operatingcontrols, false);
        break;
      case "24 Hours":
        console.log("landed");
        let disbleControls = ['operatingEndHours']
        this.toggleControls(disbleControls, false);
        let enableControls = ['recievingStartHours', 'dropOffStartHours']
        this.toggleControls(enableControls, true);
        break;
      default:
        let defaultControls = ['operatingEndHours', 'dropOffStartHours']
        this.toggleControls(defaultControls, filterValue);
        let canReset = this.compareControls('operatingStartHours', 'operatingEndHours');
        if (canReset) {
          this.setupForm.get('operatingEndHours').setValue(null)
        }
        else {
          this.setupForm.get('operatingEndHours').setValue(this.setupForm.get('operatingEndHours').value)
        }
    }
    return dropdownSource.filter(option => option.value.includes(filterValue));
  }
  private _operationalEndHoursFilter(value: string, dropdownSource): { id: number, value: string; }[] {
    const filterValue = value ? value : '';
    let controlValue = this.customValueHandler('operatingStartHours');
    this.toggleControls(['recievingStartHours'], filterValue);
    let canResetRecievingStart = this.compareControls('recievingStartHours', 'operatingEndHours');
    if (canResetRecievingStart) {
      this.setupForm.get('recievingStartHours').setValue(null)
    }
    let canResetRecievingEnd = this.compareControls('recievingEndHours', 'operatingEndHours');
    if (canResetRecievingEnd) {
      this.setupForm.get('recievingEndHours').setValue(null)
    }
    if (controlValue) {
      let dataSource = this.handleDependencySource(controlValue, '')
      return dataSource ? dataSource.filter(option => option.value.includes(filterValue)) : [];
    }

    return []
  }
  private _recievingStartHoursFilter(value: string, dropdownSource): { id: number, value: string; }[] {
    const filterValue = value ? value : '';
    let Operatingcontrols = ['recievingEndHours']
    switch (filterValue) {
      case "Closed":
        this.toggleControls(Operatingcontrols, false);
        break;
      case "24 Hours":
        this.toggleControls(Operatingcontrols, false);
        break;
      default:
        this.toggleControls(Operatingcontrols, filterValue);
        let controlValue = this.customValueHandler('operatingStartHours');
        let dataSource = this.handleDependencySource(controlValue, '', ControlOperators.IN_BETWEEN, 'operatingEndHours')
        let canReset = this.compareControls('recievingStartHours', 'recievingEndHours');
        if (canReset) {
          this.setupForm.get('recievingEndHours').setValue(null)
        }
        else {
          this.setupForm.get('recievingEndHours').setValue(this.setupForm.get('recievingEndHours').value);
        }
        return dataSource ? dataSource.filter(option => option.value.includes(filterValue)) : [];
    }
  }
  private _recievingEndHoursFilter(value: string, dropdownSource): { id: number, value: string; }[] {
    const filterValue = value ? value.toLowerCase() : '';
    let controlValue = this.customValueHandler('recievingStartHours');
    let dataSource = this.handleDependencySource(controlValue, '', ControlOperators.IN_BETWEEN_TEST, 'operatingEndHours')
    return dataSource ? dataSource.filter(option => option.value.includes(filterValue)) : [];
  }
  private _dropoffStartHoursFilter(value: string, dropdownSource): { id: number, value: string; }[] {
    const filterValue = value ? value : '';
    let Operatingcontrols = ['dropOffEndHours']
    switch (filterValue) {
      case "Closed":
        this.toggleControls(Operatingcontrols, false);
        break;
      case "24 Hours":
        this.toggleControls(Operatingcontrols, false);
        break;
      default:
        this.toggleControls(Operatingcontrols, filterValue);
        let canReset = this.compareControls('dropOffStartHours', 'dropOffEndHours');
        if (canReset) {
          this.setupForm.get('dropOffEndHours').setValue(null)
        }
        else {
          this.setupForm.get('dropOffEndHours').setValue(this.setupForm.get('dropOffEndHours').value);
        }
        return dropdownSource.filter(option => option.value.includes(filterValue));
    }
  }
  private _dropoffEndHoursFilter(value: string, dropdownSource): { id: number, value: string; }[] {
    const filterValue = value ? value.toLowerCase() : '';
    let controlValue = this.customValueHandler('dropOffStartHours');
    let dataSource = this.handleDependencySource(controlValue, '')
    return dataSource ? dataSource.filter(option => option.value.includes(filterValue)) : [];
  }


  customValueHandler(controlName) {
    let controlValue = this.setupForm.get(controlName).value;
    console.log(controlValue);
    if (controlValue == '24 Hours' || controlValue == 'Closed') {
      return controlValue;
      // return SETUP_OPERATIONAL_UNIT.hospitalTimings.filter(timing => timing.value == controlValue)[0].id
    }
    else if (controlValue == "0" || controlValue) {
      let controlValues = controlValue.split(':');
      controlValues[0] = controlValues[0].length == 1 ? `0${controlValues[0]}` : `${controlValues[0]}`;
      if (controlValues.length == 1) {

        controlValues.push('00');
      }
      else {
        let fractionalPart = controlValues[1].length == 1 ? `${controlValues[1]}0` : `${controlValues[1]}`
        let fractionalPartAfterRound = `${Math.round(parseInt(fractionalPart) / 15) * 15}`;
        controlValues[1] = fractionalPartAfterRound.length == 1 ? `${fractionalPartAfterRound}0` : fractionalPartAfterRound;
      }
      controlValue = controlValues.join(':');
      return controlValue;
    }
    return '';
  }
  compareControls(control1, control2) {
    const firstControl = this.setupForm.get(control1).value;
    const secondControl = this.setupForm.get(control2).value;
    let formattedControl1 = this.customValueHandler(control1);
    let formattedControl2 = this.customValueHandler(control2);
    return this.compareHours(formattedControl1, formattedControl2);
  }
  compareHours(startTime, endTime) {
    var regExp = /(\d{1,2})\:(\d{1,2})/;
    if (!(parseInt(endTime.replace(regExp, "$1$2")) > parseInt(startTime.replace(regExp, "$1$2")))) {
      return true;
    }
    return false

  }

  resetValue() {
    [
      this.setupForm.get('operatingStartHours').setValue('')
    ]
  }

  displayFn(hour): string {
    return hour && hour.value ? hour.value : '';
  }

}
