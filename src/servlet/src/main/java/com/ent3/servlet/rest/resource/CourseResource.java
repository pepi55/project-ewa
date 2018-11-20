package com.ent3.servlet.rest.resource;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.Course;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.service.CourseRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * UserResource
 *
 * @author Hicham
 */
@Path("courses")
public class CourseResource {
    private CourseRepository service;

    public CourseResource() {
        service = RepoImplementation.getInstance();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCourses() {
        return Response.status(Response.Status.OK).entity(service.getAllCourses()).build();
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/{courseId}")
    public Response getCourseById(@PathParam("courseId") int id) {
        Course result = service.getCourseById(id);

        if (result == null) {
            return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("CourseList with id: " + id + " not found")).build();
        }

        return Response.status(Response.Status.OK).entity(result).build();
    }

     /**
     * Adds competency to area.
     * Use <code>Invoke-WebRequest -UseBasicParsing *URL* -ContentType "application/json" -Method POST -Body '*JSON*'</code> to add a new course.
     *
     * @param areaId The ID of the area to add the competency to.
     * @param competency The competency to be added. NOTE: Make sure this object's class has an empty constructor and getters+setters for each member.
     * @return HTTP response with code of success.
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addCourse(Course course) {
        return Response.status(Response.Status.CREATED).entity(service.addCourse(course)).build();
        //return Response.status(Response.Status.BAD_REQUEST).entity(new ClientError("Course with ID: " + course.getCourseId() + " already exists")).build();
    }
}