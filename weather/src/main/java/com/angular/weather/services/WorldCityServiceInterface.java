package com.angular.weather.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.angular.weather.entities.WorldCity;

@Service
public interface WorldCityServiceInterface {

	public WorldCity getWorldCityByCityName (String cityName);
	
	public WorldCity saveWorlCity (WorldCity city);
	
	public List<WorldCity> getAllWorldCity();
	
	public WorldCity findWorldCityByid(Long id);
	
	//public WorldCity updateWorldCity(Long id, String cityName);
	public WorldCity updateWorldCity(WorldCity city);
	
	public void deleteWorldCityByid(Long id);
}
