package com.ent3.servlet.rest.config;

import java.io.IOException;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.container.PreMatching;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;

/**
 * CorsFilter
 */
@Provider
@PreMatching
public class CorsFilter implements ContainerRequestFilter, ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
        if (requestContext.getHeaderString("Origin") == null) {
            return;
        }

        if (isPreFlightRequest(requestContext)) {
            responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
            // Additional options include: PUT, DELETE, OPTIONS, HEAD
            responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST");
            responseContext.getHeaders().add("Access-Control-Allow-Headers", requestContext.getHeaderString("Access-Control-Request-Headers"));
        }

        responseContext.getHeaders().add("Access-Control-Allow-Origin", "*");
    }

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        if (isPreFlightRequest(requestContext)) {
            requestContext.abortWith(Response.ok().build());
            return;
        }
    }

    private boolean isPreFlightRequest(ContainerRequestContext requestContext) {
        return requestContext.getHeaderString("Origin") != null && requestContext.getMethod().equalsIgnoreCase("OPTIONS");
    }
}