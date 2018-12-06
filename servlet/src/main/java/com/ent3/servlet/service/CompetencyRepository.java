package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Area;
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
     * @param id The id of the area to get competencies from.
     * @return List of all competencies.
     */
    public List<Competency> getAllAreaCompetencies(int id);

    /**
     * Get competency with specific ID.
     *
     * @param id ID of competency to find.
     * @return The competency with the ID.
     */
    public Competency getCompetencyById(int id);

    /**
     * Add a competency to an area.
     *
     * @param area The area to add the competency to.
     * @param competency The competency to add.
     * @return Added competency.
     */
    public Competency addCompetency(Area area, Competency competency);
}
