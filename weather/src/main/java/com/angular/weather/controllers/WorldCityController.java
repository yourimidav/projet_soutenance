package com.angular.weather.controllers;

import java.util.List;

import com.angular.weather.entities.Marqueur;
import com.angular.weather.entities.Temperature;
import com.angular.weather.services.impl.MarqueurService;
import com.angular.weather.services.impl.TemperatureService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.angular.weather.entities.WorldCity;
import com.angular.weather.services.impl.WorldCityService;

@RestController
@RequestMapping("/worldcity")
@CrossOrigin("http://localhost:4200")
public class WorldCityController {

	private WorldCityService worldCityServ;
	private TemperatureService temperatureService;
	private MarqueurService marqueurService;

	public WorldCityController(WorldCityService worldCityServ,MarqueurService marqueurService,TemperatureService temperatureService) {
		super();
		this.worldCityServ = worldCityServ;
		this.marqueurService=marqueurService;
		this.temperatureService=temperatureService;
	}
	
	@GetMapping("/cities")
	public List<WorldCity> getAllWorldCity(){
		System.out.println("All cities fetched");
		return worldCityServ.getAllWorldCity();
	}
	
	@GetMapping("/cities/{id}")
	public WorldCity getWorldCityById(@PathVariable Long id) {
		System.out.println("City fetched with id: " + id);
		return worldCityServ.findWorldCityByid(id);
	}
	
	@GetMapping("/cities/name/{name}")
	public WorldCity getWorldCityByName(@PathVariable String name) {
		System.out.println("City fetched with name: " + name);
		return worldCityServ.getWorldCityByCityName(name);
	}

	@GetMapping("/cities/names/{name}")
	public List<WorldCity> getWorldCitiesByName(@PathVariable String name) {
		System.out.println("City fetched with name: " + name);
		return worldCityServ.getWorldCitiesByCityName(name);
	}

	@PostMapping("/cities")
	public WorldCity addWorldCity(@RequestBody WorldCity city) {
		System.out.println("City saved");
		return worldCityServ.saveWorlCity(city);
	}
	
	@PutMapping("/cities")
	public WorldCity updateWorldCity(@RequestBody WorldCity city) {
		System.out.println("City updated");
		return worldCityServ.updateWorldCity(city);
	}
	
	@DeleteMapping("/cities/{id}")
	public void deleteWorldCity(@PathVariable Long id) {
		System.out.println("City with idd: " +id+ " deleted");
		worldCityServ.deleteWorldCityByid(id);
	}

	@DeleteMapping("/cities/autres/{id}")
	public void deleteWorldCityAll(@PathVariable Long id) {
		for (Temperature temperature: temperatureService.findAllTemperatureByVilleId(id)){
			temperatureService.deleteTemperatureById(temperature.getId());
		}
		for (Marqueur marqueur: marqueurService.findAllMarqueurByVilleId(id)){
			marqueurService.deleteMarqueurById(marqueur.getId());
		}
		System.out.println("City with idd: " +id+ " deleted");
		worldCityServ.deleteWorldCityByid(id);
	}
}
