package com.ent3.servlet.rest.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.Competency;
import com.ent3.servlet.model.Question;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.service.CompetencyRepository;
import com.ent3.servlet.service.QuestionRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * QuestionResource
 *
 * @author Toon de Hoop
 */
public class QuestionResource {
    private QuestionRepository service;

    public QuestionResource(){
        service = RepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllquestions(@PathParam("competencyId") int competencyId) {
        // TODO: Client error when calling with non existent ID.
        return Response.status(Response.Status.OK).entity(service.getAllCompetencyQuestions(competencyId)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{questionId}")
    public Response getQuestionById(@PathParam("questionId") int questionId) {
        Question result = service.getQuestionById(questionId);

        if (result == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Question with id: " + questionId + " not found")).build();
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addQuestion(@PathParam("competencyId") int competencyId, Question question) {
        Competency competency = null;

        {
            // XXX: Repo implementation use here.
            CompetencyRepository competencyService = RepoImplementation.getInstance();

            competency = competencyService.getCompetencyById(competencyId);
        }

        if (competency == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Competency with ID: " + competencyId + " not found")).build();
        }

        return Response.status(Response.Status.CREATED).entity(service.addQuestion(competency, question)).build();
    }
}
