package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Area;
import com.ent3.servlet.model.Competency;

/**
 * AreaRepository
 */
public interface AreaRepository {

    /**
     * Get all areas.
     *
     * @return List of all areas.
     */
    public List<Area> getAllAreas();

    /**
     * Get an area using an ID.
     *
     * @param id Of area to get.
     * @return The area.
     */
    public Area getAreaById(int id);

    /**
     * Add a competency to an area.
     *
     * @param area The area to add the competency to.
     * @param competency The competency to add.
     * @return Added competency.
     */
    public Competency addCompetency(Area area, Competency competency);

    /**
     * Add a new area.
     *
     * @param area The area to be added.
     * @return The area added.
     */
    public Area addArea(Area area);
}