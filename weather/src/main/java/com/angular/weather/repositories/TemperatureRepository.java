package com.angular.weather.repositories;

import com.angular.weather.entities.Temperature;
import com.angular.weather.entities.WorldCity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemperatureRepository extends JpaRepository<Temperature,Long> {
    List<Temperature> findByVille(WorldCity ville);
}
