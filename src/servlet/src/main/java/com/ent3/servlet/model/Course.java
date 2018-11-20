package com.ent3.servlet.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "courses")
public class Course implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "course_id")
    @GeneratedValue
    private int id;

    private String title;
    private String description;
    private String image;
    private String url;
    
    public Course() {
        // Default constructor required.
    }

    public Course(int id, String title, String description, String image, String url) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.url = url;
    }

    public void setCourseId(int courseId) {
        this.id = courseId;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public int getCourseId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getImage() {
        return image;
    }

    public String getUrl() {
        return url;
    }
}