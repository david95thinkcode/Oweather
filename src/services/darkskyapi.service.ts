//core components
import { Injectable }                       from '@angular/core';
import { HttpClient, HttpHeaders }          from '@angular/common/http';
import { Observable }                       from 'rxjs/Observable';
import { of }                               from 'rxjs/observable/of';
import { catchError, map, tap }             from 'rxjs/operators';

import { DarkSkyApiResponse }               from '../models/darkskyapi-response.model';
import { IonicNativeGeoposition }           from '../models/ionicnative-geoposition.model';
import { darksky }                          from "../config/darksky";

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()

export class DarkSkyApiService {

    constructor (private http: HttpClient) { }

    /** GET FORECAST OF RECEIVED LOCATION
     * @param place The place that we want to get the forecast
    */
    public getCurrentForecast(origins: IonicNativeGeoposition): Observable<DarkSkyApiResponse> {
        
        let parameters: string = '';
        let language = `lang=${darksky.defaultLanguage}`;
        
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
        const url = darksky.apiBaseUrl + darksky.apiKey +'/'+parameters;
        
        return this.http.get<DarkSkyApiResponse>(url)
        .pipe(
            tap (
                (data) => { 
                //console.log(data) 
                }
            ),
            catchError(this.handleError<DarkSkyApiResponse>('getForecast'))
        );
    }

    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
      
          // TODO: send the error to remote logging infrastructure
          console.error(error); // log to console instead
      
          // TODO: better job of transforming error for user consumption
          this.log(`${operation} failed: ${error.message}`);
      
          // Let the app keep running by returning an empty result.
          return of(result as T);
        };
      }
      
      /** Log a HeroService message with the MessageService */
      private log(message: string) {
        console.log('DarkSkyApiService: ' + message);
      }
    
    /** GET FORECAST OF RECEIVED LOCATION AND THE DAY
     * @param place The place that we want to get the forecast
     * @param day the day forecast we wanna get
     */
    public getTimeMachineRequest(place: IonicNativeGeoposition, day: string) {
       
        //TODO: Write the code of this method 

    }

}