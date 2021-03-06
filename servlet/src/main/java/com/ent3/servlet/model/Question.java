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
 * Representation of a Question
 *
 * @author Toon de Hoop
 */
@Entity
@Table(name = "questions")
public class Question implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "question_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private String question;
    

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "competency_id")
    @JsonbTransient
    private Competency competency;

    public Question() {
        // Required.
    }

    public Question(String question, Competency competency){
        this.question = question;
        this.competency = competency;
        
    }
    public int getId(){
        return this.id;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getQuestion() {
        return this.question;
    }

    

    public void setCompetency(Competency competency) {
        this.competency = competency;
    }

    public Competency getCompetency() {
        return this.competency;
    }
}