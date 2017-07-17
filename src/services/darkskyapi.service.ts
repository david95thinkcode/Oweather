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

    /** RECUPERE LES PREVISIONS D'UN LIEU RECU EN PARAMETRE
     * @param origins Objet représentant la position du lieu dont on veut afficher les prévisions
     */
    public getCurrentForecast(origins: IonicNativeGeoposition): Promise<DarkSkyApiResponse> {
        
        let parameters: string = '';
        let language = `lang=${this.defaultLanguage}`;

        //TODO: régler le problème de réception de origins
        if (origins.latitude == undefined || origins.latitude==undefined) { 
            //On utilisera des valeurs par défaut en attendant que le problème d'origins soit réglé
            let or : IonicNativeGeoposition = new IonicNativeGeoposition();
            or.latitude = 6.3604233;
            or.longitude = 2.3769492000000003;
            parameters = `${or.latitude},${or.longitude}?${language}`;
        }
        else {
            parameters = `${origins.latitude},${origins.longitude}`;
        }
        const url: string = this.baseURL+this.apikey+'/'+parameters;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as DarkSkyApiResponse)
        .catch(error => console.log('DarkSkyService error : ' + error));

    }

    /** GET FORECAST OF RECEIVED LOCATION
     * @param place Le lieu dont on veut récupérer la prévision
     */
    public getTimeMachineRequest(place: IonicNativeGeoposition) :Promise<DarkSkyApiResponse> {
        
        console.log(place);
        const parameters: string = `${place.latitude},${place.longitude}`;
        let parameters2: string = "";
        
        const url: string = this.baseURL+this.apikey+'/'+parameters;

        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as DarkSkyApiResponse)
        .catch(error => console.log('DarkSkyService error : ' + error))

    }

}