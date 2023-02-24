import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShowIpComponent } from './show-ip/show-ip.component';

import { HttpClientModule } from '@angular/common/http';
import { ShowWeatherComponent } from './show-weather/show-weather.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorldcitiesComponent } from './worldcities/worldcities.component';
import { AppRoutingModule } from './app-routing.module';
import { WorldcitiesDetailsComponent } from './worldcities-details/worldcities-details.component';
import { TemperaturesComponent } from './temperature/temperatures.component';
import { TemperaturesDetaisComponent } from './temperatures-detais/temperatures-detais.component';

@NgModule({
  declarations: [AppComponent, ShowIpComponent, ShowWeatherComponent,  TemperaturesComponent, WorldcitiesComponent, WorldcitiesDetailsComponent, TemperaturesDetaisComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
