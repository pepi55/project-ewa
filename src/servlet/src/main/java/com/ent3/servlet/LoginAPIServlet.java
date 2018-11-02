package com.ent3.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ent3.servlet.model.User;
import com.google.gson.Gson;

/**
 * Week 3 EWA workshop.
 *
 * @author Peter Dimitrov
 */
@WebServlet(name = "LoginAPIServlet", urlPatterns = { "/LoginAPIServlet" })
public class LoginAPIServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;
    private Gson gson = new Gson();

    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request  servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException      if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ArrayList<User> users = new ArrayList<>();
        users.add(new User("admin", "admin", "admin", "admin", 3));
        users.add(new User("peter", "dimitrov", "jemoer", "jemoer", 1));
        String userString = gson.toJson(users);
        PrintWriter writer = response.getWriter();

        // prevent "no Acces-Control-Allow-Orogin"
        response.addHeader("Origin", "http://127.0.0.1:8080/");
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        writer.print(userString);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO: Implement post request.
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }
}