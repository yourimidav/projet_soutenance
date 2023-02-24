import { Component } from '@angular/core';
import { IpService } from '../ip.service';
import { MainTemperature } from '../mainTemperature';
import { WeatherService } from '../weather.service';
import { TemperaturesComponent } from '../temperature/temperatures.component';
import { Temperature } from '../temperature';
import { TemperatureService } from '../temperature.service';

@Component({
  selector: 'app-show-weather',
  templateUrl: './show-weather.component.html',
  styleUrls: ['./show-weather.component.css'],
})
export class ShowWeatherComponent {
  private ip!: string;
  public city!: string;
  public main!: MainTemperature;
  public icon?: string;
  public description?: string;

  constructor(
    private weatherService: WeatherService,
    private ipService: IpService,
    private temperatureService:TemperatureService//ajout dans le constructeur temperatureService 
    //                                              pour utiliser la fonction addTemperature de celle ci.

  ) {}

  ngOnInit(): void {
    this.ipInit();
  }

  ipInit(): void {
    this.ipService.getIpAdress().subscribe({
      next: (data) => {
        this.ip = data.ip;
      },
      complete: () => this.cityInit(),
    });
  }

  cityInit(): void {
    this.ipService.getIpInfo(this.ip).subscribe({
      next: (info) => {
        this.city = info.city;
      },
      complete: () => this.getWeather(),
    });
  }

  getWeather(): void {
    this.weatherService.getWeatherFromCity(this.city).subscribe((data) => {
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
    /*const newTemperature:Temperature={
      id:0,
    temp: this.main.temp,
    feelsLike: this.main.feelsLike,
    temperatureMin: this.main.tempMin,
    temperatureMax:this.main.tempMax,
    pressure: this.main.pressure,
    sea_level: -1000000,
    grnd_level: -1000000,
    }
    this.temperatureService.addTemperature(newTemperature);*/

    //rajouter un if getcity.size =0 add city
  }
}
