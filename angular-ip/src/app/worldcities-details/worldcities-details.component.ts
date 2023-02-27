import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorldcitiesService } from '../worldcities.service';
import { WorldCity } from '../worldCity';
import { Location } from '@angular/common';
import { WeatherService } from '../weather.service';
import { MainTemperature } from '../mainTemperature';
import { Temperature } from '../temperature';
import { TemperatureService } from '../temperature.service';
import { MarkersService } from '../markers.service';
import { Markers } from '../marker';

@Component({
  selector: 'app-worldcities-details',
  templateUrl: './worldcities-details.component.html',
  styleUrls: ['./worldcities-details.component.css']
})

export class WorldcitiesDetailsComponent {
  city!: WorldCity;
  main!: MainTemperature;
  icon?: string;
  description?: string;
  temperature!: Temperature;
  temperatures: Temperature[] = [];
  marqueurs: Markers[] = [];
  marqueur!: Markers;

  //for manage page
  p: number = 1;

  constructor(
    private route: ActivatedRoute,
    private worldCitiesService: WorldcitiesService,
    private temperatureService: TemperatureService,
    private location: Location,
    private weatherService: WeatherService,
    private markersService: MarkersService
  ){}

  ngOnInit(): void {
    this.getCity();
    //this.getAllTemperaureCity(this.city);
  }

  getCity(): void{
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.worldCitiesService.getCityById(id).subscribe({
      next: (city) => (this.city = city),
      complete: () => {this.getAllTemperaureCity(this.city)
      this.getAllMarkerCity(this.city)}
    });
    
  }

  //Get all temperatures associated to selected city
  getAllTemperaureCity(city: WorldCity): void{
    this.temperatureService.getAllTemperaturesForWille(city.id!).subscribe({
      next: (temperaturesFromObservable) => {
        this.temperatures = temperaturesFromObservable;
        console.log('Retrieved temperatures data :', temperaturesFromObservable);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Completed!'),
    });
  }

  //Delete a temperature saved to this city
  deleteTemperature(temperature: Temperature): void {
    this.temperatures = this.temperatures.filter((t) => t !== temperature);
    const id = temperature.id !== undefined ? temperature.id : 0;
    temperature.id = id;
    this.temperatureService.deleteTemperature(temperature.id).subscribe();
  }

  //Get all markers associated to selected city
  getAllMarkerCity(city: WorldCity): void{
    this.markersService.getAllMarkersForCityById(city.id!).subscribe({
      next: (markersFromObservable) => {
        this.marqueurs = markersFromObservable;
        console.log('Retrieved temperatures data :', markersFromObservable);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Completed!'),
    });
  }

  //Delete a marker saved to this city
  deleteMarker (mark: Markers): void {
    this.marqueurs = this.marqueurs.filter((m) => m !== mark);
    const id = mark.id !== undefined ? mark.id : 0;
    mark.id = id;
    this.markersService.deleteMarker(mark.id).subscribe();
  }

  saveCity(): void {
    if (this.city) {
      this.worldCitiesService.addCity(this.city).subscribe(() => this.goBack());
    }
  }

  updaCity(): void {
    if (this.city) {
      this.worldCitiesService.updateCity(this.city).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

  getWeather(): void {
    this.weatherService.getWeatherFromCity(this.city.cityName).subscribe((data) => {
      const {
        feels_like: feelsLike,
        humidity,
        pressure,
        temp,
        temp_max: tempMax,
        temp_min: tempMin,
      } = data.main;

      this.main = {
        feelsLike,
        humidity,
        pressure,
        temp,
        tempMax,
        tempMin,
      };

      this.icon = data.weather[0].icon;
      this.description = data.weather[0].description;
    });
  }
}
