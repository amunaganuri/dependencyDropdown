import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OperationalUnitSetupWebComponent } from './operational-unit-setup-web/operational-unit-setup-web.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

import { MatInputModule } from "@angular/material/input";
import {MatIconModule} from '@angular/material/icon';

import { HospitalOperationalHoursComponent } from './hospital-operational-hours/hospital-operational-hours.component';
import { HoursComponent } from './hours/hours.component'


@NgModule({
  declarations: [
    AppComponent,
    OperationalUnitSetupWebComponent,
    HospitalOperationalHoursComponent,
    HoursComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
