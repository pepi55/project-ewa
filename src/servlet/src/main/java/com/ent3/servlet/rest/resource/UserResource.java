package com.ent3.servlet.rest.resource;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.ent3.servlet.model.User;
import com.ent3.servlet.service.RepositoryService;
import com.ent3.servlet.service.implementation.RepoServiceRawImpl;

/**
 * UserResource
 */
@Path("users")
public class UserResource {
    private RepositoryService service;

    public UserResource() {
        service = RepoServiceRawImpl.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getAllUsers() {
        return service.getAllUsers();
    }
}