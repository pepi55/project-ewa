package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Competency;

/**
 * CompetencyRepository
 *
 * @author Peter Dimitrov
 */
public interface CompetencyRepository {

    /**
     * Get all competencies.
     *
     * @return List of all competencies.
     */
    public List<Competency> getAllCompetencies();

    /**
     * Get competency with specific ID.
     *
     * @param id ID of competency to find.
     * @return The competency with the ID.
     */
    public Competency getCompetencyById(int id);
}