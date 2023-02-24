package com.angular.weather.services.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.angular.weather.entities.WorldCity;
import com.angular.weather.repositories.WorldCityRepository;
import com.angular.weather.services.WorldCityServiceInterface;

@Service
public class WorldCityService implements WorldCityServiceInterface{

	private WorldCityRepository worldCityRepo;
	
	public WorldCityService(WorldCityRepository worldCityRepo) {
		super();
		this.worldCityRepo = worldCityRepo;
	}

	@Override
	public WorldCity getWorldCityByCityName(String cityName) {
		// TODO Auto-generated method stub
		return worldCityRepo.findByCityName(cityName);
	}

	@Override
	public List<WorldCity> getWorldCitiesByCityName(String cityName) {
		return worldCityRepo.findByCitiesName(cityName);
	}

	@Override
	public WorldCity saveWorlCity(WorldCity city) {
		// TODO Auto-generated method stub
		return worldCityRepo.save(city);
	}

	@Override
	public List<WorldCity> getAllWorldCity() {
		// TODO Auto-generated method stub
		return worldCityRepo.findAll();
	}

	@Override
	public WorldCity findWorldCityByid(Long id) {
		// TODO Auto-generated method stub
		return worldCityRepo.findById(id).get();
	}

	@Override
	public WorldCity updateWorldCity(WorldCity city) {
		// TODO Auto-generated method stub
//		WorldCity  wc = findWorldCityByid(id);
//		wc.setCityName(cityName);
//		return saveWorlCity(wc);
		return saveWorlCity(city);
	}

	@Override
	public void deleteWorldCityByid(Long id) {
		// TODO Auto-generated method stub
		worldCityRepo.deleteById(id);
	}

}
