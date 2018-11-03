package com.ent3.servlet.model;

/**
 * Competency
 */
public class Competency {
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

    private Type competencyType;

    public Competency(Type type) {
        this.competencyType = type;
    }

    public Type getCompetencyType() {
        return this.competencyType;
    }

    public int getCompetencyTypeId() {
        return this.competencyType.id();
    }
}