package com.ent3.servlet.rest.resource.competency;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.Area;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.service.AreaRepository;
import com.ent3.servlet.service.implementation.RawRepoImplementation;

/**
 * AreaResource
 *
 * @author Peter Dimitrov
 */
@Path("areas")
public class AreaResource {
    private AreaRepository service;

    public AreaResource() {
        service = RawRepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAreas() {
        return Response.status(Response.Status.OK).entity(service.getAllAreas()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{areaId}")
    public Response getAreaById(@PathParam("areaId") int id) {
        Area result = service.getAreaById(id);

        if (result == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Area with ID: " + id + " not found")).build();
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }

    @Path("/{areaId}/competencies")
    public CompetencyResource getCompetencyResource() {
        return new CompetencyResource();
    }
}