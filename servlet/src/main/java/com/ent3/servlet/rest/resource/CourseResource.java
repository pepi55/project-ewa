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
import com.ent3.servlet.model.Course;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.service.CompetencyRepository;
import com.ent3.servlet.service.CourseRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * UserResource
 *
 * @author Hicham
 */
public class CourseResource {
    private CourseRepository service;

    public CourseResource() {
        service = RepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCourses(@PathParam("competencyId") int competencyId) {

        return Response.status(Response.Status.OK).entity(service.getAllCompetencyCourses(competencyId)).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{courseId}")
    public Response getCourseById(@PathParam("courseId") int courseId) {
        Course result = service.getCourseById(courseId);

        if (result == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Course with id: " + courseId + " not found")).build();
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }

     /**
     * Adds Course
     * Use <code>Invoke-WebRequest -UseBasicParsing *URL* -ContentType "application/json" -Method POST -Body '*JSON*'</code> to add a new course.
     *
     * @param course the course added to DB
     * @return HTTP response with code of success.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCourse(@PathParam("competencyId")int competencyId, Course course) {
        Competency competency = null;

        {
            // XXX: Repo implementation use here.
            CompetencyRepository competencyService = RepoImplementation.getInstance();

            competency = competencyService.getCompetencyById(competencyId);
        }

        if (competency == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Competency with ID: " + competencyId + " not found")).build();
        } else {
            // TODO: Add duplication check.
            return Response.status(Response.Status.CREATED).entity(service.addCourse(competency, course)).build();
            //return Response.status(Response.Status.BAD_REQUEST).entity(new ClientError("Area with ID: " + areaId + " already contains this competency")).build();
        }

        
        //return Response.status(Response.Status.BAD_REQUEST).entity(new ClientError("Course with ID: " + course.getCourseId() + " already exists")).build();
    }
}