package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.User;

/**
 * RepositoryService
 *
 * @author Peter Dimitrov
 */
public interface RepositoryService {
    /**
     * Gets all available users.
     *
     * @return List containing all users.
     */
    public List<User> getAllUsers();

    /**
     * Get a specific user by id.
     *
     * @param id ID of user to get.
     * @return The user.
     */
    public User getUserById(int id);
}