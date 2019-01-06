package com.ent3.servlet.service;

import java.util.List;

import com.ent3.servlet.model.Classroom;
import com.ent3.servlet.model.User;

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
   * Add a student to a classroom.
   *
   * @param classroom The classroom to add the student to.
   * @param student The student to add to the classroom.
   * @return The classroom with the student.
   */
  public Classroom addStudentToClassroom(Classroom classroom, User student);

  /**
   * Check if a student is registered in a classroom.
   *
   * @param classroom The classroom to check.
   * @param student the student to check.
   * @return Whether the student is registered in the classroom.
   */
  public boolean classroomContainsStudent(Classroom classroom, User student);

  /**
   * Remove a student from a classroom.
   *
   * @param classroom The classroom to remove the student from.
   * @param student The student to remove from the classroom.
   * @return The classroom without the student.
   */
  public Classroom removeStudentFromClassroom(Classroom classroom, User student);

  /**
   * Set the teacher of a classroom.
   *
   * @param classroom The classroom to set the teacher of.
   * @param teacher The teacher to assign to the classroom.
   * @return Classroom with the new teacher.
   */
  public Classroom setClassroomTeacher(Classroom classroom, User teacher);

  /**
   * Delete a classroom.
   *
   * @param classroom The classroom to delet.
   */
  public void deleteClassroom(Classroom classroom);
}