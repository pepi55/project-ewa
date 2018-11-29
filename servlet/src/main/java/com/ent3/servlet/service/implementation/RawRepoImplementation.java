package com.ent3.servlet.service.implementation;

/*
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ent3.servlet.model.Area;
import com.ent3.servlet.model.Competency;
import com.ent3.servlet.model.Course;
import com.ent3.servlet.model.Courses;
import com.ent3.servlet.model.User;
import com.ent3.servlet.service.AreaRepository;
import com.ent3.servlet.service.UserRepository;
import com.ent3.servlet.service.CoursesRepository;
*/

/**
 * RepoServiceRawImpl
 *
 * @author Peter Dimitrov
 */
/*
public class RawRepoImplementation implements UserRepository, AreaRepository, CoursesRepository {
    private static RawRepoImplementation instance;

    private Map<Integer, User> users;
    private Map<Integer, Area> areas;
    private Map<Integer, Courses> courses;

    static {
        instance = new RawRepoImplementation();
        instance.loadData();
    }

    private RawRepoImplementation() {
        users = new HashMap<>();
        areas = new HashMap<>();
        courses = new HashMap<>();
    }

    public static RawRepoImplementation getInstance() {
        return instance;
    }

    @Override
    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    @Override
    public User getUserById(int id) {
        return users.get(id);
    }

    @Override
    public List<User> getUsersByFirstName(String firstname) {
        // TOD: implement.
        return null;
    }

    @Override
    public List<User> getUsersByLastName(String lastname) {
        // TOD: implement.
        return null;
    }

    @Override
    public List<Area> getAllAreas() {
        return new ArrayList<>(areas.values());
    }

    @Override
    public Area getAreaById(int id) {
        return areas.get(id);
    }

    @Override
    public List<Courses> getAllCourses() {
        return new ArrayList<>(courses.values());
    }

    @Override
    public Courses getCoursesListById(int id) {
        return courses.get(id);
    }

    @Override
    public boolean addCourse(Courses coursesList, Course course) {
        // TODO: check if exists.
        // boolean doesNotContain = !coursesList.getCourses().contains(course);
        // if (doesNotContain) {
        //     coursesList.addCourse(course);
        // }

        coursesList.addCourse(course);
        return true;
    }


    @Override
    public boolean addCompetency(Area area, Competency competency) {
        // TODO: Proper comparison.
        boolean doesNotContain = !area.getCompetencies().contains(competency);

        if (doesNotContain) {
            area.addCompetency(competency);
        }

        return competency;
    }

    private void loadData() {
        users.put(1, new User(1, "admin", "admin", "admin", "admin", 3));
        users.put(2, new User(2, "peter", "dimitrov", "peter", "password", 1));

        Area ideas = new Area(Area.Type.IDEAS_OPPORTUNITIES);
        Area resources = new Area(Area.Type.RESOURCES);
        Area action = new Area(Area.Type.INTO_ACTION);

        Competency opportunities = new Competency(1, "Spotting Opportunities");
        Competency creativity = new Competency(2, "Creativity");
        Competency vision = new Competency(3, "Vision");

        Competency self = new Competency(4, "Self-Awareness & Self-Efficacy");
        Competency motivation = new Competency(5, "Motivation & Perserverance");
        Competency mobilising = new Competency(6, "Mobilising Resources");

        Competency initiative = new Competency(7, "Taking the Initiative");
        Competency planning = new Competency(8, "Planning & Management");
        Competency coping = new Competency(9, "Coping With Ambiguity, Uncertainty & Risk");

        ideas.addCompetency(opportunities);
        ideas.addCompetency(creativity);
        ideas.addCompetency(vision);

        resources.addCompetency(self);
        resources.addCompetency(motivation);
        resources.addCompetency(mobilising);

        action.addCompetency(initiative);
        action.addCompetency(planning);
        action.addCompetency(coping);

        areas.put(1, ideas);
        areas.put(2, resources);
        areas.put(3, action);

        // Course course1 = new Course(1, "rekenen met zn tweeen", "description1", "image1","linkje1");
        // Course course2 = new Course(2, "leren schrijven", "description2", "image2","linkje2");
        // Course course3 = new Course(3, "optellen", "description3", "image3","linkje3");
        // Course course4 = new Course(4, "aftrekken", "description4", "image4","linkje4");

        Courses CoursesList = new Courses("firstCourseList");
        // CoursesList.addCourse(course1);
        // CoursesList.addCourse(course2);
        // CoursesList.addCourse(course3);
        // CoursesList.addCourse(course4);
        courses.put(1, CoursesList);
    }
}
*/