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