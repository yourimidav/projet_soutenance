package com.angular.weather.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.angular.weather.entities.Temperature;
import com.angular.weather.entities.WorldCity;
import com.angular.weather.services.TemperatureServiceInterface;

@RestController
@RequestMapping("/temp")
@CrossOrigin("http://localhost:4200")
public class TemperatureController {

    private TemperatureServiceInterface temperatureServiceInterface;

    public TemperatureController(TemperatureServiceInterface temperatureServiceInterface) {
        this.temperatureServiceInterface = temperatureServiceInterface;
    }

    @GetMapping("/erature")
    public List<Temperature> getAll() {
        System.out.println("Fetched all temperatures");
        return temperatureServiceInterface.findAllTemperature();
    }

    @GetMapping("/erature/{id}")
    public Temperature getById(@PathVariable Long id) {
        System.out.println("Fetched one temperature");
        return temperatureServiceInterface.findTemperatureById(id);
    }

    @GetMapping("/erature/ville")
    public List<Temperature> getByVille( WorldCity ville){
        System.out.println("fetched all temp by ville");
        return temperatureServiceInterface.getByVille(ville);
    }
    
    @GetMapping("/erature/ville/{id}")
    public List<Temperature> getAllTempByVilleId(@PathVariable Long id){
        System.out.println("fetched temperature by ville_id= " +id);
        return temperatureServiceInterface.findAllTemperatureByVilleId(id);
    }

    @DeleteMapping ("/erature/{id}")
    public List<Temperature> delete(@PathVariable Long id){
        System.out.println("delete one by id");
        temperatureServiceInterface.deleteTemperatureById(id);
        return temperatureServiceInterface.findAllTemperature();
    }

    @PutMapping("/erature")
    public Temperature update(@RequestBody Temperature temperature){
        System.out.println("Temperature updated");
        return temperatureServiceInterface.updateTemperature(temperature);
    }

    @PostMapping("/erature")
    public Temperature add(@RequestBody Temperature temperature) {
        System.out.println("Got a temperature");
        System.out.println(temperature);
        return temperatureServiceInterface.addTemperature(temperature);
    }

}
