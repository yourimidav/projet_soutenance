package com.angular.weather.repositories;

import com.angular.weather.entities.Marqueur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarkersRepository extends JpaRepository<Marqueur,Long> {
}
