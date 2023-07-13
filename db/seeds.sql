delete from employee;
delete from role;
delete from department;

INSERT INTO department (name)
VALUES  ('finance'),
        ('tax_evasion'),
        ('money_laundering');

INSERT INTO role (title, salary, department_id)
VALUES  ('grunt', 12000.00, 1),
        ('skilled_worker', 13000.00, 1),
        ('almost_manager', 40000.00, 2),
        ('manager', 43000.00, 2),
        ('supreme_leader', 300000.00, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('sam', 'sampson', 1, 10),
        ('lam', 'lampson', 1, 10),
        ('ham', 'hotdogwater', 1, 9),
        ('yam', 'scooterson', 1, 9),
        ('ram', 'smith', 2, 9),
        ('pam', 'jonsonsonson', 2, 10),
        ('jam', 'njelly', 3, 9),
        ('tam', 'bourine', 3, 10),
        ('gam', 'blingaddiction', 4, 11),
        ('tom', 'tomington', 4, 11),
        ('big', 'hoss', 5, 9
    );