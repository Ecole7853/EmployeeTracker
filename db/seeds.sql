--insert statements
INSERT INTO department (name)
VALUES 
("E2"), 
("E1"), 
("B1"), 
("B2"), 
("F"), 
("C"); 
--buildings at my project

INSERT INTO role (title, salary, department_id)
VALUES 
("Superintendent", 145000, 1), 
("Foremen", 110000, 2), 
("Apprentice", 60000, 3), 
("Laborer", 40000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Big", "Boss", 1, 1),
("Eric", "Cole", 2, 1), 
("John", "Doe", 3, 1), 
("Jane", "Doe", 4, 1), 
("Juan", "Doe", 5, 1);