package com.ent3.servlet.model;

/**
 * Representation of a Question
 *
 * @author Toon de Hoop
 */

 public class Question{
     private String question; 
     private Competency competency;

     public Question(String question, Competency competency){
         this.question = question;
         this.competency = competency;
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
}
 
     

         
     
 