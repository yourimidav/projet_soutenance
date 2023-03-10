import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Temperature } from '../temperature';
import { TemperatureService } from '../temperature.service';
import { WeatherService } from '../weather.service';
import { WorldcitiesService } from '../worldcities.service';
import { WorldCity } from '../worldCity';
import { Observable,of } from 'rxjs';
import { TemperaturesComponent } from '../temperature/temperatures.component';
import { MarkersService } from '../markers.service';
import { Markers } from '../marker';
//import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-worldcities',
  templateUrl: './worldcities.component.html',
  styleUrls: ['./worldcities.component.css']
})
export class WorldcitiesComponent {
  temperaturec!:TemperaturesComponent;

  cities: WorldCity[] = [];
  city!: WorldCity;
  temperatures:Temperature[]=[];
  marqueurs: Markers [] = [];
  marqueur!: Markers;

  //Données Ville
  longi!: number;
  lati!: number;
  isoName!: string;

  nom!: string;

  //Data pour recuperer le nom du pays
  associatedCountryName = new Intl.DisplayNames(['en'], { type: 'region' });

  //Donnée Temperature lié a la ville
  tempera!: number;
  ressenti!: number;
  temperaMin!: number;
  temperaMax!: number;
  pression!: number;
  humidite!: number;
  niveauMer!: number;
  grnd_niveau!: number;
  dateReleve!: string;

  //Données pour le marqueur
  type!: string;
  message!: string;
  image!:string;
  typegeo!:string;
  coordinates!:number[];

  cityForm = new FormGroup ({
    nomVille: new FormControl('', Validators.required),
    //dateReleve: new FormControl('', Validators.required)
  });
  
  constructor(
    private worldCityService: WorldcitiesService,
    private weatherService: WeatherService,
    private temperatureService: TemperatureService,
    private markersService:MarkersService) {}

  ngOnInit(): void{
    this.getCities();
  }

  getWeatherCoord(cityName: string): void {
    this.weatherService.getWeatherFromCity(cityName).subscribe({next: (data) => {
      this.longi = data.coord.lon;
      this.lati = data.coord.lat;
      this.isoName = data.sys.country;
      //temperature
      this.dateReleve = ""+(data.dt * 1000);
      this.tempera = data.main.temp;
      this.ressenti = data.main.feels_like;
      this.temperaMin = data.main.temp_min;
      this.temperaMax = data.main.temp_max;
      this.pression = data.main.pressure;
      this.humidite = data.main.humidity;
      this.niveauMer =  data.main.sea_level;
      this.grnd_niveau = data.main.grnd_level;
      //Marqueurs
      //this.type =  string;
      /**
       * this.type1="Feature";
//this.marqueur.type = "Feature";
this.message1=data.weather[0].description;
//this.marqueur.message = data.weather[0].description;
this.image1=data.weather[0].icon;
//this.marqueur.image = data.weather[0].icon;
this.typegeo1="Point";

this.coordinates1=[coordinates[1],coordinates[0]];
this.nomville=data.name;
this.temp=data.main.temp;
       */
      this.message = data.weather[0].description;
      this.image = data.weather[0].icon;
      //this.typegeo = string;
      this.coordinates = [data.coord.lat, data.coord.lon]
    }, 
  complete: () => this.addCityAndTemperature()});
  }

  addCityAndTemperature(): void {
    const ville: WorldCity = {
      cityName: this.cityForm.value.nomVille+'',
      cityAscii: this.cityForm.value.nomVille+'',
      latitude: this.lati,
      longitude: this.longi,
      //countryName: this.cityForm.value.nomPays+'',
      //console.log(regionNamesInEnglish.of('US'));
      countryName: this.associatedCountryName.of(this.isoName)+'',
      normeIso: this.isoName,
    };

    const tempEra: Temperature = {
      temp: this.tempera,
      dateReleve: this.dateReleve,
      feelsLike: this.ressenti,
      temperatureMin: this.temperaMin,
      temperatureMax: this.temperaMax,
      pressure: this.pression,
      humidity: this.humidite,
      sea_level: this.niveauMer,
      grndLevel: this.grnd_niveau,
      ville: ville,
    }

    const marq: Markers = {
      type: "Feature",
      message: this.message,
      image: this.image,
      typegeo: "Point",
      coordinates: this.coordinates,
      ville: ville
    }
    //this.addCity(ville);
    console.log(ville);
    this.addTemperature(tempEra);
    this.addMarker(marq);
  }

  parseCityValue(): void{
    this.getWeatherCoord(this.cityForm.value.nomVille+'');
  }
  //GET all cities
  getCities(): void{
    this.worldCityService.getAllCities().subscribe({
      next: (citiesFromObservable) => {
        this.cities = citiesFromObservable;
        console.log('Cities datas retrieved: ', citiesFromObservable);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Completed!'),
    });
  }

  //GET a city
  getCity(nomVille: string): WorldCity{
    this.worldCityService.getCityByName(nomVille).subscribe({
      next: (citiesFromObservable) => {
        this.city = citiesFromObservable;
        console.log('City datas retrieved: ', citiesFromObservable);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Completed!'),
    });
    return this.city;
  }

  //PUT a city
  addCity(newCity: WorldCity): void{
    if (!newCity) return;
     this.worldCityService.addCity(newCity).subscribe((city) => {
      this.cities.push(city);
    });
  }

  //PUT a temperature
  addTemperature(newTemperature: Temperature): void{
    //this.nom =  newTemperature.ville?.cityName+'';
    if (!newTemperature) return;
    if (this.getCity(newTemperature.ville?.cityName+'') != null){
      
    }
    this.temperatureService.addTemperature(newTemperature).subscribe((temperature) => {
      this.temperatures.push(temperature);
      if(temperature.ville)this.cities.push(temperature.ville);
    });
  }

  //PUT a temperature
  addMarker(newMarker: Markers): void{
    //this.nom =  newTemperature.ville?.cityName+'';
    if (!newMarker) return;
    this.markersService.addMarker(newMarker).subscribe(
    );
  }

  //UPDATE a city
  updateCity (cityName: string): void {
    cityName = cityName.trim();
    if (!cityName) return;
    this.worldCityService.updateCity({ cityName } as WorldCity).subscribe((city) => {
      this.cities.push(city);
    });
  }

  //DELETE a city
  deleteCity(city: WorldCity): void {
   this.cities = this.cities.filter((c) => c !== city);
    const id = city.id !== undefined ? city.id : 0;
    city.id = id;
    this.worldCityService.deleteCityAll(city.id).subscribe();
  }

  p: number = 1;

}