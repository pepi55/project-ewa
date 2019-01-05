package com.ent3.servlet.model;

public enum UserRole {
  USER(0),
  ADMIN(1),
  TEACHER(2);

  private final int role;

  private UserRole(int role) {
    this.role = role;
  }

  public int getRole() {
    return this.role;
  }
}