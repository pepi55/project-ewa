package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Question;

/**
 * QuestionRepository
 *
 * @author Toon de Hoop
 */

public interface QuestionRepository {

    /**
     * Get all Questions.
     *
     * @return List of all Questions.
     */
    public List<Question> getAllQuestions();

    /**
     * Get Question with specific ID.
     *
     * @param id ID of Question to find.
     * @return The Question with the ID.
     */
    public Question getQuestionById(int id);

    /**
     * Add a Question to the test
     * @param question
     * @return 
     */
    public boolean addQuestion(Question question);
}