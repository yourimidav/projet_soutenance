package com.angular.weather.repositories;

import com.angular.weather.entities.Marqueur;
import com.angular.weather.entities.Temperature;
import com.angular.weather.entities.WorldCity;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkersRepository extends JpaRepository<Marqueur,Long> {
	
	List<Marqueur> findByVille(WorldCity city);

	@Query("SELECT m FROM Marqueur m WHERE m.ville.id = :ville_id")
	List<Marqueur> findByVilleId(@Param("ville_id") Long ville_id);
}
