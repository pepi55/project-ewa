package com.ent3.servlet.rest.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.Result;
import com.ent3.servlet.model.User;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.rest.model.ClientMessage;
import com.ent3.servlet.service.ResultRepository;
import com.ent3.servlet.service.UserRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * ResultResource
 *
 * @author Luc Maerten
 */
public class ResultResource {
    private ResultRepository service;

    public ResultResource() {
        service = RepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllResults(@PathParam("userId") String id) {
        List<Result> result;
        UserRepository temprepo = RepoImplementation.getInstance();

        result = service.getAllResults(temprepo.getUserById(id));

        if (result.isEmpty()) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("No results found")).build();
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response AddResult(@PathParam("userId") String id, Result result){
        User user = null;

        UserRepository userService = RepoImplementation.getInstance();
        user = userService.getUserById(id);

        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("User with ID: " + id + " not found")).build();
        }
        result.setUser(user);
        return Response.status(Response.Status.CREATED).entity(service.addResult(result)).build();
    }

    @DELETE
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteAllResults(@PathParam("userId") String id) {
        UserRepository userService = RepoImplementation.getInstance();
        service.deleteAllResults(userService.getUserById(id));

        return Response.status(Response.Status.OK).entity(new ClientMessage("Results from user with ID: " + id + " deleted")).build();
    }
}