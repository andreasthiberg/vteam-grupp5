<<<<<<< HEAD
CREATE TABLE scooter(
=======
DROP DATABASE IF EXISTS high5;

CREATE DATABASE IF NOT EXISTS high5;

USE high5;

CREATE TABLE Scooter(
>>>>>>> main
       scooter_id INT PRIMARY KEY AUTO_INCREMENT, 
       scooter_pos VARCHAR(20)
);

INSERT INTO scooter(scooter_pos) 
VALUES("21,20");

INSERT INTO scooter(scooter_pos) 
VALUES("41,50");

INSERT INTO scooter(scooter_pos) 
VALUES("12,25");

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 

flush privileges;
