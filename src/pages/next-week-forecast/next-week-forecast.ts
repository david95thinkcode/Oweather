import { Component, OnInit }                   from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { IonicNativeService }                  from    '../../services/ionicnative.service';
import { DarkSkyApiService }                   from '../../services/darkskyapi.service';
import { error }                               from '@firebase/database/dist/esm/src/core/util/util';
import { DarkSkyApiDataPoint }                 from '../../models/darkskyapi-datapoint.model';
import { DarkSkyApiDataBlock }                 from '../../models/darkskyapi-datablock.model';
import { DarkSkyApiResponse }                  from '../../models/darkskyapi-response.model';
import { DarkSkyLanguages }                    from '../../config/darksky';
import { CONVERSION }                          from "../../shared/conversion.module";
import { IconSetter }                          from "../../shared/icon-setter.module";
import { ReadableDay }                         from '../../shared/readableday.module';
import { IonicNativeGeoposition }              from '../../models/ionicnative-geoposition.model';

/**
 * Generated class for the NextWeekForecastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-next-week-forecast',
  templateUrl: 'next-week-forecast.html',
})
export class NextWeekForecastPage implements OnInit {
  
  online: boolean = false;
  nextWeekForcast: DarkSkyApiDataBlock = new DarkSkyApiDataBlock();
  defaultLang: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private ionicNative: IonicNativeService,
    private darkProvider: DarkSkyApiService ) { }

  ngOnInit() {
    this.defaultLang = DarkSkyLanguages.French;    
    if (this.online) {
      this.getNextWeekForecast();
    }        
  } 
  

  private getNextWeekForecast() {

    this.ionicNative.GetMyLocation()
    .then(location => {
      this.darkProvider.getCurrentForecast(location as IonicNativeGeoposition)
      .subscribe(
        (response) => {
          console.log(response);
          this.hydrate(response)
        },
        (error) => {
          console.log('Something were wrong');
        })
    })
    .catch(error => console.log('Failed to fetch response from API'))

  } 

  private hydrate(response : DarkSkyApiResponse) {
      // this.currentForecast = this.response.currently;
      // this.currentForecast.placeName = this.response.timezone;
      this.nextWeekForcast = response.daily;
      this.nextWeekForcast.data.splice(0,1); // Removing the first data cause it represents the current day (today)
      
      // Loop for each element of next Week Forecast
      this.nextWeekForcast.data.forEach((element,index) => {
        
        element.readableday = ReadableDay.getReadableDayByIndex(index, this.defaultLang)
        IconSetter.setIconToEachForecast(element);
        
        // Below, we convert all needed temperature to Celcius
        element.apparentTemperature = CONVERSION.convertToCelsius(element.apparentTemperature);
        element.apparentTemperatureMax = CONVERSION.convertToCelsius(element.apparentTemperatureMax);
        element.apparentTemperatureMin = CONVERSION.convertToCelsius(element.apparentTemperatureMin);
        element.temperature = CONVERSION.convertToCelsius(element.temperature);
        element.temperatureMin = CONVERSION.convertToCelsius(element.temperatureMin);
        element.temperatureMax = CONVERSION.convertToCelsius(element.temperatureMax);
      });
      console.log(this.nextWeekForcast);
  }
}
