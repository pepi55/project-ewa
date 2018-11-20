package com.ent3.servlet.rest.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.User;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.service.UserRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * UserResource
 */
@Path("users")
public class UserResource {
    private RepositoryService service;

    public UserResource() {
        // XXX: Repo implementation class here.
        service = RepoImplementation.getInstance();
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

    /**
     * Add a new user.
     * Use <code>Invoke-WebRequest -UseBasicParsing *URL* -ContentType "application/json" -Method POST -Body '*JSON*'</code> to add a new user.
     *
     * @param user User to be added.
     * @return HTTP request response.
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(User user) {
        return Response.status(Response.Status.CREATED).entity(service.addUser(user)).build();
    }
}