package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Question;


/**
 * RepositoryService
 *
 * @author Toon & Melissa
 */

 public interface QuestionRepository{
     /**
      * gets all quetions
      * @return list of all questions

      */
     public List<Question> getAlQuestions();

     /**
      * Gets a specific question by id 
      *
      * @param id ID of the quetion to get
      * @return the specific question
      */
     public Question getQuestionById(int id);
     }