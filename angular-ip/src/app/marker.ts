import { WorldCity } from "./worldCity";

export interface Markers {
    id?: number;
    type: string;
    message: string;
    image:string;
    typegeo:string;
    coordinates:number[];
    ville?: WorldCity;
}