import { Component }                            from    '@angular/core';
import { NavController, NavParams }             from    'ionic-angular';
import { DarkSkyApiResponse }                   from    '../../models/darkskyapi-response.model';
import { DarkSkyApiDataPoint }                  from    '../../models/darkskyapi-datapoint.model';
import { IonicNativeGeoposition }               from    '../../models/ionicnative-geoposition.model';
import { DarkSkyApiService }                    from    '../../services/darkskyapi.service';
import { CONVERSION }                           from     "../../shared/conversion.module";
import { IconSetter } from '../../shared/icon-setter.module';

@Component({
  selector: 'page-capitalforecast',
  templateUrl: 'capitalforecast.html'
})

export class CapitalForecastPage {

  capitalName: string = '';
  currentPosition: IonicNativeGeoposition = new IonicNativeGeoposition();
  currentForecast: DarkSkyApiDataPoint = new DarkSkyApiDataPoint();
  forecastimage: string;

  constructor(public navCtrl: NavController, navparams:NavParams ,private darkSkyApiService: DarkSkyApiService) {
    this.currentPosition = navparams.get('position');
    this.capitalName = navparams.get('name');

    this.darkSkyApiService.getCurrentForecast(this.currentPosition)
    .subscribe(
      (fetched) =>  {
        this.hydrate(fetched);
      },
      (error) => {
        console.log('ERRROOOOOOOOOOOOOR !')
      });
  }

  private hydrate(response : DarkSkyApiResponse) {
      console.log(response);
      this.currentForecast = response.currently;
      this.currentForecast.placeName = response.timezone;
      this.currentForecast.apparentTemperature = CONVERSION.convertToCelsius(this.currentForecast.apparentTemperature);
      this.currentForecast.temperature = CONVERSION.convertToCelsius(this.currentForecast.temperature);
      IconSetter.setIconToEachForecast(this.currentForecast);
  }
  
}
