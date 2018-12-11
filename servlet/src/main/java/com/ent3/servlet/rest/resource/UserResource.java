package com.ent3.servlet.rest.resource;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.User;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.service.UserRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * UserResource
 *
 * @author Peter Dimitrov
 */
@Path("users")
public class UserResource {
    private UserRepository service;

    public UserResource() {
        // XXX: Repo implementation class here.
        service = RepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers(@DefaultValue("") @QueryParam("firstname") String firstname, @DefaultValue("") @QueryParam("lastname") String lastname) {
        List<User> result;

        if (firstname.isEmpty() && lastname.isEmpty()) {
            result = service.getAllUsers();
        } else {
            result = new ArrayList<>();

            if (!firstname.isEmpty()) {
                result.addAll(service.getUsersByFirstName(firstname));
            }

            if (!lastname.isEmpty()) {
                result.addAll(service.getUsersByLastName(lastname));
            }
        }

        if (result.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("No users found")).build();
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{userId}")
    public Response getUserById(@PathParam("userId") String id) {
        User result = service.getUserById(id);

        if (result == null) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ClientError("User with id: " + id + " not found")).build();
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }

    /**
     * Add a new user. Use
     * <code>Invoke-WebRequest -UseBasicParsing *URL* -ContentType "application/json" -Method POST -Body '*JSON*'</code>
     * to add a new user.
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

    @DELETE
    @Consumes(MediaType.APPLICATION_JSON)
    public void deleteOrderById(User user) {
        service.deleteUser(user);
    }

    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/{id}")
    public Response setApprove(@PathParam("id") String id, @DefaultValue("false") @QueryParam("approve") boolean approve) {
        User user = service.getUserById(id);

        System.out.println(approve);

        return Response.status(Response.Status.OK).entity(service.setApproved(user, approve)).build();
    }
}