package com.ent3.servlet.model;

/**
 * Representation of a Question
 *
 * @author Toon de Hoop
 */

 public class Question{
     private String question; 
     private Competency competency;
     private int score;

     public Question(String question, Competency competency){
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
 
     

         
     
 