package com.ent3.servlet.service.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ent3.servlet.model.Competency;
import com.ent3.servlet.model.User;
import com.ent3.servlet.model.Competency.Type;
import com.ent3.servlet.service.CompetencyRepository;
import com.ent3.servlet.service.UserRepository;

/**
 * RepoServiceRawImpl
 *
 * @author Peter Dimitrov
 */
public class RawRepoImplementation implements UserRepository, CompetencyRepository {
    private static RawRepoImplementation instance;

    private Map<Integer, User> users;
    private Map<Integer, Competency> competencies;

    static {
        instance = new RawRepoImplementation();
        instance.loadData();
    }

    private RawRepoImplementation() {
        users = new HashMap<>();
        competencies = new HashMap<>();
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
    public List<Competency> getAllCompetencies() {
        return new ArrayList<>(competencies.values());
    }

    @Override
    public Competency getCompetencyById(int id) {
        return competencies.get(id);
    }

    /**
     * Generate raw dummy data.
     */
    private void loadData() {
        users.put(1, new User("admin", "admin", "admin", "admin", 3));
        users.put(2, new User("peter", "dimitrov", "peter", "password", 1));

        competencies.put(1, new Competency(Type.RESOURCES));
        competencies.put(2, new Competency(Type.IDEAS_OPPORTUNITIES));
        competencies.put(3, new Competency(Type.INTO_ACTION));
    }
}