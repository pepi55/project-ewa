package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Area;

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
     * Add a new area.
     *
     * @param area The area to be added.
     * @return The area added.
     */
    public Area addArea(Area area);
}