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
 * Area of a competency
 *
 * @author Luc Maerten 
 */
@Entity
@Table(name = "results")
public class Result implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "result_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Id
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user = null;

    private int competencieId;
    private int competencieScore;

    public Result() {
        // Default constructor is required.
    }

    public Result(int competencieId, int competencieScore) {
        this.competencieId = competencieId;
        this.competencieScore = competencieScore;
    }

    public void setUser(User user){
        this.user = user;
    }

    public int getCompetencieId() {
        return this.competencieId;
    }

    public void setCompetencieId(int competencieId) {
        this.competencieId = competencieId;
    }

    public int getCompetencieScore() {
        return this.competencieScore;
    }
    
    public void setCompetencieScore(int competencieScore) {
        this.competencieScore = competencieScore;
    }
}