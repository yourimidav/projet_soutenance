import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemperatureService } from '../temperature.service';
import { Temperature } from '../temperature';
import { Location } from '@angular/common';

@Component({
  selector: 'app-temperatures-detais',
  templateUrl: './temperatures-detais.component.html',
  styleUrls: ['./temperatures-detais.component.css']
})
export class TemperaturesDetaisComponent {
  temperature!:Temperature;

  constructor(
    private route: ActivatedRoute,
    private temperatureService:TemperatureService,
    private location: Location
  ){}

  ngOnInit(): void {
    this.getTemperature();
  }

  getTemperature(): void{
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.temperatureService.getTemperature(id).subscribe((temperature) => (this.temperature = temperature));
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
