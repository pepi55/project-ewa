
-- Get signed up users --
SELECT u.`username`,
    (
        IF (u.`iduser` IN (SELECT `student`.`idstudent` FROM `student`),
            'Student',
            (IF (u.`iduser` IN (SELECT `admin`.`idadmin` FROM `admin`), 'Admin', 'Teacher'))
        )
    ) AS user_role,
    u.`name`,
    u.`surname`
FROM `user` AS u;

-- BEFORE USING THE QUERIES REPLACE THE VALUES FIRST --

-- ANSWERS QUERIES --

INSERT INTO `answer`(`answer`, `idcompetency`, `idquestion`)
VALUES ([value-1],[value-2],[value-3]);

UPDATE `answer` 
SET `answer`=[value-2],`idcompetency`=[value-3],`idquestion`=[value-4] 
WHERE `idanswer`=[value-1];

SELECT  `answer`, `idcompetency`, `idquestion` 
FROM `answer` 
WHERE `idanswer`=[value-1];

DELETE FROM `answer` 
WHERE `idanswer`=[value-1];

-- COMPETENCIES  QUERIES --

SELECT `type` 
FROM `competency` 
WHERE `idcompetency`=[value-1];

UPDATE `competency` 
SET `type`=[value-2] 
WHERE `idcompetency`=[value-1];

DELETE FROM `competency` 
WHERE `type`=[value-2];

INSERT INTO `competency`( `type`) 
VALUES ([value-1]);


-- JOINS FOR THE TEST --
SELECT  `B.question`, `A.answer`, `C.type`
FROM `answer A`
INNER JOIN `question B` ON `B.idquestion` = `A.idquestion`
INNER JOIN `competency C` ON `A.idcompetency` = `C.idcompetency` 
ORDER BY `B.question`;













