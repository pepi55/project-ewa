package com.ent3.servlet.rest.resource;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.User;
import com.ent3.servlet.rest.model.ClientError;
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

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{userId}")
    public Response getUserById(@PathParam("userId") int id) {
        User result = service.getUserById(id);

        if (result == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("User with id: " + id + " not found")).build();
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }
}