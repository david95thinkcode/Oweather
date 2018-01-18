import { DarkSkyApiDataPoint }              from    './darkskyapi-datapoint.model';
/**
 * A data block object represents the various weather phenomena occurring over a period of time. 
 */
export class DarkSkyApiDataBlock {

    data: DarkSkyApiDataPoint[];
    summary: string;
    icon: string;
}