
/**
 * A data point object contains various properties, each representing the average (unless otherwise specified) 
 * of a particular weather phenomenon occurring during a period of time: an instant in the case of currently, 
 * a minute for minutely, an hour for hourly, and a day for daily
 */
export class DarkSkyApiDataPoint {
    placeName: string;
    icon: string;
    precipType: string;
    time: number;
    summary: number;
    temperature: number;
    nearestStormDistance: number;
    precipIntensity: number;
    precipIntensityError: number;
    precipProbability: number;  

    temperatureMax: number;
    temperatureMin: number;
    apparentTemperature: number;
    apparentTemperatureMax: number;
    apparentTemperatureMaxTime: number;
    apparentTemperatureMin: number;
    apparentTemperatureMinTime: number;
    cloudCover: number;
    dewPoint: number;
    humidity: number;
    moonPhase: number;
    windSpeed: number;
    windGust: number;
    windBearing: number;
    visibility: number;
    pressure: number;
    ozone: number;

    css_icon_class: string;
    readableday: string;

}