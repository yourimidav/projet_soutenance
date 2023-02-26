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
      this.dateReleve = data.dt;
      this.tempera = data.main.temp;
      this.ressenti = data.main.feels_like;
      this.temperaMin = data.main.temp_min;
      this.temperaMax = data.main.temp_max;
      this.pression = data.main.pressure;
      this.humidite = data.main.humidity;
      this.niveauMer =  data.main.sea_level;
      this.grnd_niveau = data.main.grnd_level;
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
    //this.addCity(ville);
    console.log(ville);
    this.addTemperature(tempEra);
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
    /* this.cities = this.cities.filter((c) => c !== city);
    const id = city.id !== undefined ? city.id : 0;
    city.id = id;
    this.temperatureService.getByVille(id).subscribe((data) => {
      data.forEach((datau) => {
        if(datau.id){
          this.temperatureService.deleteTemperature(datau.id);
        }
      });
      error: err =>console.log( err),
     () => {
      this.markersService.getAllMarkersForCityById(id).subscribe((data1)=>{
        data1.forEach((datau1) => {
          if(datau1.id){
            this.markersService.deleteMarker(datau1.id);
          }
        })
      
    },() => {
      this.worldCityService.deleteCity(id).subscribe(() => {
        console.log('La ville a été supprimée avec succès.');
      })})
    })
      
 */
  }

  p: number = 1;

}
/* this.markersService.getAllMarkersForCityById(id).subscribe((data1)=>{
        data1.forEach((datau1) => {
          if(datau1.id){
            this.markersService.deleteMarker(datau1.id);
          }
        })
      }) */