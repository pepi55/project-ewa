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
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.service.AreaRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * AreaResource
 *
 * @author Peter Dimitrov
 */
@Path("areas")
public class AreaResource {
    private AreaRepository service;

    public AreaResource() {
        // XXX: Repo class implementation here.
        service = RepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllAreas() {
        return Response.status(Response.Status.OK).entity(service.getAllAreas()).build();
    }

    /**
     * Add a new area.
     * Use <code>Invoke-WebRequest -UseBasicParsing *URL* -ContentType "application/json" -Method POST -Body '*JSON*'</code> to add a new area.
     *
     * @param area Area to add.
     * @return Added area.
     */
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addArea(Area area) {
        return Response.status(Response.Status.CREATED).entity(service.addArea(area)).build();
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