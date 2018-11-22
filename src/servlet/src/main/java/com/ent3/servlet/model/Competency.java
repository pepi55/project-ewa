package com.ent3.servlet.model;

import java.io.Serializable;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Competency
 *
 * @author Peter Dimitrov
 */
@Entity
@Table(name = "competencies")
public class Competency implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "competency_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "area_id")
    @JsonbTransient
    private Area area;

    private String name;

    public Competency() {
        // Required.
    }

    public Competency(int id, String name, Area area) {
        this.id = id;
        this.name = name;
        this.area = area;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Area getArea() {
        return this.area;
    }

    public void setArea(Area area) {
        this.area = area;
    }
}