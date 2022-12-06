-- DROP DATABASE IF EXISTS high5;

-- CREATE DATABASE IF NOT EXISTS high5;

-- USE high5;



DROP TABLE IF EXISTS `scooter`;
DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `parking_zone`;
DROP TABLE IF EXISTS `charging_zone`;
DROP TABLE IF EXISTS `city`;
DROP TABLE IF EXISTS `trip`;

DROP PROCEDURE IF EXISTS `get_all_scooters`;



CREATE TABLE `scooter`
    (
    `id` INT AUTO_INCREMENT,
    `status` CHAR(20),
    `pos` CHAR(50),
    `battery` INT(3),

    PRIMARY KEY (`id`),
    );

CREATE TABLE `customer`
	(
    `id` INT AUTO_INCREMENT,
    `first_name` CHAR(20),
    `last_name` CHAR(30),
    `e-mail` CHAR(50),
    `balance` FLOAT,
    
    PRIMARY KEY (`id`)
    );

CREATE TABLE `parking_zone`
    (
    `id` INT AUTO_INCREMENT,
    `pos` CHAR(50),

    PRIMARY KEY (`id`)
    );

CREATE TABLE `charging_zone`
    (
    `id` INT AUTO_INCREMENT,
    `pos` CHAR(50),

    PRIMARY KEY (`id`)
    );

CREATE TABLE `city`
    (
    `id` INT AUTO_INCREMENT,
    `name` CHAR(20),
    `fee` FLOAT,
    `penalty_fee` FLOAT,
    `discount` FLOAT,

    PRIMARY KEY (`id`)
    );

CREATE TABLE `trip`
    (
    `id` INT AUTO_INCREMENT,
    `scooter_id` INT,
    `customer_id` INT,
    `start_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `end_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `start_pos` CHAR(50),
    `end_pos` CHAR(50),
    `price` FLOAT,

    PRIMARY KEY(`id`)
    FOREIGN KEY(`scooter_id`) REFERENCES `scooter` (`id`),
    FOREIGN KEY(`customer_id`) REFERENCES `customer` (`id`),
    );

-- ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 



-- Procedure to show all scooters
DELIMITER ;;
CREATE PROCEDURE get_all()
BEGIN
    SELECT * FROM scooter;
END
;;
DELIMITER ;