package com.ent3.servlet.rest.resource;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.User;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.service.UserRepository;
import com.ent3.servlet.service.implementation.RawRepoImplementation;

/**
 * UserResource
 *
 * @author Peter Dimitrov
 */
@Path("users")
public class UserResource {
    private UserRepository service;

    public UserResource() {
        service = RawRepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllUsers(@DefaultValue("") @QueryParam("firstname") String firstname, @DefaultValue("") @QueryParam("lastname") String lastname) {
        List<User> result = service.getAllUsers();

        if (result == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("No users found")).build();
        }

        if (!firstname.isEmpty()) {
            List<User> tmp = new ArrayList<>();

            for (User user : result) {
                if (firstname.equals(user.getFirstName())) {
                    tmp.add(user);
                }
            }

            result = tmp;
        }

        if (!lastname.isEmpty()) {
            List<User> tmp = new ArrayList<>();

            for (User user : result) {
                if (lastname.equals(user.getLastName())) {
                    tmp.add(user);
                }
            }

            result = tmp;
        }

        return Response.status(Response.Status.OK).entity(result).build();
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