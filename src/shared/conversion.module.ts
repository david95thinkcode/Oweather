/**
 * All function about temperature converson are here
 */

export module CONVERSION {

    export function convertToCelsius(fahrenheitValue : number) : number {
        let celsiusValue: number;
        celsiusValue = (fahrenheitValue - 32) / 1.8;

        return celsiusValue;
    }

    export function convertToFahrenheit(Celsius : number) : number {
        let fahr: number;
        fahr = (Celsius * 1.8) + 32;

        return fahr;
    }
}
