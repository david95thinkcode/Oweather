import {DarkSkyApiDataPoint} from "../models/darkskyapi-datapoint.model";

/**
 *
 */

export module IconSetter {

    /**Fill the property icon_class with the right icon css class
       * The css class is refered to weather-icon.css
      */
    export function setIconToEachForecast(element : DarkSkyApiDataPoint) {
        switch (element.icon) {
            case "clear-day":
                element.css_icon_class = "sunny";
                break;
            case "clear-night":
                element.css_icon_class = "moon";
                break;
            case "rain":
                element.css_icon_class = "rainy";
                break;
            case "snow":
                element.css_icon_class = "snow";
                break;
            case "sleet":
                element.css_icon_class = "";
                break;
            case "wind":
                element.css_icon_class = "";
                break;
            case "fog":
                element.css_icon_class = "";
                break;
            case "cloudy":
                element.css_icon_class = "cloudy";
                break;
            case "partly-cloudy-day":
                element.css_icon_class = "partly-sunny";
                break;
            case "partly-cloudy-night":
                element.css_icon_class = "cloudy-night";
                break;
            case "hail":
                element.css_icon_class = "";
                break;
            case "thunderstorm":
                element.css_icon_class = "thunderstorm";
                break;
            case "tornado":
                element.css_icon_class = "";
                break;
            default:
                break;
        }

        return element;
    }

    /**
     * Returns the correspondant icon css class depending of the forecast descriptive string
     * @param iconString Represents the forecast description
     */
    // Return FALSE !!! why ???
    export function GetCssClassOfForecast(iconString : string) {
        let cssClass : string;

        switch (iconString) {
            case "clear-day":
                cssClass = "sunny";
                break;
            case "clear-night":
                cssClass = "moon";
                break;
            case "rain":
                cssClass = "rainy";
                break;
            case "snow":
                cssClass = "snow";
                break;
            case "sleet":
                cssClass = "";
                break;
            case "wind":
                cssClass = "";
                break;
            case "fog":
                cssClass = "";
                break;
            case "cloudy":
                cssClass = "cloudy";
                break;
            case "partly-cloudy-day":
                cssClass = "partly-sunny";
                break;
            case "partly-cloudy-night":
                cssClass = "cloudy-night";
                break;
            case "hail":
                cssClass = "";
                break;
            case "thunderstorm":
                cssClass = "thunderstorm";
                break;
            case "tornado":
                cssClass = "";
                break;
            default:
                break;
        }

        return cssClass;
    }
}