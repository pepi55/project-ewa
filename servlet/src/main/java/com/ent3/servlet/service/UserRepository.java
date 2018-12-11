package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.User;

/**
 * RepositoryService
 *
 * @author Peter Dimitrov
 */
public interface UserRepository {
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

    /**
     * Get a list of users with specific name.
     *
     * @param firstname The first name of the user to filter.
     * @return A list of users with the first name.
     */
    public List<User> getUsersByFirstName(String firstname);

    /**
     * Get list of users with specific last name.
     *
     * @param lastname Last name filter.
     * @return A list of users with the last name.
     */
    public List<User> getUsersByLastName(String lastname);

    /**
     * Add a user.
     *
     * @param user The user to add.
     * @return The added user.
     */
    public User addUser(User user);

    /**
     * Deletes a user.
     * 
     * @param user the user to delete
     */
    public void deleteUser(User user);
}