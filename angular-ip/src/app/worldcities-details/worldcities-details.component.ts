import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorldcitiesService } from '../worldcities.service';
import { WorldCity } from '../worldCity';
import { Location } from '@angular/common';
import { WeatherService } from '../weather.service';
import { MainTemperature } from '../mainTemperature';
import { Temperature } from '../temperature';

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

  constructor(
    private route: ActivatedRoute,
    private worldCitiesService: WorldcitiesService,
    private location: Location,
    private weatherService: WeatherService,
  ){}

  ngOnInit(): void {
    this.getCity();
  }

  getCity(): void{
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.worldCitiesService.getCityById(id).subscribe((city) => (this.city = city));
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
