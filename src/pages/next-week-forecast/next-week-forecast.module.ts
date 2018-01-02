import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NextWeekForecastPage } from './next-week-forecast';

@NgModule({
  declarations: [
    NextWeekForecastPage,
  ],
  imports: [
    IonicPageModule.forChild(NextWeekForecastPage),
  ],
})
export class NextWeekForecastPageModule {}
