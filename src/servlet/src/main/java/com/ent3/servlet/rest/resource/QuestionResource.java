package com.ent3.servlet.rest.resource;

import java.util.List;

import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.Question;
import com.ent3.servlet.service.QuestionRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * QuestionResource
 *
 * @author Toon de Hoop
 */
@Path("questions")
public class QuestionResource {
    private QuestionRepository service;

    public QuestionResource(){
        service = RepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllquestions() {
        return Response.status(Response.Status.OK).entity(service.getAllQuestions()).build();
    }

    // @GET
    // @Produces(MediaType.APPLICATION_JSON)
    // public Response getAllUsers(@DefaultValue("") @QueryParam("firstame") String firstname, @DefaultValue("") @QueryParam("lastname") String lastname) {
    //     List<Question> result;

    //     if (firstname.isEmpty() && lastname.isEmpty()) {
    //         result = service.getAllUsers();
    //     } else {
    //         result = new ArrayList<>();

    //         if (!firstname.isEmpty()) {
    //             result.addAll(service.getUsersByFirstName(firstname));
    //         }

    //         if (!lastname.isEmpty()) {
    //             result.addAll(service.getUsersByLastName(lastname));
    //         }
    //     }

    //     if (result.isEmpty()) {
    //         return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("No users found")).build();
    //     }

    //     return Response.status(Response.Status.OK).entity(result).build();
    // }

}