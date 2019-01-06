package com.ent3.servlet.model;

import java.io.Serializable;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Class representing a UserCompetency
 */
@Entity
@Table(name = "userCompetency")
public class UserCompetency implements Serializable{
    @Transient
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "userComptency_id")
    @GeneratedValue
    private int id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "competency_id")
    @JsonbTransient
    private Competency competency;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonbTransient
    private User user;

    private int score;

    public UserCompetency(){
        //Required
    }

    public UserCompetency(Competency competency, User user, int score){
        this.competency = competency;
        this.user = user;
        this.score = score;
    }

    public int getId(){
        return this.id;
    }

    public Competency getCompetency(){
        return this.competency;
    }

    public User getUser(){
        return this.user;
    }

    public int getScore(){
        return this.score;
    }

    public void setCompetecy( Competency competency){
        this.competency = competency;
    }

    public void setUser(User user){
        this.user = user;
    }

    public void setScore(int score){
        this.score =score;
    }
}
    