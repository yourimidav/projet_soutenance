/**
 * 
 */
package com.angular.weather.entities;

import java.time.LocalDateTime;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * @author f.tiotsop & youri
 *
 */
@Entity
@Table(name = "temperatures")
public class Temperature {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name ="temp")
	private double temp;
	
	@Column(name ="date_releve")
	private LocalDateTime dateReleve;
	
	@Column(name ="feels_like")
	private double feelsLike;
	
	@Column(name ="temp_min")
	private double temperatureMin;
	
	@Column(name ="temp_max")
	private double temperatureMax;
	private Long pressure;
	private Long humidity;
	
	@Column(name ="sea_level")
	private Long sea_level;
	
	@Column(name ="grnd_level")
	private Long grndLevel;
	
	@ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private WorldCity ville;

	public Temperature() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Temperature(double temp, LocalDateTime dateReleve, double feelsLike, double temperatureMin, double temperatureMax,
			Long pressure, Long humidity, Long sea_level, Long grndLevel, WorldCity ville) {
		super();
		this.temp = temp;
		this.dateReleve = dateReleve;
		this.feelsLike = feelsLike;
		this.temperatureMin = temperatureMin;
		this.temperatureMax = temperatureMax;
		this.pressure = pressure;
		this.humidity = humidity;
		this.sea_level = sea_level;
		this.grndLevel = grndLevel;
		this.ville = ville;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public double getTemp() {
		return temp;
	}

	public LocalDateTime getDateReleve() {
		return dateReleve;
	}

	public void setDateReleve(LocalDateTime dateReleve) {
		this.dateReleve = dateReleve;
	}

	public void setTemp(double temp) {
		this.temp = temp;
	}

	public double getFeelsLike() {
		return feelsLike;
	}

	public void setFeelsLike(double feelsLike) {
		this.feelsLike = feelsLike;
	}

	public double getTemperatureMin() {
		return temperatureMin;
	}

	public void setTemperatureMin(double temperatureMin) {
		this.temperatureMin = temperatureMin;
	}

	public double getTemperatureMax() {
		return temperatureMax;
	}

	public void setTemperatureMax(double temperatureMax) {
		this.temperatureMax = temperatureMax;
	}

	public Long getPressure() {
		return pressure;
	}

	public void setPressure(Long pressure) {
		this.pressure = pressure;
	}

	public Long getHumidity() {
		return humidity;
	}

	public void setHumidity(Long humidity) {
		this.humidity = humidity;
	}

	public Long getSea_level() {
		return sea_level;
	}

	public void setSea_level(Long sea_level) {
		this.sea_level = sea_level;
	}

	public Long getGrndLevel() {
		return grndLevel;
	}

	public void setGrndLevel(Long grndLevel) {
		this.grndLevel = grndLevel;
	}

	public WorldCity getVille() {
		return ville;
	}

	public void setVille(WorldCity ville) {
		this.ville = ville;
	}

	@Override
	public String toString() {
		return "Temperature [id=" + id + ", temperature=" + temp + ", dateReleve=" +dateReleve+ ", feelsLike=" + feelsLike
				+ ", temperatureMin=" + temperatureMin + ", temperatureMax=" + temperatureMax + ", pressure=" + pressure
				+ ", humidity=" + humidity + ", seaLevelr=" + sea_level + ", grndLevel=" + grndLevel + ", ville="
				+ ville + "]";
	}
	
	
}
