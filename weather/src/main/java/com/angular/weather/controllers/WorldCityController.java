package com.angular.weather.controllers;

import java.util.List;

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

	public WorldCityController(WorldCityService worldCityServ) {
		super();
		this.worldCityServ = worldCityServ;
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
}
