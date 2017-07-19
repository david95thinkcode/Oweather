//core components
import {    Injectable  }                   from '@angular/core';
import {    Http  }                         from '@angular/http';
import { DarkSkyApiResponse }               from '../models/darkskyapi-response.model';
import { IonicNativeGeoposition }           from '../models/ionicnative-geoposition.model';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()

export class DarkSkyApiService {

    private baseURL: string = "https://api.darksky.net/forecast/";
    private apikey: string = "100648547e7aab78463fc9e5376031e6";
    private defaultLanguage: string = "fr";
    
    constructor (private http: Http) {
        
    }

    /** GET FORECAST OF RECEIVED LOCATION
     * @param place The place that we want to get the forecast
    */
    public getCurrentForecast(origins: IonicNativeGeoposition): Promise<DarkSkyApiResponse> {
        
        let parameters: string = '';
        let language = `lang=${this.defaultLanguage}`;
        
        if (origins.latitude == undefined || origins.latitude==undefined) { 
            console.log("Real position not get");
            //On utilisera des valeurs par défaut (de Cotonou) en attendant que le problème d'origins soit réglé
            let or : IonicNativeGeoposition = new IonicNativeGeoposition();
            or.latitude = 6.3559122;
            or.longitude = 2.436167;
            parameters = `${or.latitude},${or.longitude}?${language}`;
        }
        else {
            parameters = `${origins.latitude},${origins.longitude}?${language}`;
        }
        const url: string = this.baseURL+this.apikey+'/'+parameters;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as DarkSkyApiResponse)
        .catch(error => console.log('DarkSkyService error : ' + error));

    }
    
    /** GET FORECAST OF RECEIVED LOCATION AND THE DAY
     * @param place The place that we want to get the forecast
     * @param day the day forecast we wanna get
     */
    public getTimeMachineRequest(place: IonicNativeGeoposition, day: string) {
       
        //TODO: Write the code of this method 

    }

}