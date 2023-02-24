import { WorldCity } from "./worldCity";

export interface Temperature {
    id?: number;
    temp: number;
    dateReleve: string;
    feelsLike: number;
    temperatureMin: number;
    temperatureMax: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grndLevel: number;
    ville?: WorldCity;
  }