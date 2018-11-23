package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Competency;
import com.ent3.servlet.model.Question;

/**
 * RepositoryService for Questions
 *
 * @author Toon de Hoop
 */
public interface QuestionRepository {
    /**
     * Gets all available Questions.
     *
     * @return List containing all Questions.
     */
    public List<Question> getAllQuestions();

    /**
     * Get a specific Question by id.
     *
     * @param id ID of Question to get.
     * @return The Question.
     */
    public Question getQuestionById(int id);

  
    /**
     * Add a Question.
     *
     * @param Question The Question to add.
     * @return The added Question.
     */
    public Question addQuestion(Question Question);

    /**
     * Returns a list of specific questions by competency
     * @param competency the competency to filter
     * @return a list of questions filtered by comptency
     */
    public List<Question> getQuestionsByCompetency(Competency competency);
}