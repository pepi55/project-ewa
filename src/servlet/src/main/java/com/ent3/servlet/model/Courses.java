package com.ent3.servlet.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Area of a competency
 *
 * @author Peter Dimitrov
 */
public class Courses {
    private String coursesName;
    private List<Course> courses;

    public Courses(String coursesName) {
        this.coursesName = coursesName;
        courses = new ArrayList<>();
    }

    public void addCourse(Course course) {
        courses.add(course);
    }

    public List<Course> getCourses() {
        return new ArrayList<>(courses);
    }

    public void deleteCourse(int index) {
        courses.remove(index);
    }

    public String getCoursesName() {
        return this.coursesName;
    }
}