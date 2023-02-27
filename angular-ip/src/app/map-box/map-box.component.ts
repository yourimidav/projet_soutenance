import { Component } from '@angular/core';
import { Map, AnySourceImpl, Marker } from 'mapbox-gl';
import { MapService } from '../map.service';
import { CustomFeatureCollection, CustomGeoJson } from '../map';
import { environment } from 'src/environments/environment.development';
import { FeatureCollection } from 'geojson';
import { WeatherService } from '../weather.service';
import { MarkersService } from '../markers.service';
import { Markers } from '../marker';
import * as mapboxgl from 'mapbox-gl';
import { WorldcitiesService } from '../worldcities.service';
import { WorldCity } from '../worldCity';
import { Temperature } from '../temperature';
import { TemperatureService } from '../temperature.service';
import { Location } from '@angular/common';
//import { MatButtonToggleGroup } from '@angular/material/button-toggle';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css'],
})

export class MapBoxComponent {
  map!: Map; // la carte
  style: string = 'mapbox://styles/mapbox/light-v11'; // style de la carte
  lat: number = 0; // latitude à l'initialisation
  lng: number = 1.297352; // longitude à l'initialisation
  message: string = 'Bonjour'; // message à afficher sous le marqueur

  source: any; // source pour créer un marqueur (image)
  markers: CustomGeoJson[] = []; // liste des marqueurs

  iconId: string = '10d'; // icône représentant la météo
  sourceId: string = 'weather'; // nom par défaut de la source de données
  layerId: string = 'weather-layer'; // nom par défaut du layer

  //Datas for a Marker
  marker1!:Markers;
  type1!: string;
  message1!: string;
  image1!:string;
  typegeo1!:string;
  coordinates1!:number[];

  nomville!:string;
  temp!:string;

  cities: WorldCity[] = [];
  //city!: WorldCity;
  temperatures:Temperature[]=[];
  makers: Markers[]=[];

  //Data for a City
  cityName!: string;
  cityAscii!: string;
  latitude!: number;
  longitude!: number;
  normeIso!: string;
  countryName!: string;

  //Datas for Temperature
  temper!: number;
  dateReleve!: string;
  feelsLike!: number;
  temperatureMin!: number;
  temperatureMax!: number;
  pressure!: number;
  humidity!: number;
  sea_level!: number;
  grndLevel!: number;

  city!: WorldCity;
  marqueur!: Markers;
  markerGeoJson!: CustomGeoJson;

  //Data pour recuperer le nom du pays
  associatedCountryName = new Intl.DisplayNames(['en'], { type: 'region' });

  //mapboxgl!: MapboxG;

  //mapboxgl.accessToken = 'You access token ';


  // état initial du bouton
  toggleButtonState: string = 'weather';
  // couleurs de marqueur disponibles
  colors = [
    'blue',
    'gray',
    'green',
    'orange',
    'pink',
    'purple',
    'red',
    'yellow',
  ];

  constructor(
    private weatherService: WeatherService,
    private mapService: MapService,
    private markerService: MarkersService,
    private worldCitiesService: WorldcitiesService,
    private temperatureService: TemperatureService,
    private location: Location,
    ) {}

  ngOnInit() {
    // zoom sur la localisation de l'utilisateur
    this.initializeMap();
    // récupération des marqueurs enregistrés en base de données
    this.loadMarkers();
  }

  // lorsque le bouton change d'état
  onToggleChange() {
    if (this.toggleButtonState == 'weather') {
      //this.weatherService.getWeatherFromcoord()
      this.iconId = '10d';
      return;
    }

    const random_number = Math.floor(Math.random() * this.colors.length);
    this.iconId = this.colors[random_number];
  }

  //mapboxgl.accessToken 
  

  loadMarkers(): void {
    // Appel du service pour faire une requête HTTP
    this.markerService.getAllMarkers().subscribe((data: Markers[]) => {
        data.forEach((marker)=> {
          this.markers.push(new CustomGeoJson([marker.coordinates[1],marker.coordinates[0]],{message:marker.message,image:marker.image}))
        })
        console.log(this.markers)
      //this.markers = data;
    });
  }

  setMarkers(): void {
    // Mise à jour des données
    const features = new CustomFeatureCollection(this.markers);
    this.source.setData(features);
  }

  private initializeMap(): void {
    // Demande de localisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        // La fonction flyTo permet de se rendre à une destination
        // avec un effet de dézoom suivi d'un zoom
        this.map.flyTo({
          center: [this.lng, this.lat],
        });
      });
    }
    // création de la carte
    this.buildMap();
  }

  buildMap() {
    // instance d'une carte
    this.map = new Map({
      // stocké dans le fichier environments/environment.development.ts
      accessToken: environment.mapbox.accessToken,
      container: 'map', // référence à la div dans le document HTML
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });

    // attente du chargement de la carte avant
    // d'effectuer quoi que ce soit
    this.map.on('load', () => {
      this.createSource();
      this.createLayer();
      this.loadImageDebut();
      this.setMarkers();
      // pour chaque clic sur la carte
      this.map.on('click', (event) => {
        // récupération des coordonées du clic
        const coordinates: [number, number] = [
          event.lngLat.lng,
          event.lngLat.lat,
        ];
        ////////////////:c'est ici qu'on doit faire des trucs
         const test =new CustomGeoJson(coordinates, {
          message: this.weatherService.getWeatherFromcoord(coordinates[1],coordinates[0]).subscribe((data) => {
            this.type1="Feature";
                //this.marqueur.type = "Feature";
            this.message1=data.weather[0].description;
                //this.marqueur.message = data.weather[0].description;
            this.image1=data.weather[0].icon;
                //this.marqueur.image = data.weather[0].icon;
            this.typegeo1="Point";

            this.coordinates1=[coordinates[1],coordinates[0]];
            this.nomville=data.name;
            this.temp=data.main.temp;

                //this.marqueur.typegeo = "Point";
            this.coordinates1=[coordinates[1],coordinates[0]];
                //this.marqueur.coordinates = [coordinates[1], coordinates[0]];
                this.cityName = data.name;
                this.cityAscii = data.name;
                this.latitude = data.coord.lat;
                this.longitude = data.coord.lon;
                this.normeIso = data.sys.country;
                //this.countryName = this.associatedCountryName.of(data.sys.countrye)+'';
                this.temper = data.main.temp;
                this.dateReleve = data.dt;
                this.feelsLike =  data.main.feels_like;
                this.temperatureMin =  data.main.temp_min;
                this.temperatureMax =  data.main.temp_max;
                this.pressure =  data.main.pressure;
                this.humidity =  data.main.humidity;
                this.sea_level =  data.main.sea_level;
                this.grndLevel =  data.main.grnd_level;
            /*const cityAlias: WorldCity= {
              cityName: this.cityName ,
              cityAscii: this.cityAscii,
              latitude: this.latitude,
              longitude: this.longitude,
              countryName: this.countryName,
              normeIso: this.normeIso
            }*/
            

            const newmarker: Markers={
              type: "Feature",
              message: this.message1,
              image: this.image1,
              typegeo: this.typegeo1,
              coordinates:this.coordinates1,
              //ville: cityAlias
              //this.marqueur.ville!.cityName = this.cityName;
                //this.marqueur.ville!.cityAscii = this.cityAscii;
                //this.marqueur.ville!.latitude = this.latitude;
                //this.marqueur.ville!.longitude = this.longitude;
                //this.marqueur.ville!.normeIso = this.normeIso;
                //this.marqueur.ville!.countryName = this.countryName;
            };  
            //Add en BDD
            //this.addMarqueurEnBDD(this.marqueur);
            
            //this.markerService.addMarker(newmarker);
            this.iconId=this.image1;
            // création d'un nouveau marqueur
            const newMarker = new CustomGeoJson(coordinates, {
              message: this.message+" "+this.nomville+"\nweather : "+this.message1+"\n and it is : "+this.temp+" °C",
              image: this.iconId,
            });
            // ajout du marqueur en base de données
            this.mapService.createMarker(newMarker).subscribe((data) => {
              this.markers.push(data);
              // Chargement de l'image du marqueur
              //this.loadImage(); plus besoin avec le load image debut
              // Ajout du marqueur sur la carte
              this.setMarkers();
              //complete: () => this.saveDataToDataBase()
              this.saveDataToDataBase();
            });
            } 
            
      ),
      });
        
        
      });
    });
    
  }

  saveDataToDataBase(): void{
    //City
    const maVille: WorldCity= {
      cityName: this.cityName,
      cityAscii: this.cityAscii,
      latitude: this.latitude,
      longitude: this.longitude,
      countryName: this.associatedCountryName.of(this.normeIso )+'',
      normeIso: this.normeIso 
    }
    //Temperature
    const newTemp: Temperature ={
      temp: this.temper,
      dateReleve: this.dateReleve,
      feelsLike: this.feelsLike,
      temperatureMin: this.temperatureMin,
      temperatureMax: this.temperatureMax,
      pressure: this.pressure,
      humidity: this.humidity ,
      sea_level: this.sea_level ,
      grndLevel: this.grndLevel,
      ville: maVille
    }

    //Markers
    /**
     * type: "Feature",
              message: this.message1,
              image: this.image1,
              typegeo: this.typegeo1,
              coordinates:this.coordinates1,
     */
    const newMark: Markers = {
      type: "Feature",
      message: this.message1,
      image: this.image1,
      typegeo: this.typegeo1,
      coordinates: this.coordinates1,
      ville: maVille
    }
    // ajout temperature, puis une fois fini, ajout du marqueur
    this.temperatureService.addTemperature(newTemp).subscribe({
      complete: () => this.addMarker(newMark)
    });
    //this.addTemperature(newTemp);
    //console.log("Date: "+this.dateReleve.toISOString());
    //this.addMarker(newMark);
  }

  //PUT a temperature
  addTemperature(newTemperature: Temperature): void{
    //this.nom =  newTemperature.ville?.cityName+'';
    if (!newTemperature) return;
    this.temperatureService.addTemperature(newTemperature).subscribe(
    );
    
  }

  //PUT a temperature
  addMarker(newMarker: Markers): void{
    //this.nom =  newTemperature.ville?.cityName+'';
    if (!newMarker) return;
    this.markerService.addMarker(newMarker).subscribe(
    );
  }

  createLayer() {
    // ajout d'une couche permettant d'afficher le marqueur (l'image) sur la carte
    console.log('Creating layer', this.layerId);
    this.map.addLayer({
      id: this.layerId,
      type: 'symbol',
      source: this.sourceId, // référence à la source de données
      layout: {
        'icon-image': '{image}',
        'text-field': '{message}',
        'text-size': 12,
        'text-offset': [0, 2.5],
        'icon-offset': [-1, -2.5],
      },
      paint: {
        'text-color': '#f16624',
        'text-halo-color': '#fff',
        'text-halo-width': 2,
      },
    });
  }

  createSource() {
    // création des données nécessaires au placement de l'image
    const feature = new CustomFeatureCollection([]);

    // création d'une source permettant par la suite le placement de l'image
    this.map.addSource(this.sourceId, {
      type: 'geojson',
      data: feature as FeatureCollection,
    });

    this.source = this.map.getSource(this.sourceId);
    // même idée que les lignes précédentes
    // sauf que le contenu est décortiqué
    /*
    this.map.addSource('src' + geoJson.id, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              message: this.message,
            },
            geometry: {
              type: 'Point',
              coordinates: [this.lng, this.lat],
            },
          },
        ],
      },
    });
    */
  }

  addMarqueurEnBDD(newMark: Markers): void{
    if (!newMark) return;
    this.markerService.addMarker(newMark).subscribe((marker) => {
      this.markers.push(this.markerGeoJson);
    });
  }


  loadImage() {
    let url: string = `https://weather-icons.cleverapps.io/weather/icons/${this.iconId}.png`

    if (this.toggleButtonState == 'classical') {
      url = `assets/marker-icons/mapbox-marker-icon-20px-${this.iconId}.png`;
    }

    // Vérification si l'image est déjà chargée ou non
    if (this.map.hasImage(this.iconId)) return;

    // téléchargement de l'image
    this.map.loadImage(
      // `assets/marker-icons/mapbox-marker-icon-20px-${color}.png`,
      url,
      (error, image) => {
        if (error) throw error;

        this.map.addImage(this.iconId, image!);
      }
    );
  }

  // suppression du marqueur de la base de données et de la carte
  removeMarker(marker: CustomGeoJson) {
    this.mapService.removeMarker(marker.id).subscribe(() => {
      this.markers = this.markers.filter(
        (m: CustomGeoJson) => m.id !== marker.id
      );
      this.setMarkers();
    });
  }

  // déplacement vers un marqueur
  flyTo(data: CustomGeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates,
    });
  }

  goBack(): void {
    this.location.back();
  }


  loadImageDebut() {
    const images =['01d','01n','02d','02n','03d','03n','04d','04n','09d','09n','11d','11n','10d','10n','13d','13n','50d','50n']
    images.forEach(imaget => {
      
    
    let url: string = `https://weather-icons.cleverapps.io/weather/icons/${imaget}.png`;
  
    // téléchargement de l'image
    this.map.loadImage(
      // `assets/marker-icons/mapbox-marker-icon-20px-${color}.png`,
      url,
      (error, image) => {
        if (error) throw error;
  
        this.map.addImage(imaget, image!);
      }
    );});
  }
}


