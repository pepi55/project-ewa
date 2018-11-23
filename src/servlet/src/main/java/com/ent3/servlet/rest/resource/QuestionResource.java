package com.ent3.servlet.rest.resource;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

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

}