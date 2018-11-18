package com.ent3.servlet.model;

public class Course {
    private int courseId;
    private String title;
    private String description;
    private String image;
    private String url;

    public Course(int courseId, String title, String description, String image, String url) {
        this.courseId = courseId;
        this.title = title;
        this.description = description;
        this.image = image;
        this.url = url;
    }

    public void setCourseId(int courseId) {
        this.courseId = courseId;
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
        return courseId;
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