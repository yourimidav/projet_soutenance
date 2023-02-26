package com.angular.weather.services.impl;

import com.angular.weather.entities.Marqueur;
import com.angular.weather.entities.WorldCity;
import com.angular.weather.repositories.MarkersRepository;
import com.angular.weather.services.MarkersServiceInterface;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarqueurService implements MarkersServiceInterface {

    private MarkersRepository markersRepository;

    public MarqueurService(MarkersRepository markersRepository) {
        this.markersRepository = markersRepository;
    }

    @Override
    public Marqueur addMarqueur(Marqueur marqueur) {
        return markersRepository.save(marqueur);
    }

    @Override
    public Marqueur findMarqueurById(Long id) {
        return markersRepository.findById(id).get();
    }

    @Override
    public List<Marqueur> findAllMarqueur() {
        return markersRepository.findAll();
    }

    @Override
    public void deleteMarqueurById(Long id) {
        markersRepository.deleteById(id);
    }

    @Override
    public Marqueur updateMarqueur(Marqueur marqueur) {
        return addMarqueur(marqueur);
    }

	@Override
	public List<Marqueur> findMargeurByVille(WorldCity city) {
		// TODO Auto-generated method stub
		return markersRepository.findByVille(city);
	}
}
