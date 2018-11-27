# Project-EWA
Entrepreneurship EWA project.

Project members: Melissa, Luc, Toon, Hicham and Peter.

# Dependencies
 - Typescript
 - Node.js
 - tomcat
 - maven
 - jdk-1.8+
 - live-server

# Startup
~~press: ctrl + shift + B then choose "watch.ts".~~
Run: npm install.
Run: npm start.
Type: "(./node_modules/.bin/)live-server" in terminal.

Right click servlet.war in src/servlet/target/ and select run on tomcat server.

# Compile
Package with maven to compile.

# Other
POST request example:
 - Powershell: `Invoke-WebRequest -UseBasicParsing http://localhost:8080/servlet/services/rest/areas/1/competencies -ContentType "application/json" -Method POST -Body '{"name":"Valuing Ideas"}'`
 - Unix: `curl -d '{"name":"Area1"}' -H "Content-Type: application/json" -X POST http://localhost:8080/servlet/services/rest/areas`

Connect backend to DB:
 - ~~Run local MySQL database.~~
 - Add database titled: `ent3`.
 - ~~Edit `webapp/META-INF/context.xml` to the correct URL to the database and the correct username + password.~~
 - Add `webapp/META-INF/context.xml` containing:
    ~~~~
    <?xml version="1.0" encoding="UTF-8"?>
    <Context path="/servlet">
        <Resource auth="Container" driverClassName="com.mysql.jdbc.Driver" name="jdbc/ent3" type="javax.sql.DataSource" url="jdbc:mysql://localhost:3306/ent3?serverTimezone=UTC" username="<username>" password="<password>" />
    </Context>
    ~~~~

Clearing database:
~~~~
USE ent3;
DROP TABLE answer;
DROP table admin`;
DROP table areas;
DROP table class;
DROP table competencies;
DROP table competency;
DROP table hibernate_sequence;
DROP table courses;
DROP table users;
DROP table teacher;
DROP table student_has_competencies;
DROP table student;
DROP table question;
DROP table user;
~~~~