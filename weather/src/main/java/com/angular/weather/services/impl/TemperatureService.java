package com.angular.weather.services.impl;

import com.angular.weather.entities.Temperature;
import com.angular.weather.entities.WorldCity;
import com.angular.weather.repositories.TemperatureRepository;
import com.angular.weather.services.TemperatureServiceInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemperatureService implements TemperatureServiceInterface {
    private TemperatureRepository temprepo;

    public TemperatureService(TemperatureRepository temprepo) {
        this.temprepo = temprepo;
    }

    @Override
    public Temperature addTemperature(Temperature temperature) {
        return temprepo.save(temperature);
    }

    @Override
    public Temperature findTemperatureById(Long id) {
        return temprepo.findById(id).get();
    }

    @Override
    public List<Temperature> findAllTemperature() {
        return temprepo.findAll();
    }

    @Override
    public List<Temperature> getByVille(WorldCity ville) {
        return temprepo.findByVille(ville);
    }

    @Override
    public void deleteTemperatureById(Long id) {
        temprepo.deleteById(id);
    }

    @Override
    public Temperature updateTemperature(Temperature temperature) {
        return addTemperature(temperature);
    }

    @Override
    public Temperature updateTemperatureName(Long id, double temp) {
        Temperature t=findTemperatureById(id);
        t.setTemp(temp);
        return temprepo.save(t);
    }

	@Override
	public List<Temperature> findAllTemperatureByVilleId(Long id) {
		// TODO Auto-generated method stub
		return temprepo.findByVilleId(id);
	}
}
