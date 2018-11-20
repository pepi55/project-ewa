package com.ent3.servlet.rest.resource.competency;

import java.util.List;

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
import com.ent3.servlet.service.AreaRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * CompetencyResource
 *
 * @author Peter Dimitrov
 */
@Path("/")
public class CompetencyResource {
    private AreaRepository service;

    public CompetencyResource() {
        // XXX: Repo class implementation here.
        service = RepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCompetencies(@PathParam("areaId") int areaId) {
        Area area = service.getAreaById(areaId);

        if (area == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Area with ID: " + areaId + " not found")).build();
        }

        List<Competency> result = area.getCompetencies();

        return Response.status(Response.Status.OK).entity(result).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{competencyId}")
    public Response getCompetencyById(@PathParam("areaId") int areaId, @PathParam("competencyId") int competencyId) {
        Area area = service.getAreaById(areaId);

        if (area == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Area with id: " + areaId + " not found")).build();
        }

        // TODO: Add safety net for array.
        Competency result = area.getCompetencies().get(competencyId);

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
        Area area = service.getAreaById(areaId);

        if (area == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Area with ID: " + areaId + " not found")).build();
        }

        // TODO: Better check/control.
        if (competency != null) {
            service.addCompetency(area, competency);
            return Response.status(Response.Status.CREATED).build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity(new ClientError("Area with ID: " + areaId + " already contains this competency")).build();
        }
    }
}