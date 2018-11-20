package com.ent3.servlet.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Area of a competency
 *
 * @author Peter Dimitrov
 */
@Entity
@Table(name = "areas")
public class Area implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;

    /*
    public enum Type {
        IDEAS_OPPORTUNITIES (1),
        RESOURCES (2),
        INTO_ACTION (3);

        private int id;

        private Type(int id) {
            this.id = id;
        }

        public int id() {
            return this.id;
        }
    }
    */

    @Id
    @Column(name = "area_id")
    @GeneratedValue
    private int id;

    //private Type areaType;
    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "area_id")
    private List<Competency> competencies;

    public Area() {
        // Default constructor is required.

        competencies = new ArrayList<>();
    }

    public Area(String name) {
        this.name = name;
        competencies = new ArrayList<>();
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void addCompetency(Competency comp) {
        competencies.add(comp);
    }

    public List<Competency> getCompetencies() {
        return new ArrayList<>(competencies);
    }

    public void setCompetencies(List<Competency> competencies) {
        this.competencies = competencies;
    }

    public void deleteCompetency(int index) {
        competencies.remove(index);
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    /*
    public int getAreaTypeId() {
        return this.areaType.id();
    }
    */
}