package com.ent3.servlet.model;

/**
 * Competency
 *
 * @author Peter Dimitrov
 */
public class Competency {
    private String name;

    public Competency() {
        name = "";
    }

    public Competency(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
}