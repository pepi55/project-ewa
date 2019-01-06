package com.ent3.servlet.rest.resource;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.ent3.servlet.model.Classroom;
import com.ent3.servlet.model.User;
import com.ent3.servlet.rest.model.ClientError;
import com.ent3.servlet.rest.model.ClientMessage;
import com.ent3.servlet.service.ClassroomRepository;
import com.ent3.servlet.service.UserRepository;
import com.ent3.servlet.service.implementation.RepoImplementation;

/**
 * ClassroomResource
 *
 * @author Petar Dimitrov
 */
@Path("classrooms")
public class ClassroomResource {
  private ClassroomRepository service;

  public ClassroomResource() {
    service = RepoImplementation.getInstance();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAllClassrooms() {
    List<Classroom> result = service.getAllClassrooms();

    if (result.isEmpty()) {
      return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("No classrooms found")).build();
    }

    return Response.status(Response.Status.OK).entity(result).build();
  }

  @GET
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/{classroomId}")
  public Response getClassroomById(@PathParam("classroomId") int id, @DefaultValue("") @QueryParam("userid") String userId) {
    Classroom result = service.getClassroomById(id);

    if (result == null) {
      return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Classroom with id: " + id + " not found")).build();
    }

    if (!userId.isEmpty()) {
      User user;

      {
        UserRepository userService = RepoImplementation.getInstance();
        user = userService.getUserById(userId);
      }

      switch (user.getRole()) {
        case USER:
          if (service.classroomContainsStudent(result, user)) {
            service.removeStudentFromClassroom(result, user);
          } else {
            service.addStudentToClassroom(result, user);
          }
          break;

        case TEACHER:
          service.setClassroomTeacher(result, user);
          break;

        default:
          return Response.status(Response.Status.BAD_REQUEST).entity(new ClientError("Invalid user supplied")).build();
      }
    }

    return Response.status(Response.Status.OK).entity(result).build();
  }

  @DELETE
  @Produces(MediaType.APPLICATION_JSON)
  @Path("/{classroomId}")
  public Response deleteClassroomById(@PathParam("classroomId") int id) {
    Classroom result = service.getClassroomById(id);

    if (result == null) {
      return Response.status(Response.Status.NOT_FOUND).entity(new ClientError("Classroom with id: " + id + " not found")).build();
    }

    service.deleteClassroom(result);

    return Response.status(Response.Status.OK).entity(new ClientMessage("Classroom with ID: " + id + " deleted")).build();
  }

  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response addClassroom(Classroom classroom) {
    return Response.status(Response.Status.CREATED).entity(service.addClassroom(classroom)).build();
  }
}