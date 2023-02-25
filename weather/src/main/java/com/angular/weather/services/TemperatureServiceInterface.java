package com.angular.weather.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.angular.weather.entities.Temperature;
import com.angular.weather.entities.WorldCity;

@Service
public interface TemperatureServiceInterface {

    public Temperature addTemperature(Temperature temperature);

    public Temperature findTemperatureById(Long id);
    
    public List<Temperature> findAllTemperatureByVilleId(Long id);

    public List<Temperature> findAllTemperature();

    public List<Temperature> getByVille(WorldCity ville);

    public void deleteTemperatureById(Long id);

    public Temperature updateTemperature(Temperature temperature);

    public Temperature updateTemperatureName(Long id, double temp);
}
