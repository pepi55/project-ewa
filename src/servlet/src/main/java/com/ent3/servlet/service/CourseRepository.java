package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Course;;

/**
 * CompetencyRepository
 *
 * @author Peter Dimitrov
 */
public interface CourseRepository {

    /**
     * Get all competencies.
     *
     * @return List of all competencies.
     */
    public List<Course> getAllCourses();

    /**
     * Get competency with specific ID.
     *
     * @param id ID of competency to find.
     * @return The competency with the ID.
     */
    public Course getCourseById(int id);

    public boolean addCourse(Course course);
}