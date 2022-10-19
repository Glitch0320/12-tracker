USE company;

INSERT INTO departments(id, name)
VALUES
    (1, 'Engineering'),
    (2, 'IT/Tech'),
    (3, 'Marketing');

INSERT INTO roles(id, title, salary, department_id)
VALUES
    (1, 'Engineer', 170000, 1),
    (2, 'Software Engineer', 132000, 2),
    (3, 'Sales Associate', 90000, 3);

INSERT INTO employees(id, first_name, last_name, role_id)
VALUES
    (1, 'Jon', 'Jones', 1),
    (2, 'Jon', 'Ziemann', 2),
    (3, 'Jon', 'Appleseed', 3);