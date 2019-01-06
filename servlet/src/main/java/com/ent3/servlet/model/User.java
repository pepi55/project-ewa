package com.ent3.servlet.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Class representing a user.
 */
@Entity
@Table(name = "users")
public class User implements Serializable {
    @Transient
    private static final long serialVersionUID = 1L;

    @Id
    @Column(name = "user_id")
    private String username;

    private String firstname;
    private String lastname;
    private String password;
    private String email;
    private UserRole role;
    private boolean approved;

    public User() {
        // Required.
    }

    public User(String firstName, String lastName, String username, String password, String email, UserRole role) {
        this.firstname = firstName;
        this.lastname = lastName;
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;

        if (role == UserRole.USER) {
            this.approved = true;
        } else {
            this.approved = false;
        }
    }

    public String getFirstName() {
        return this.firstname;
    }

    public void setFirstName(String firstName) {
        this.firstname = firstName;
    }

    public String getLastName() {
        return this.lastname;
    }

    public void setLastName(String lastName) {
        this.lastname = lastName;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public UserRole getRole() {
        return this.role;
    }

    public void setRole(UserRole role) {
        this.role = role;

        if (this.role == UserRole.USER) {
            this.approved = true;
        } else {
            this.approved = false;
        }
    }

    public boolean getApproved() {
        return this.approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    @Override
    public boolean equals(final Object o) {
        if (o == null || o == this || !(o instanceof User)) {
            return false;
        }

        User otherUser = (User)o;

        if (!otherUser.username.equals(this.username)) return false;
        if (!otherUser.firstname.equals(this.firstname)) return false;
        if (!otherUser.lastname.equals(this.lastname)) return false;
        if (!otherUser.email.equals(this.email)) return false;
        if (!otherUser.approved == this.approved) return false;
        if (!otherUser.role.equals(this.role)) return false;
        if (!otherUser.password.equals(this.password)) return false;

        return true;
    }
}