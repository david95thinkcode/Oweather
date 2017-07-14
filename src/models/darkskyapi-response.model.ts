//Learn more on : https://darksky.net/dev/docs/response

import { DarkSkyApiDataPoint }              from    './darkskyapi-datapoint.model';
import { DarkSkyApiFlag }                   from    './darkskyapi-flag.model';
import { DarkSkyApiDataBlock }              from    './darkskyapi-datablock.model';
import { DarkSkyApiAlert }                  from    './darkskyapi-alert.model';

export class DarkSkyApiResponse {
    
    latitude: number;
    longitude: number;
    timezone: string;
    
    currently: DarkSkyApiDataPoint;
    hourly: DarkSkyApiDataBlock;
    daily: DarkSkyApiDataBlock;
    minutly: DarkSkyApiDataBlock;
    alerts: DarkSkyApiAlert[];
    flags: DarkSkyApiFlag;
}