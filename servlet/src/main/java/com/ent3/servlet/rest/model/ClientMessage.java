package com.ent3.servlet.rest.model;

import java.io.Serializable;

/**
 * ClientMessage used to send a message to the caller.
 *
 * @author Peter Dimitrov
 */
public class ClientMessage implements Serializable {
    private static final long serialVersionUID = 6743930710486946057L;

    private String message;

    /**
     * Create a new message.
     *
     * @param message The message to display.
     */
    public ClientMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}