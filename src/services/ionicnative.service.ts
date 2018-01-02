//core components
import { Injectable  }                   from    '@angular/core';
import { Http  }                         from    '@angular/http';
import { Geolocation }                   from    '@ionic-native/geolocation';
import { IonicNativeGeoposition   }      from    '../models/ionicnative-geoposition.model';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class IonicNativeService {

    constructor(private geolocation: Geolocation) {  }

    /**GET THE LOCATION OF DEVICE USING NATIVE GEOLOCATION DATA */
    public loadCurrentLocation() {
        
        return this.geolocation.getCurrentPosition()
            .then((response) =>  response.coords as IonicNativeGeoposition)
            .catch((error) => console.log("Unable to get location because => " + error));
    }
    
    
    public GetMyLocation() {
        
        return this.geolocation.getCurrentPosition()
            .then((response) =>  response.coords as IonicNativeGeoposition)
            .catch((error) => console.log("Unable to get location because => " + error.message));
    }
}