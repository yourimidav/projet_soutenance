package com.angular.weather.services;

import com.angular.weather.entities.Marqueur;
import com.angular.weather.entities.Temperature;
import com.angular.weather.entities.WorldCity;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MarkersServiceInterface {


    public Marqueur addMarqueur(Marqueur marqueur);

    public Marqueur findMarqueurById(Long id);

    public List<Marqueur> findAllMarqueur();

    public void deleteMarqueurById(Long id);

    public Marqueur updateMarqueur(Marqueur marqueur);
    
    public List<Marqueur> findMarqueurByVille(WorldCity city);

    public List<Marqueur> findAllMarqueurByVilleId(Long id);

}
