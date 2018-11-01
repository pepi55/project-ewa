package com.ent3.servlet.rest.model;

import java.io.Serializable;

/**
 * ClientError
 *
 * @author Peter Dimitrov
 */
public class ClientError implements Serializable {
    private static final long serialVersionUID = 6743930710486946057L;

    private String errorMessage;

    /**
     * Create a new error.
     *
     * @param message The error message to display.
     */
    public ClientError(String message) {
        errorMessage = message;
    }

    public String getErrorMessage() {
        return errorMessage;
    }
}