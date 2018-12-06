package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Competency;
import com.ent3.servlet.model.Course;

/**
 * AreaRepository
 */
public interface CourseRepository {

    /**
     * Get all areas.
     *
     * @return List of all areas.
     */
    public List<Course> getAllCompetencyCourses(int id);

    /**
     * Get an area using an ID.
     *
     * @param id Of area to get.
     * @return The area.
     */
    public Course getCourseById(int id);

    /**
     * 
     * @param competency
     * @param course
     * @return
     */

    public Course addCourse(Competency competency, Course course);
}