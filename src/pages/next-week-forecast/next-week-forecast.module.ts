import { NgModule }             from '@angular/core';
import { IonicPageModule }      from 'ionic-angular';
import { NextWeekForecastPage } from './next-week-forecast';
import { ComponentsModule }     from '../../components/components.module';

@NgModule({
  declarations: [
    NextWeekForecastPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(NextWeekForecastPage),
  ],
})
export class NextWeekForecastPageModule {}
