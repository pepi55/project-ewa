package com.ent3.servlet.service.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ent3.servlet.model.Area;
import com.ent3.servlet.model.Competency;
import com.ent3.servlet.model.User;
import com.ent3.servlet.service.AreaRepository;
import com.ent3.servlet.service.CompetencyRepository;
import com.ent3.servlet.service.UserRepository;

/**
 * RepoServiceRawImpl
 *
 * @author Peter Dimitrov
 */
public class RawRepoImplementation implements UserRepository, AreaRepository, CompetencyRepository {
    private static RawRepoImplementation instance;

    private Map<String, User> users;
    private Map<Integer, Area> areas;
    private Map<Integer, Competency> competencies;

    static {
        instance = new RawRepoImplementation();
        instance.loadData();
    }

    private RawRepoImplementation() {
        users = new HashMap<>();
        areas = new HashMap<>();
        competencies = new HashMap<>();
    }

    public static RawRepoImplementation getInstance() {
        return instance;
    }

    ///// USERS /////
    @Override
    public List<User> getAllUsers() {
        return new ArrayList<>(users.values());
    }

    @Override
    public List<User> getUsersByFirstName(String firstname) {
        List<User> result = new ArrayList<>();

        for (User u : users.values()) {
            if (u.getFirstName().equals(firstname)) {
                result.add(u);
            }
        }

        return result;
    }

    @Override
    public List<User> getUsersByLastName(String lastname) {
        List<User> result = new ArrayList<>();

        for (User u : users.values()) {
            if (u.getLastName().equals(lastname)) {
                result.add(u);
            }
        }

        return result;
    }

    @Override
    public User getUserById(String id) {
        return users.get(id);
    }

    @Override
    public User addUser(User user) {
        return users.put(user.getUsername(), user);
    }

    @Override
    public void deleteUser(User user) {
        users.remove(user.getUsername());
    }
    ///// USERS /////

    ///// AREAS /////
    @Override
    public List<Area> getAllAreas() {
        return new ArrayList<>(areas.values());
    }

    @Override
    public Area getAreaById(int id) {
        return areas.get(id);
    }

    @Override
    public Area addArea(Area area) {
        return areas.put(area.getId(), area);
    }
    ///// AREAS /////

    ///// COMPETENCIES /////
    @Override
    public List<Competency> getAllAreaCompetencies(int id) {
        if (!areas.containsKey(id)) {
            return null;
        }

        Area area = areas.get(id);

        return area.getCompetencies();
    }

    @Override
    public Competency getCompetencyById(int id) {
        if (competencies.containsKey(id)) {
            return null;
        }

        return competencies.get(id);
    }

    @Override
    public Competency addCompetency(Area area, Competency competency) {
        area.addCompetency(competency);
        return competency;
    }

    public List<Competency> getAllCompetencies() {
        return new ArrayList<>(competencies.values());
    }
    ///// COMPETENCIES /////

    private void loadData() {
        users.put("peter", new User("Peter", "Dimitrov", "peter", "password", "peter@gmail.com", 2));
        users.put("admin", new User("Admin", "Admin", "admin", "password", "admin@servlet.com", 1));

        Area ideas = new Area("IDEAS_OPPORTUNITIES");
        Area resources = new Area("RESOURCES");
        Area action = new Area("INTO_ACTION");

        Competency opportunities = new Competency(1, "Spotting Opportunities", ideas);
        Competency creativity = new Competency(2, "Creativity", ideas);
        Competency vision = new Competency(3, "Vision", ideas);

        Competency self = new Competency(4, "Self-Awareness & Self-Efficacy", resources);
        Competency motivation = new Competency(5, "Motivation & Perserverance", resources);
        Competency mobilising = new Competency(6, "Mobilising Resources", resources);

        Competency initiative = new Competency(7, "Taking the Initiative", action);
        Competency planning = new Competency(8, "Planning & Management", action);
        Competency coping = new Competency(9, "Coping With Ambiguity, Uncertainty & Risk", action);

        areas.put(1, ideas);
        areas.put(2, resources);
        areas.put(3, action);

        competencies.put(1, opportunities);
        competencies.put(2, creativity);
        competencies.put(3, vision);

        competencies.put(5, self);
        competencies.put(6, motivation);
        competencies.put(7, mobilising);

        competencies.put(8, initiative);
        competencies.put(9, planning);
        competencies.put(10, coping);
    }
}