-- USERS --
INSERT INTO `user`(`username`, `password`, `name`, `surname`) VALUES ("user2","userpassword2","peterpan2","deachterrnaam2");
INSERT INTO `user`(`username`, `password`, `name`, `surname`) VALUES ("user3","userpassword3","peterpan3","deachterrnaam3");
INSERT INTO `user`(`username`, `password`, `name`, `surname`) VALUES ("user4","userpassword4","peterpan4","deachterrnaam4");
INSERT INTO `user`(`username`, `password`, `name`, `surname`) VALUES ("user5","userpassword5","peterpan5","deachterrnaam5");
INSERT INTO `user`(`username`, `password`, `name`, `surname`) VALUES ("user6","userpassword6","peterpan6","deachterrnaam6");
INSERT INTO `user`(`username`, `password`, `name`, `surname`) VALUES ("user7","userpassword7","peterpan7","deachterrnaam7");
INSERT INTO `user`(`username`, `password`, `name`, `surname`) VALUES ("admin","admin","admin","admin");

-- ADMINS --
INSERT INTO `admin`(`idadmin`) VALUES (7);

-- TEACHERS --
INSERT INTO `teacher`(`idteacher`) VALUES (5);
INSERT INTO `teacher`(`idteacher`) VALUES (6);
INSERT INTO `teacher`(`idteacher`) VALUES (7);

-- CLASSES --
INSERT INTO `class`(`name`, `idteacher`) VALUES ("groep1", 5);
INSERT INTO `class`(`name`, `idteacher`) VALUES ("groep2", 6);
INSERT INTO `class`(`name`, `idteacher`) VALUES ("groep3", 7);

-- STUDENTS --
INSERT INTO `student`(`mooccount`, `idstudent`, `idclass`) VALUES (3,1,1);
INSERT INTO `student`(`mooccount`, `idstudent`, `idclass`) VALUES (9,2,1);
INSERT INTO `student`(`mooccount`, `idstudent`, `idclass`) VALUES (12,3,3);
INSERT INTO `student`(`mooccount`, `idstudent`, `idclass`) VALUES (4,4,3);

-- QUESTIONS --
INSERT INTO `question`(`question`, `type`) VALUES ("Waarom zijn bananen krom?","radio-button");
INSERT INTO `question`(`question`, `type`) VALUES ("Hoe heet ik?","radio-button");
INSERT INTO `question`(`question`, `type`) VALUES ("Hoeveel dagen zitten er in een jaar?","checkbox");
INSERT INTO `question`(`question`, `type`) VALUES ("Waar zit je op school?","checkbox");

-- COMPETENIES --
INSERT INTO `competency`(`type`) VALUES ("Algemeen kennis");
INSERT INTO `competency`(`type`) VALUES ("Extra kennis");
INSERT INTO `competency`(`type`) VALUES ("Agenda kennis");
INSERT INTO `competency`(`type`) VALUES ("Topografie");

-- ANSWERS --

-- QUESTION 1 --
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("omdat ze geel zijn", 1, 1);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("door de zon", 2, 1);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("omdat ze in Afrika groeien", 3, 1);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("omdat ze geel zijn", 4, 1);

-- QUESTION 2 --
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("swag3000", 1, 2);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("swag2000", 2, 2);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("Er is geen goed antwoord", 2, 2);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("piet", 4, 2);

-- QUESTION 3 --
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("365", 1, 3);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("233", 2, 3);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("364", 3, 3);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("3000",4, 3);

-- QUESTION 4 --
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("HVA", 4, 4);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("HVA", 2, 4);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("UVA", 1, 4);
INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`) VALUES ("geen school", 2, 4);

-- STUDENT_HAS_COMPETENCIES --

-- STUDENT 1 --
INSERT INTO `student_has_competencies`(`idcompetency`, `idstudent`, `timesChosen`) VALUES (1,1,3);
INSERT INTO `student_has_competencies`(`idcompetency`, `idstudent`, `timesChosen`) VALUES (2,1,8);
INSERT INTO `student_has_competencies`(`idcompetency`, `idstudent`, `timesChosen`) VALUES (3,1,3);

-- STUDENT 2 --
INSERT INTO `student_has_competencies`(`idcompetency`, `idstudent`, `timesChosen`) VALUES (1,2,3);
INSERT INTO `student_has_competencies`(`idcompetency`, `idstudent`, `timesChosen`) VALUES (2,2,12);
INSERT INTO `student_has_competencies`(`idcompetency`, `idstudent`, `timesChosen`) VALUES (4,2,1);

-- STUDENT 3 --
INSERT INTO `student_has_competencies`(`idcompetency`, `idstudent`, `timesChosen`) VALUES (1,4,3);
INSERT INTO `student_has_competencies`(`idcompetency`, `idstudent`, `timesChosen`) VALUES (3,4,1);
INSERT INTO `student_has_competencies`(`idcompetency`, `idstudent`, `timesChosen`) VALUES (4,4,10);