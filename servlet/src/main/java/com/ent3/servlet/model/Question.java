package com.ent3.servlet.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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
    @GeneratedValue
    private int id;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "competency_id")
    private List<Competency> competences;

    private String question;
    private Competency competency;
    private int score;

    public Question(String question, Competency competency) {
        this.question = question;
        this.competency = competency;
        this.score = 0;
    }

    public String getQuestion() {
        return this.question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Competency getCompetency() {
        return this.competency;
    }

    public void setQuestion(Competency competency) {
        this.competency = competency;
    }

    public int getScore() {
        return this.score;
    }

    public void setQuestion(int score) {
        this.score = score;
    }
}
