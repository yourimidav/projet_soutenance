import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { TemperatureService } from '../temperature.service';
import { Temperature } from '../temperature';
import { FormGroup,FormControl } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { WorldCity } from '../worldCity';
import { WorldcitiesService } from '../worldcities.service';

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.css']
})
export class TemperaturesComponent {

  temperatures:Temperature[]=[];
  city!: WorldCity;

  maVille!: WorldCity;
  cityName!: string;
  cityAscii!: string;
  latitude!: number;
  longitude!: number;
  countryName!: string;
  normeIso!: string;

  //Data pour recuperer le nom du pays
  associatedCountryName = new Intl.DisplayNames(['en'], { type: 'region' });

  //Pour gestion pagination
  p: number = 1;
  
  formulaireTemperature = new FormGroup({
    villeForm: new FormControl(''),
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
    private weatherService: WeatherService,
    private worldCitiesService: WorldcitiesService,
  ){};


  onSubmit() {
    this.getCityCoord(this.formulaireTemperature.value.villeForm+'');
    /**
     * this.longitude = data.coord.lon;
      this.latitude = data.coord.lat;
      this.normeIso = data.sys.country;
      this.cityName = cityName;
      this.cityAscii = cityName;
      this.countryName = this.asso
     */
    const maVille: WorldCity = {
      cityName: this.cityName ,
      cityAscii: this.cityAscii,
      latitude: this.longitude,
      longitude: this.latitude,
      countryName: this.countryName,
      normeIso: this.normeIso
    }
    const newTemperature: Temperature = {
      temp: parseFloat(this.formulaireTemperature.value.tempForm ?? '0'),
      dateReleve: this.formulaireTemperature.value.dateReleve+'',
      feelsLike: parseFloat(this.formulaireTemperature.value.feelsLikeForm ?? '0'),
      temperatureMin: parseFloat(this.formulaireTemperature.value.temperatureMinForm ?? '0'),
      temperatureMax: parseFloat(this.formulaireTemperature.value.temperatureMaxForm ?? '0'),
      pressure: parseFloat(this.formulaireTemperature.value.pressureForm ?? '0'),
      humidity: parseFloat(this.formulaireTemperature.value.humidityForm ?? '0'),
      sea_level: parseFloat(this.formulaireTemperature.value.sea_levelForm ?? '0'),
      grndLevel: parseFloat(this.formulaireTemperature.value.grnd_levelForm ?? '0'),
      ville: maVille
      //ville: this.worldCitiesService.getCityByName(this.formulaireTemperature.value.villeForm+'').subscribe(((city) => (this.city = city)))
    };
    this.temperatureService.addTemperature(newTemperature).subscribe((temperature) => {
      this.temperatures.push(temperature);
    });
  }

  getCityCoord(cityName: string): void {
    this.weatherService.getWeatherFromCity(cityName).subscribe({next: (data) => {
      this.longitude = data.coord.lon;
      this.latitude = data.coord.lat;
      this.normeIso = data.sys.country;
      this.cityName = cityName;
      this.cityAscii = cityName;
      this.countryName = this.associatedCountryName.of(data.sys.country)+'';
    }, 
  complete: () => console.log("City crée")});
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
