import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemperatureService } from '../temperature.service';
import { Temperature } from '../temperature';
import { Location } from '@angular/common';
import { WorldcitiesService } from '../worldcities.service';
import { WorldCity } from '../worldCity';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-temperatures-detais',
  templateUrl: './temperatures-detais.component.html',
  styleUrls: ['./temperatures-detais.component.css']
})
export class TemperaturesDetaisComponent {
  temperature!:Temperature;
  temperatures!: Temperature[];
  maville!: Observable<WorldCity>;

  constructor(
    private route: ActivatedRoute,
    private temperatureService:TemperatureService,
    private worldCitiesService: WorldcitiesService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.getTemperature();
    //this.getAllTempForCity();
  }

  getTemperature(): void{
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.temperatureService.getTemperature(id).subscribe((temperature) => (this.temperature = temperature));
  }

  getAllTempForCity(): void{
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.maville = this.worldCitiesService.getCityById(id);
    //this.temperatureService.getAllTemperaturesForWille(id).subscribe({
    this.temperatureService.getByVilleId(this.temperature.ville?.id!).subscribe({
      next: (temperaturesFromObservable) => {
        this.temperatures = temperaturesFromObservable;
        console.log('Retrieved temperatures data :', temperaturesFromObservable);
      },
      error: (error) => console.error(error),
      complete: () => console.log('Completed!'),
    });
  }

  saveTemperature(): void {
    if (this.temperature) {
      this.temperatureService.updateTemperature(this.temperature).subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }
}
