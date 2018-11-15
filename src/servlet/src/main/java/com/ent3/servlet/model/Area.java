package com.ent3.servlet.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Area of a competency
 *
 * @author Peter Dimitrov
 */
public class Area {
    public enum Type {
        IDEAS_OPPORTUNITIES (1),
        RESOURCES (2),
        INTO_ACTION (3);

        private int id;

        private Type(int id) {
            this.id = id;
        }

        public int id() {
            return this.id;
        }
    }

    private Type areaType;
    private List<Competency> competencies;

    public Area(Type type) {
        this.areaType = type;
        competencies = new ArrayList<>();
    }

    public void addCompetency(Competency comp) {
        competencies.add(comp);
    }

    public List<Competency> getCompetencies() {
        return new ArrayList<>(competencies);
    }

    public void deleteCompetency(int index) {
        competencies.remove(index);
    }

    public Type getAreaType() {
        return this.areaType;
    }

    public int getAreaTypeId() {
        return this.areaType.id();
    }
}