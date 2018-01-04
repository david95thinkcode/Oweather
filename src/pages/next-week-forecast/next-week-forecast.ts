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
  
  nextWeekForcast: DarkSkyApiDataBlock = new DarkSkyApiDataBlock();
  defaultLang: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private ionicNative: IonicNativeService,
    private darkProvider: DarkSkyApiService ) {
  }

  ngOnInit() {
    this.defaultLang = DarkSkyLanguages.French;
    this.getNextWeekForecast();    
  } 
  
  private getNextWeekForecast() {

    this.ionicNative.GetMyLocation()
    .then(location => {
      this.darkProvider.getCurrentForecast(location)
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
      
      // Loop
      this.nextWeekForcast.data.forEach((element,index) => {       
        this.hydrateDayProperty(index, element)
        IconSetter.setIconToEachForecast(element);
        element.apparentTemperature = CONVERSION.convertToCelsius(element.apparentTemperature);
        element.apparentTemperatureMax = CONVERSION.convertToCelsius(element.apparentTemperatureMax);
        element.apparentTemperatureMin = CONVERSION.convertToCelsius(element.apparentTemperatureMin);
        element.temperature = CONVERSION.convertToCelsius(element.temperature);
      });
      console.log(this.nextWeekForcast);
  }  

  /** Fill the property day of Forecast object with a 
   * readable day of week */
  private hydrateDayProperty(index: number, day: DarkSkyApiDataPoint) {
    
    switch (this.defaultLang) {
      case "en":
        switch (index) {
          case 0:
            day.readableday = "Monday";
            break;
          case 1:
            day.readableday = "Tuesday";
            break;
          case 2:
            day.readableday = "Wednesday"
            break;
          case 3:
            day.readableday = "Thusday";
            break;
          case 4:
            day.readableday = "Friday";
            break;
          case 5:
            day.readableday = "Saturday";
            break;
          case 6:
            day.readableday = "Sunday";
            break;
          default:
            break;
        }        
      break;
      case "fr":
        switch (index) {
          case 0:
            day.readableday = "Lundi";
            break;
          case 1:
            day.readableday = "Mardi";
            break;
          case 2:
            day.readableday = "Mercredi";
            break;
          case 3:
            day.readableday = "Jeudi";
            break;
          case 4:
            day.readableday = "Vendredi";
            break;
          case 5:
            day.readableday = "Samedi";
            break;
          case 6:
            day.readableday = "Dimanche";
            break;
          default:
            break;
        }
        break; // fr
    
    //default language
      default:
        break;
    }
    
  }
}
