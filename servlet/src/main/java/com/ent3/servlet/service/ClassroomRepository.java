package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Classroom;

/**
 * ClassroomRepository
 */
public interface ClassroomRepository {

  /**
   * Get all existing classrooms.
   *
   * @return A list of all classrooms.
   */
  public List<Classroom> getAllClassrooms();

  /**
   * Find a classroom with id.
   *
   * @param id The ID of the classroom.
   * @return The classroom with the ID.
   */
  public Classroom getClassroomById(int id);

  /**
   * Add a new classroom.
   *
   * @param classroom The classroom to add.
   * @return The added classroom.
   */
  public Classroom addClassroom(Classroom classroom);

  /**
   * Update a classroom in the database.
   *
   * @param classroom The classroom to save.
   * @return The updated classroom.
   */
  public Classroom saveClassroom(Classroom classroom);

  /**
   * Delete a classroom.
   *
   * @param classroom The classroom to delet.
   */
  public void deleteClassroom(Classroom classroom);
}