import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceForecastPage } from './place-forecast';

@NgModule({
  declarations: [
    PlaceForecastPage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceForecastPage),
  ],
})
export class PlaceForecastPageModule {}
