import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorldcitiesService } from '../worldcities.service';
import { WorldCity } from '../worldCity';
import { Location } from '@angular/common';
import { WeatherService } from '../weather.service';
import { MainTemperature } from '../mainTemperature';
import { Temperature } from '../temperature';
import { TemperatureService } from '../temperature.service';

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
  temperatures!: Temperature[];

  constructor(
    private route: ActivatedRoute,
    private worldCitiesService: WorldcitiesService,
    private temperatureService: TemperatureService,
    private location: Location,
    private weatherService: WeatherService,
  ){}

  ngOnInit(): void {
    this.getCity();
    //this.getAllTemperaureCity();
  }

  getCity(): void{
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.worldCitiesService.getCityById(id).subscribe((city) => (this.city = city));
  }

  getAllTemperaureCity(city: WorldCity): void{
    //const id: number = Number(this.route.snapshot.paramMap.get('id'));
    //this.city = this.worldCitiesService.getCityById(id).subscribe((city) => (this.city = city));
    // TODO
    //const id: number = Number(this.route.snapshot.paramMap.get('id'));
    //this.worldCitiesService.getCityById(id).subscribe((city) => (this.city = city));
    this.temperatureService.getByVille(city).subscribe({
      next: (temperaturesFromObservable) => {
        this.temperatures = temperaturesFromObservable;
        console.log('Retrieved temperatures data :', temperaturesFromObservable);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Completed!'),
    });
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
