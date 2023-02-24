package com.angular.weather.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.angular.weather.entities.WorldCity;

import java.util.List;

public interface WorldCityRepository extends JpaRepository<WorldCity, Long>{

	@Query("SELECT c FROM WorldCity c WHERE c.cityName = :cityName")
	WorldCity findByCityName(@Param("cityName") String cityName);

	@Query("SELECT c FROM WorldCity c WHERE c.cityName = :cityName")
	List<WorldCity> findByCitiesName(@Param("cityName") String cityName);
}
