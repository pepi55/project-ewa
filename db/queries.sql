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