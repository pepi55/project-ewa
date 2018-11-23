package com.ent3.servlet.rest.resource;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.Question;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.service.QuestionRepository;
import com.ent3.servlet.service.UserRepository;
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