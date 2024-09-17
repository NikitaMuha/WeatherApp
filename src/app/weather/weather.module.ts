import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherComponent } from './weather.component';
import { HeaderComponent } from '../components/header/header.component';
import { CardComponent } from '../components/card/card.component';
import { MatButtonModule } from '@angular/material/button'
import { SearchComponent } from '../components/search/search.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { HttpClientModule } from '@angular/common/http';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {MatDividerModule} from '@angular/material/divider';
import { ForecastComponent } from '../components/forecast/forecast.component';
import { ToastrModule } from 'ngx-toastr';
import { DialogComponent } from '../components/dialog/dialog.component';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonToggleModule} from '@angular/material/button-toggle';






@NgModule({
  declarations: [
    WeatherComponent,
    HeaderComponent,
    CardComponent,
    SearchComponent,
    CardComponent,
    ForecastComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    WeatherRoutingModule,
    MatButtonModule,
    AutocompleteLibModule,
    HttpClientModule,
    CdkAccordionModule,
    MatDividerModule,
    ToastrModule.forRoot(),
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
  ],
  exports: [
    HeaderComponent,
    CardComponent,
    SearchComponent,
    
  ]
})
export class WeatherModule { }
