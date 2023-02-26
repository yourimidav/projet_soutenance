package com.angular.weather.controllers;

import com.angular.weather.entities.Marqueur;
import com.angular.weather.entities.WorldCity;
import com.angular.weather.services.MarkersServiceInterface;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/markers")
@CrossOrigin("http://localhost:4200")
public class MarqueurController {

    private MarkersServiceInterface markersServiceInterface;

    public MarqueurController(MarkersServiceInterface markersServiceInterface) {
        this.markersServiceInterface = markersServiceInterface;
    }

    @GetMapping("/les")
    public List<Marqueur> getAll(){
        return markersServiceInterface.findAllMarqueur();
    }

    @GetMapping("/les/{id}")
    public Marqueur getById(@PathVariable Long id){
        return markersServiceInterface.findMarqueurById(id);
    }

    @DeleteMapping("/les/{id}")
    public List<Marqueur> delete(@PathVariable Long id){
        markersServiceInterface.deleteMarqueurById(id);
        return markersServiceInterface.findAllMarqueur();
    }

    @PutMapping("/les")
    public Marqueur update(@RequestBody Marqueur marqueur){
        return markersServiceInterface.updateMarqueur(marqueur);
    }

    @PostMapping("/les")
    public Marqueur add(@RequestBody Marqueur marqueur){
        return markersServiceInterface.addMarqueur(marqueur);
    }
    
    @GetMapping("/les/all")
    public List<Marqueur> getMarqueurByVille(WorldCity city){
    	return markersServiceInterface.findMarqueurByVille(city);
    }

    @GetMapping("/les/autres/{id}")
    public List<Marqueur> getMarqueurByVilleId(@PathVariable Long id){
        System.out.println("test");
        return markersServiceInterface.findAllMarqueurByVilleId(id);
    }
}
