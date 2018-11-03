package com.ent3.servlet.rest.resource.competency;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.service.CompetencyRepository;
import com.ent3.servlet.service.implementation.RawRepoImplementation;

/**
 * SubCompetencyResource
 */
@Path("/")
public class SubCompetencyResource {
    private CompetencyRepository service;

    public SubCompetencyResource() {
        service = RawRepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response test(@PathParam("competencyId") int competencyId) {
        return Response.status(Response.Status.OK).entity("Testing sub competencies with competency ID: " + competencyId).build();
    }
}