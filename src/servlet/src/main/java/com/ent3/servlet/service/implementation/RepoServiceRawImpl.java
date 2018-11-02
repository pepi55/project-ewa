package com.ent3.servlet.service.implementation;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ent3.servlet.model.User;
import com.ent3.servlet.service.RepositoryService;

/**
 * RepoServiceRawImpl
 *
 * @author Peter Dimitrov
 */
public class RepoServiceRawImpl implements RepositoryService {
    private static RepoServiceRawImpl instance;

    private Map<Integer, User> elements;

    static {
        instance = new RepoServiceRawImpl();
        instance.loadData();
    }

    private RepoServiceRawImpl() {
        elements = new HashMap<>();
    }

    public static RepoServiceRawImpl getInstance() {
        return instance;
    }

    /**
     * Generate raw dummy data.
     */
    private void loadData() {
        elements.put(1, new User("admin", "admin", "admin", "admin",3));
        elements.put(2, new User("peter", "dimitrov", "peter", "password",1));
    }

    @Override
    public List<User> getAllUsers() {
        return new ArrayList<>(elements.values());
    }

    @Override
    public User getUserById(int id) {
        return elements.get(id);
    }
}