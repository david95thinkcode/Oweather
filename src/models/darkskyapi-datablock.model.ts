import { DarkSkyApiDataPoint }              from    './darkskyapi-datapoint.model';

export class DarkSkyApiDataBlock {

    data: DarkSkyApiDataPoint[];
    summary: string;
    icon: string;
}