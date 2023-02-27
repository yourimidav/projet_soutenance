package com.angular.weather.entities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.util.Arrays;

@Entity
public class Marqueur {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;//"Feature"
    private String message;
    private String image; //"10d"
    private String typegeo;// "Points"
    private double[] coordinates;
    
    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name ="ville_id")
    private WorldCity ville;


    public Marqueur() {
    }

    public Marqueur(String type, String message, String image, String typegeo, double[] coordinates, WorldCity ville) {
        this.type = type;
        this.message = message;
        this.image = image;
        this.typegeo = typegeo;
        this.coordinates = coordinates;
        this.ville = ville;
    }

    @Override
    public String toString() {
        return "Marqueur{" +
                "id=" + id +
                ", type='" + type + '\'' +
                ", message='" + message + '\'' +
                ", image='" + image + '\'' +
                ", typegeo='" + typegeo + '\'' +
                ", coordinates=" + Arrays.toString(coordinates) +
                ", ville=" +ville+
                "}";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getTypegeo() {
		return typegeo;
	}

	public void setTypegeo(String typegeo) {
		this.typegeo = typegeo;
	}

	public double[] getCoordinates() {
		return coordinates;
	}

	public void setCoordinates(double[] coordinates) {
		this.coordinates = coordinates;
	}

	public WorldCity getVille() {
		return ville;
	}

	public void setVille(WorldCity ville) {
		this.ville = ville;
	}
    
}
