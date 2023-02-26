package com.angular.weather.repositories;

import com.angular.weather.entities.Marqueur;
import com.angular.weather.entities.WorldCity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkersRepository extends JpaRepository<Marqueur,Long> {
	
	List<Marqueur> findByVille(WorldCity city);
}
