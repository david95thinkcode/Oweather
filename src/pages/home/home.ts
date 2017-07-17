import { Component }                            from    '@angular/core';
import { NavController }                        from    'ionic-angular';
import { Geolocation }                          from    '@ionic-native/geolocation';

import { DarkSkyApiResponse }                   from    '../../models/darkskyapi-response.model';
import { DarkSkyApiDataPoint }                  from    '../../models/darkskyapi-datapoint.model';
import { DarkSkyApiDataBlock }                  from    '../../models/darkskyapi-datablock.model';
import { IonicNativeGeoposition }               from    '../../models/ionicnative-geoposition.model';
import { DarkSkyApiService }                    from    '../../services/darkskyapi.service';
import { OtherPlacePage }                       from    '../../pages/otherplaces/otherplaces';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  //Object
  currentPosition: IonicNativeGeoposition = new IonicNativeGeoposition();
  currentForecast: DarkSkyApiDataPoint = new DarkSkyApiDataPoint();
  hourlyForcastFornextTwoDays: DarkSkyApiDataBlock = new DarkSkyApiDataBlock();
  response: DarkSkyApiResponse = new DarkSkyApiResponse();
  forecastimage: string; //wille store the location of imae of forecast

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private darkSkyApiService: DarkSkyApiService) {
    
    this.getCurrentPosition();
    this.darkSkyApiService.getCurrentForecast(this.currentPosition)
    .then(fetched =>  {
      this.response = fetched;
      this.hydrate();
      this.setIconToForecast(this.response.currently.icon);
    });    
  }

  /** Put value inside response to hydrate declared objects*/
  private hydrate() {
      console.log(this.response);
      this.currentForecast = this.response.currently;
      this.currentForecast.apparentTemperature = this.convertToCelsius(this.currentForecast.apparentTemperature);
      this.currentForecast.temperature = this.convertToCelsius(this.currentForecast.temperature);
      this.currentForecast.placeName = this.response.timezone;
      this.hourlyForcastFornextTwoDays = this.response.hourly;
  }

  /** Use Native Gelolcation to get device geoposition */
  private getCurrentPosition() {
    
    this.geolocation.getCurrentPosition()
    .then((response) => {
      this.currentPosition.accuracy = response.coords.accuracy;
      this.currentPosition.altitude = response.coords.altitude;
      this.currentPosition.longitude = response.coords.longitude;
      this.currentPosition.latitude = response.coords.latitude;
      this.currentPosition.speed = response.coords.speed;
      this.currentPosition.heading = response.coords.heading;
      this.currentPosition.altitudeAccuracy = response.coords.altitudeAccuracy;
    })
    .catch((error) => {
      console.log('Error getting location ==> ', error);
    })

  }

  
  private setIconToForecast(iconstring: string ) {
    switch (iconstring) {
      case "clear-day":
         this.forecastimage = "assets/img/sunny.png";
        break;
      case "clear-night":
        this.forecastimage = "";
        break;
      case "rain":
        this.forecastimage = "assets/img/rainy.png";
        break;
      case "snow":
        this.forecastimage = "assets/img/snow.png";
        break;
      case "sleet":
        this.forecastimage = "assets/img/sleet.png";
        break;
      case "wind":
        this.forecastimage = "";
        break;
      case "fog":
        this.forecastimage = "";
        break;
      case "cloudy":
        this.forecastimage = "assets/img/cloudy-day.png";
        break;
      case "partly-cloudy-day":
        this.forecastimage = "assets/img/partly-sunny.png";
        break;
      case "partly-cloudy-night":
        this.forecastimage = "assets/img/cloud.png";
        break;
      case "hail":
        this.forecastimage = "";
        break;
      case "thunderstorm":
        this.forecastimage = "assets/img/thunderstorm.png";
        break;
      case "tornado":
        this.forecastimage = "";
        break;
      default:
        break;
    }
  }

  /**
   * SHow the page with all capitals list
   */
  public showOtherLocations() {
    this.navCtrl.push(OtherPlacePage);
  }

  public convertToCelsius(fahrenheitValue: number): number {
    let celsiusValue: number;
    celsiusValue = (fahrenheitValue - 32) / 1.8;
    
    return celsiusValue;
  }

  public convertToFahrenheit(Celsius: number): number {
    let fahr:number;
    fahr = (Celsius * 1.8) + 32;

    return fahr;
  }

}
