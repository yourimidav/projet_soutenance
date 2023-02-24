import { Component } from '@angular/core';
import { WorldCity } from './worldCity';
import { WorldcitiesComponent } from './worldcities/worldcities.component';
import { WorldcitiesService } from './worldcities.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'World cities weather';
  cities: WorldCity[] = [];

  constructor(private worldcitiesService: WorldcitiesService) { }

  ngOnInit(): void {
    this.getCities;
  }

  getCities(): void {
    this.worldcitiesService.getAllCities()
      .subscribe(cities => this.cities = cities.slice(1, 5));
  }
}
