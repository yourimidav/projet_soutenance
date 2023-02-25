package com.angular.weather.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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


    public Marqueur() {
    }

    public Marqueur(String type, String message, String image, String typegeo, double[] coordinates) {
        this.type = type;
        this.message = message;
        this.image = image;
        this.typegeo = typegeo;
        this.coordinates = coordinates;
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
                '}';
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
