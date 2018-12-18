package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Competency;
import com.ent3.servlet.model.Question;

/**
 * RepositoryService for UserCompetency
 *
 * @author Toon de Hoop
 */
public interface UserCompetencyRepository {

    /**
     * Gets all available Score.
     *
     * @param id ID of competency to get questions of.
     * @return List containing all questions.
     */
    public List<Question> getAllCompetencyQuestions(int id);

    /**
     * Get a specific question by id.
     *
     * @param id ID of question to get.
     * @return The question.
     */
    public Question getQuestionById(int id);

    /**
     * Add a Question.
     *
     * @param competency The competency to add the question to.
     * @param question The question to add.
     * @return The added question.
     */
    public Question addQuestion(Competency competency, Question question);
}
