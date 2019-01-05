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
   * Get all students from of the classroom.
   *
   * @param classroom The classroom to get students from.
   * @return List of students.
   */
  public List<User> getClassroomStudents(Classroom classroom);

  /**
   * Get the teacher of a classroom.
   *
   * @param classroom The classroom to get the teacher of.
   * @return The teacher.
   */
  public User getClassroomTeacher(Classroom classroom);

  /**
   * Add a student to a classroom.
   *
   * @param classroom The classroom to add the student to.
   * @param student The student to add to the classroom.
   * @return The classroom with the student.
   */
  public Classroom addStudentToClassroom(Classroom classroom, User student);

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