package com.ent3.servlet.rest.resource.competency;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.Area;
import com.ent3.servlet.model.Competency;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.rest.resource.CourseResource;
import com.ent3.servlet.rest.resource.QuestionResource;
import com.ent3.servlet.service.AreaRepository;
import com.ent3.servlet.service.CompetencyRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * CompetencyResource
 *
 * @author Peter Dimitrov
 */
public class CompetencyResource {
    private CompetencyRepository service;

    public CompetencyResource() {
        // XXX: Repo class implementation here.
        service = RepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCompetencies(@PathParam("areaId") int areaId) {
        return Response.status(Response.Status.OK).entity(service.getAllAreaCompetencies(areaId)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{competencyId}")
    public Response getCompetencyById(@PathParam("competencyId") int competencyId) {
        Competency result = service.getCompetencyById(competencyId);

        if (result == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Competency with id: " + competencyId + " not found")).build();
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }

    /**
     * Adds competency to area.
     * Use <code>Invoke-WebRequest -UseBasicParsing *URL* -ContentType "application/json" -Method POST -Body '*JSON*'</code> to add a new competency.
     *
     * @param areaId The ID of the area to add the competency to.
     * @param competency The competency to be added. NOTE: Make sure this object's class has an empty constructor and getters+setters for each member.
     * @return HTTP response with code of success.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCompetency(@PathParam("areaId") int areaId, Competency competency) {
        Area area = null;

        {
            // XXX: Repo implementation use here.
            AreaRepository areaService = RepoImplementation.getInstance();

            area = areaService.getAreaById(areaId);
        }

        if (area == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Area with ID: " + areaId + " not found")).build();
        }

        // TODO: Add duplication check.
        return Response.status(Response.Status.CREATED).entity(service.addCompetency(area, competency)).build();
        //return Response.status(Response.Status.BAD_REQUEST).entity(new ClientError("Area with ID: " + areaId + " already contains this competency")).build();
    }

    @Path("/{competencyId}/questions")
    public QuestionResource getQuestionResource() {
        return new QuestionResource();
    }

    @Path("/{competencyId}/courses")
    public CourseResource getCourseResource() {
        return new CourseResource();
    }
}