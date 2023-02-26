package com.angular.weather.repositories;

import com.angular.weather.entities.Temperature;
import com.angular.weather.entities.WorldCity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemperatureRepository extends JpaRepository<Temperature,Long> {
    
	List<Temperature> findByVille(WorldCity ville);
	
	@Query("SELECT t FROM Temperature t WHERE t.ville.id = :ville_id")
	List<Temperature> findByVilleId(@Param("ville_id") Long ville_id);
}
