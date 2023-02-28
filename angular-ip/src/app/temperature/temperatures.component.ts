import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { TemperatureService } from '../temperature.service';
import { Temperature } from '../temperature';
import { FormGroup,FormControl } from '@angular/forms';
import { WeatherService } from '../weather.service';
import { WorldCity } from '../worldCity';
import { WorldcitiesService } from '../worldcities.service';
import { Markers } from '../marker';
import { MarkersService } from '../markers.service';

@Component({
  selector: 'app-temperatures',
  templateUrl: './temperatures.component.html',
  styleUrls: ['./temperatures.component.css']
})
export class TemperaturesComponent {

  temperatures:Temperature[]=[];
  city!: WorldCity;
  villeSaisie!: WorldCity;
  marqueurVilleSaisie!: Markers;

  maVille!: WorldCity;
  cityName!: string;
  cityAscii!: string;
  latitude!: number;
  longitude!: number;
  countryName!: string;
  normeIso!: string;

  testVille!: string;

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
    private markersService: MarkersService,
  ){};


  onSubmit() {
    const nomVilleSaisie: string = this.formulaireTemperature.value.villeForm+''
    this.getCityCoord(nomVilleSaisie);
    /**
     * this.longitude = data.coord.lon;
        console.log("DATA: ",data.coord.lon);
        
        this.latitude = data.coord.lat;
        console.log("DATA: ",data.coord.lat);

        this.normeIso = data.sys.country;
        console.log("DATA: ",data.sys.country);

        this.cityName = uneVille;
        console.log("DATA: ",this.cityName);
        
        this.cityAscii = uneVille;
        console.log("DATA: ",this.cityAscii);

        this.countryName = this.associatedCountryName.of(data.sys.country)+'';
        console.log("DATA: ",this.countryName);
     */
    const maVille: WorldCity = {
      cityName: this.cityName ,
      cityAscii: this.cityAscii,
      latitude: this.longitude,
      longitude: this.latitude,
      countryName: this.countryName,
      normeIso: this.normeIso
    }
    console.log("Dont la ville: ", maVille);
    
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
      ville: this.villeSaisie,
      //ville: this.worldCitiesService.getCityByName(this.formulaireTemperature.value.villeForm+'').subscribe(((city) => (this.city = city)))
    };
    console.log("Vous avez saisie:", newTemperature);
    
    this.temperatureService.addTemperature(newTemperature).subscribe((temperature) => {
      this.temperatures.push(temperature);
    });
    //this.markersService.addMarker(this.marqueurVilleSaisie).subscribe();
  }

  getCityCoord(uneVille: string): void {
    //this.testVille = this.formulaireTemperature.value.villeForm+'';
    this.weatherService.getWeatherFromCity(uneVille).subscribe({
      next: (data) => {
        //Recuperer Ville
        this.villeSaisie.cityName = uneVille;
        console.log("DATA", this.villeSaisie.cityName);
        
        this.villeSaisie.cityAscii = uneVille;
        console.log("DATA", this.villeSaisie.cityAscii);

        this.villeSaisie.latitude = data.coord.lon;
        console.log("DATA", this.villeSaisie.cityName);

        this.villeSaisie.longitude = data.coord.lat;
        console.log("DATA", this.villeSaisie.latitude);

        this.villeSaisie.countryName = this.associatedCountryName.of(data.sys.country)+'';
        console.log("DATA", this.villeSaisie.countryName) ;

        this.villeSaisie.normeIso = data.sys.country;
        console.log("DATA", this.villeSaisie.normeIso);

        //Revuper marqueur
        this.marqueurVilleSaisie.type = "Feature";
        this.marqueurVilleSaisie.message = data.weather[0].description;
        this.marqueurVilleSaisie.image = data.weather[0].icon;
        this.marqueurVilleSaisie.typegeo = "Point";
        this.marqueurVilleSaisie.coordinates = [data.coord.lat,data.coord.lon];
        this.marqueurVilleSaisie.ville = this.villeSaisie;
      },
      complete: () => console.log("Vous avez saisie ", uneVille)
      
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
