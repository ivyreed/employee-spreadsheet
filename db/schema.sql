DROP DATABASE IF EXISTS work_db;

CREATE DATABASE work_db;

USE work_db;

CREATE table department(
    id int not null auto_increment,
    name varchar(30),
    primary key(id)
);
CREATE table role(
    id int not null auto_increment,
    title varchar(30),
    salary decimal,
    department_id int not null,
    primary key (id),
    foreign key (department_id) references department(id)
);
CREATE table employee(
    id int not null auto_increment,
    first_name varchar(30),
    last_name varchar(30),
    role_id int,    
    manager_id int,
    primary key(id),
    foreign key(role_id) references role(id)
);