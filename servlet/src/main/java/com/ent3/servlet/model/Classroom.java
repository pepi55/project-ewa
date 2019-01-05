package com.ent3.servlet.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Classroom
 */
@Entity
@Table(name = "classrooms")
public class Classroom implements Serializable {
  @Transient
  private static final long serialVersionUID = 1L;

  @Id
  @Column(name = "classroom_id")
  @GeneratedValue(strategy = GenerationType.AUTO)
  private int id;

  @OneToOne
  private User teacher;

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinColumn(name = "classroom_id")
  private List<User> students;

  public Classroom() {
    // Necessary.
  }

  public Classroom(User teacher, List<User> students) {
    this.teacher = teacher;
    this.students = students;
  }

  public int getId() {
    return this.id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public User getTeacher() {
    return this.teacher;
  }

  public void setTeacher(User teacher) {
    if (teacher.getRole() == UserRole.TEACHER) {
      this.teacher = teacher;
    } else {
      // TODO: Throw error.
    }
  }

  public List<User> getStudents() {
    return this.students;
  }

  public void setStudents(List<User> students) {
    for (User u : students) {
      if (u.getRole() != UserRole.USER) {
        // TODO: Throw error.
        return;
      }
    }

    this.students = students;
  }

  public void addStudent(User student) {
    if (student.getRole() == UserRole.USER) {
      students.add(student);
    } else {
      // TODO: Throw error.
    }
  }

  public void deleteStudent(int index) {
    students.remove(index);
  }
}