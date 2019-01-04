package com.ent3.servlet;

import static org.junit.Assert.assertNotEquals;

import com.ent3.servlet.service.implementation.RawRepoImplementation;

import org.junit.Before;
import org.junit.Test;

public class RawRepoImplementationTest {
  private RawRepoImplementation repo;

  @Before
  public void setup() {
    repo = RawRepoImplementation.getInstance();
  }

  @Test
  public void repoHasUsers() {
    assertNotEquals(repo.getAllUsers(), null);
  }

  @Test
  public void repoHasAreas() {
    assertNotEquals(repo.getAllUsers(), null);
  }

  @Test
  public void repoArea1HasCompetencies() {
    assertNotEquals(repo.getAllCompetencies(), null);
  }
}