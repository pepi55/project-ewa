package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Result;
import com.ent3.servlet.model.User;

/**
 * RepositoryService
 *
 * @author Luc Maerten
 */
public interface ResultRepository {
    /**
     * Gets all available results from user.
     *
     * @return List containing all results from user.
     */
    public List<Result> getAllResults(User user);

    /**
     * Gets all available results from user.
     *
     * @return List containing all results from user.
     */
    public void deleteAllResults(User user);

    /**
     * Add a user.
     *
     * @param user The user to add.
     * @return The added user.
     */
    public Result addResult(Result result);
}