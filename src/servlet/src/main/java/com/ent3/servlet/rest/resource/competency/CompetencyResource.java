package com.ent3.servlet.rest.resource.competency;

import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.Competency;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.service.CompetencyRepository;
import com.ent3.servlet.service.implementation.RawRepoImplementation;

/**
 * CompetencyResource
 */
@Path("competencies")
public class CompetencyResource {
    private CompetencyRepository service;

    public CompetencyResource() {
        service = RawRepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Competency> getAllCompetencies() {
        return service.getAllCompetencies();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{competencyId}")
    public Response getCompetencyById(@PathParam("competencyId") int id) {
        Competency result = service.getCompetencyById(id);

        if (result == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Competency with id: " + id + " not found")).build();
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }

    @Path("/{competencyId}/subcompetencies")
    public SubCompetencyResource getSubCompetencyResource() {
        return new SubCompetencyResource();
    }
}