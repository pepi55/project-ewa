package com.ent3.servlet.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Competency
 *
 * @author Peter Dimitrov
 */
@Entity
@Table(name = "competencies")
public class Competency implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "competency_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @ManyToOne(cascade = CascadeType.MERGE, fetch = FetchType.LAZY)
    @JoinColumn(name = "area_id")
    @JsonbTransient
    private Area area;

    private String name;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "competency_id")
    private List<Course> courses;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "competency_id")
    private List<Question> questions ;

    

    public Competency() {
        // Required.
        courses = new ArrayList<>();
    }

    public Competency(int id, String name, Area area) {
        this.id = id;
        this.name = name;
        this.area = area;
        courses = new ArrayList<>();
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Area getArea() {
        return this.area;
    }

    public void setArea(Area area) {
        this.area = area;
    }

    public void addCourse(Course course) {
        courses.add(course);
        course.setCompetency(this);
    }

    public List<Course> getCourses() {
        return new ArrayList<>(courses);
    }

    public void setCourses(List<Course> courses) {
        this.courses = courses;
    }

    public void deleteCourse(int index) {
        courses.remove(index);
    }

}