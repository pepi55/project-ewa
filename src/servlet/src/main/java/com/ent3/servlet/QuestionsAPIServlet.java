package com.ewa.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Week 3 EWA workshop.
 *
 * @author Peter Dimitrov (500790230)
 */
@WebServlet(name = "QuestionsAPIServlet", urlPatterns = {"/QuestionsAPIServlet"})
public class QuestionsAPIServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

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
        String questions = "[ { \"id\": 1, \"setId\": 1, \"title\": \"Part 1\", \"question\": \"What?\", \"answers\": [ { \"text\": \"Yes\", \"correct\": false }, { \"text\": \"No\", \"correct\": false }, { \"text\": \"Yesn\\'t\", \"correct\": true } ] }, { \"id\": 2, \"setId\": 1, \"title\": \"Part 2\", \"question\": \"Who?\", \"answers\": [ { \"text\": \"You\", \"correct\": false }, { \"text\": \"Me\", \"correct\": false }, { \"text\": \"Thanos\", \"correct\": false }, { \"text\": \"ThanosCar\", \"correct\": true } ] } ]";
        
        response.setContentType("application/json");
        PrintWriter writer = response.getWriter();
        writer.print(questions);
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