import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { TemperatureService } from '../temperature.service';
import { Temperature } from '../temperature';
import { FormGroup,FormControl } from '@angular/forms';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.css']
})
export class TemperaturesComponent {

  temperatures:Temperature[]=[];

  //Pour gestion pagination
  p: number = 1;
  
  formulaireTemperature = new FormGroup({
    ville: new FormControl(''),
    tempForm: new FormControl(''),
    feelsLikeForm: new FormControl(''),
    temperatureMinForm: new FormControl(''),
      temperatureMaxForm: new FormControl(''),
      pressureForm: new FormControl(''),
      humidityForm: new FormControl(''),
      sea_levelForm: new FormControl(''),
      grnd_levelForm: new FormControl(''),
      dateReleve: new FormControl('')
  });

  constructor(
    private temperatureService:TemperatureService,
    private weatherService: WeatherService
  ){};


  onSubmit() {
    const newTemperature: Temperature = {
      temp: parseFloat(this.formulaireTemperature.value.tempForm ?? '0'),
      dateReleve: this.formulaireTemperature.value.dateReleve+'',
      feelsLike: parseFloat(this.formulaireTemperature.value.feelsLikeForm ?? '0'),
      temperatureMin: parseFloat(this.formulaireTemperature.value.temperatureMinForm ?? '0'),
      temperatureMax: parseFloat(this.formulaireTemperature.value.temperatureMaxForm ?? '0'),
      pressure: parseFloat(this.formulaireTemperature.value.pressureForm ?? '0'),
      humidity: parseFloat(this.formulaireTemperature.value.humidityForm ?? '0'),
      sea_level: parseFloat(this.formulaireTemperature.value.sea_levelForm ?? '0'),
      grndLevel: parseFloat(this.formulaireTemperature.value.grnd_levelForm ?? '0')
      //ville: null;
    };
    this.temperatureService.addTemperature(newTemperature).subscribe((temperature) => {
      this.temperatures.push(temperature);
    });
  }

  ngOnInit(): void {
    this.getTemperatures();
  }

  getTemperatures(): void {
    this.temperatureService.getTemperatures().subscribe({
      next: (temperaturesFromObservable) => {
        this.temperatures = temperaturesFromObservable;
        console.log('Retrieved temperatures data :', temperaturesFromObservable);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Completed!'),
    });
  }

  delete(temperature: Temperature): void {
    this.temperatures = this.temperatures.filter((t) => t !== temperature);
    const id = temperature.id !== undefined ? temperature.id : 0;
    temperature.id = id;  
    this.temperatureService.deleteTemperature(temperature.id).subscribe();
  }
}
