# Project-EWA
Entrepreneurship EWA project.

Project members: Melissa, Luc, Toon, Hicham and Peter.

# Dependencies
 - Typescript
 - Node.js
 - tomcat
 - maven
 - jdk-1.8+

# Startup
press: ctrl + shift + B then choose "watch.ts".
type: "live-server" in terminal.

Right click servlet.war in src/servlet/target/ and select run on tomcat server.

# Compile
run maven to compile.

# Other
POST request example:
 - Powershell: `Invoke-WebRequest -UseBasicParsing http://localhost:8080/servlet/services/rest/areas/1/competencies -ContentType "application/json" -Method POST -Body '{"name":"Valuing Ideas"}'`
 - Unix: `curl -d '{"name":"Area1"}' -H "Content-Type: application/json" -X POST http://localhost:8080/servlet/services/rest/areas`

Connect backend to DB:
 - Run local MySQL database.
 - Edit `webapp/META-INF/context.xml` to the correct URL to the database and the correct username + password.

Clearing database:
DROP TABLE `ent3`.`answer`;
DROP table`ent3`.`admin`; 
DROP table `ent3`.`areas`; 
DROP table `ent3`.`class`; 
DROP table `ent3`.`competencies`; 
DROP table `ent3`.`competency`; 
DROP table `ent3`.`hibernate_sequence`; 
DROP table `ent3`.`courses`; 
DROP table `ent3`.`users`; 
DROP table `ent3`.`teacher`; 
DROP table `ent3`.`student_has_competencies`; 
DROP table `ent3`.`student`; 
DROP table `ent3`.`question`; 
DROP table `ent3`.`user`;