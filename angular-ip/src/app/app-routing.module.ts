import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorldcitiesComponent } from './worldcities/worldcities.component';
import { WorldcitiesDetailsComponent } from './worldcities-details/worldcities-details.component';
import { TemperaturesComponent } from './temperature/temperatures.component';
import { TemperaturesDetaisComponent } from './temperatures-detais/temperatures-detais.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { MarqueursComponent } from './marqueurs/marqueurs.component';

const routes: Routes = [
  { path: 'worldCities', component: WorldcitiesComponent},
  { path: 'cityDetail/:id', component: WorldcitiesDetailsComponent},
  { path: 'temperatures',component:TemperaturesComponent},
  { path: 'tempDetail/:id',component:TemperaturesDetaisComponent},
  { path: 'marqueurs', component: MarqueursComponent},
  { path: 'map',component:MapBoxComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
