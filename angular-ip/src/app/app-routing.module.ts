import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WorldcitiesComponent } from './worldcities/worldcities.component';
import { WorldcitiesDetailsComponent } from './worldcities-details/worldcities-details.component';
import { TemperaturesComponent } from './temperature/temperatures.component';
import { TemperaturesDetaisComponent } from './temperatures-detais/temperatures-detais.component';

const routes: Routes = [
  { path: 'worldCities', component: WorldcitiesComponent},
  { path: 'cityDetail/:id', component: WorldcitiesDetailsComponent},
  {path:'temperatures',component:TemperaturesComponent},
  {path: 'tempDetail/:id',component:TemperaturesDetaisComponent}
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
