package com.ent3.servlet.service.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ent3.servlet.model.Area;
import com.ent3.servlet.model.Competency;
import com.ent3.servlet.model.User;
import com.ent3.servlet.service.AreaRepository;
import com.ent3.servlet.service.UserRepository;

/**
 * RepoServiceRawImpl
 *
 * @author Peter Dimitrov
 */
public class RawRepoImplementation implements UserRepository, AreaRepository {
    private static RawRepoImplementation instance;

    private Map<Integer, User> users;
    private Map<Integer, Area> areas;

    static {
        instance = new RawRepoImplementation();
        instance.loadData();
    }

    private RawRepoImplementation() {
        users = new HashMap<>();
        areas = new HashMap<>();
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
        // TODO: implement.
        return null;
    }

    @Override
    public List<User> getUsersByLastName(String lastname) {
        // TODO: implement.
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
    public boolean addCompetency(Area area, Competency competency) {
        boolean doesNotContain = !area.getCompetencies().contains(competency);

        if (doesNotContain) {
            area.addCompetency(competency);
        }

        return doesNotContain;
    }

    /**
     * Generate raw dummy data.
     */
    private void loadData() {
        users.put(1, new User("admin", "admin", "admin", "admin", 3));
        users.put(2, new User("peter", "dimitrov", "peter", "password", 1));

        Area ideas = new Area(Area.Type.IDEAS_OPPORTUNITIES);
        Area resources = new Area(Area.Type.RESOURCES);
        Area action = new Area(Area.Type.INTO_ACTION);

        Competency opportunities = new Competency("Spotting Opportunities");
        Competency creativity = new Competency("Creativity");
        Competency vision = new Competency("Vision");

        Competency self = new Competency("Self-Awareness & Self-Efficacy");
        Competency motivation = new Competency("Motivation & Perserverance");
        Competency mobilising = new Competency("Mobilising Resources");

        Competency initiative = new Competency("Taking the Initiative");
        Competency planning = new Competency("Planning & Management");
        Competency coping = new Competency("Coping With Ambiguity, Uncertainty & Risk");

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
    }
}