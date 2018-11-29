package com.ent3.servlet.service;

import java.util.List;
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
    public List<Course> getAllCourses();

    /**
     * Get an area using an ID.
     *
     * @param id Of area to get.
     * @return The area.
     */
    public Course getCourseById(int id);

    /**
     * Add a competency to an area.
     *
     * @param area The area to add the competency to.
     * @param competency The competency to add.
     * @return Added course.
     */
    public Course addCourse(Course course);
}