/**
 * 
 */
package com.angular.weather.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

/**
 * @author f.tiotsop & youri
 *
 */
@Entity
@Table(name = "worldcities")
public class WorldCity {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name ="city")
	private String cityName;
	
	@Column(name ="city_ascii")
	private String cityAscii;
	
	@Column(name ="lat")
	private double latitude;
	
	@Column(name ="lng")
	private double longitude;
	
	@Column(name ="country")
	private String countryName;
	
	@Column(name ="iso2")
	private String normeIso;

	public WorldCity() {
		super();
		// TODO Auto-generated constructor stub
	}

	public WorldCity(String cityName, String cityAscii, double latitude, double longitude, String countryName,
			String normeIso) {
		super();
		this.cityName = cityName;
		this.cityAscii = cityAscii;
		this.latitude = latitude;
		this.longitude = longitude;
		this.countryName = countryName;
		this.normeIso = normeIso;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getCityAscii() {
		return cityAscii;
	}

	public void setCityAscii(String cityAscii) {
		this.cityAscii = cityAscii;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getCountryName() {
		return countryName;
	}

	public void setCountryName(String countryName) {
		this.countryName = countryName;
	}

	public String getNormeIso() {
		return normeIso;
	}

	public void setNormeIso(String normeIso) {
		this.normeIso = normeIso;
	}

	@Override
	public String toString() {
		return "WorldCity [id=" + id + ", cityName=" + cityName + ", cityAscii=" + cityAscii + ", latitude="
				+ latitude + ", longitude=" + longitude + ", countryName=" + countryName + ", normeIso=" + normeIso
				+ "]";
	}
	
	
}
