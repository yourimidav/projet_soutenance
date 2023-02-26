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
import { MapBoxComponent } from './map-box/map-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CitySearchComponent } from './city-search/city-search.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MarqueursComponent } from './marqueurs/marqueurs.component';

@NgModule({
  declarations: [AppComponent, ShowIpComponent, ShowWeatherComponent,  TemperaturesComponent, WorldcitiesComponent, WorldcitiesDetailsComponent, TemperaturesDetaisComponent, MapBoxComponent, CitySearchComponent, MarqueursComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule,ReactiveFormsModule,MatButtonToggleModule, BrowserAnimationsModule,NgxPaginationModule,MatPaginatorModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
