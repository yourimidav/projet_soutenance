export interface IGeometry {
    type: string;
    coordinates: [number, number];
  }
  
  export interface IGeoJson {
    type: string;
    geometry: IGeometry;
    properties?: any;
    id?: any;
  }
  
  export class CustomGeoJson implements IGeoJson {
    type = 'Feature';
    geometry: IGeometry;
    id?: any;
  
    constructor(coordinates: [number, number], public properties?: any) {
      this.geometry = {
        type: 'Point',
        coordinates: coordinates,
      };
    }
  }
  
  export class CustomFeatureCollection {
    type = 'FeatureCollection';
  
    constructor(public features: Array<CustomGeoJson>) {}
  }