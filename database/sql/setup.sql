DROP DATABASE IF EXISTS high5;

CREATE DATABASE IF NOT EXISTS high5;

USE high5;

-- USE test;

GRANT ALL PRIVILEGES ON *.* TO 'root' @'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;



DROP TABLE IF EXISTS `trip`;
DROP TABLE IF EXISTS `scooter`;
DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `parking_zone`;
DROP TABLE IF EXISTS `charging_station`;
DROP TABLE IF EXISTS `city`;

DROP PROCEDURE IF EXISTS `get_all_scooters`;
DROP PROCEDURE IF EXISTS `get_one_scooter`;
DROP PROCEDURE IF EXISTS `add_scooter`;
DROP PROCEDURE IF EXISTS `update_scooter`;

DROP PROCEDURE IF EXISTS `get_all_customers`;
DROP PROCEDURE IF EXISTS `get_one_customer`;
DROP PROCEDURE IF EXISTS `add_customer`;
DROP PROCEDURE IF EXISTS `update_customer`;

DROP PROCEDURE IF EXISTS `get_all_parking_zones`;
DROP PROCEDURE IF EXISTS `get_one_parking_zone`;
DROP PROCEDURE IF EXISTS `add_parking_zone`;

DROP PROCEDURE IF EXISTS `get_all_charging_stations`;
DROP PROCEDURE IF EXISTS `get_one_charging_station`;
DROP PROCEDURE IF EXISTS `add_charging_station`;

DROP PROCEDURE IF EXISTS `get_all_citis`;
DROP PROCEDURE IF EXISTS `get_one_city`;
DROP PROCEDURE IF EXISTS `add_city`;

DROP PROCEDURE IF EXISTS `get_all_trips`;
DROP PROCEDURE IF EXISTS `get_one_trip`;
DROP PROCEDURE IF EXISTS `add_trip`;
DROP PROCEDURE IF EXISTS `update_trip`;


CREATE TABLE `scooter`
    (
    `id` INT AUTO_INCREMENT,
    `status` CHAR(20),
    `pos` CHAR(50),
    `battery` INT(3),

    PRIMARY KEY (`id`)
    );

CREATE TABLE `customer`
	(
    `id` INT AUTO_INCREMENT,
    `first_name` CHAR(20),
    `last_name` CHAR(30),
    `email` CHAR(50),
    `balance` FLOAT,
    
    PRIMARY KEY (`id`)
    );

CREATE TABLE `parking_zone`
    (
    `id` INT AUTO_INCREMENT,
    `pos` CHAR(50),

    PRIMARY KEY (`id`)
    );

CREATE TABLE `charging_station`
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
    `end_time` TIMESTAMP DEFAULT NULL,
    `start_pos` CHAR(50),
    `end_pos` CHAR(50) DEFAULT NULL,
    `price` FLOAT DEFAULT NULL,

    PRIMARY KEY(`id`),
    FOREIGN KEY(`scooter_id`) REFERENCES `scooter` (`id`),
    FOREIGN KEY(`customer_id`) REFERENCES `customer` (`id`)
    );

-- ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password'; 

INSERT INTO scooter (`status`, `pos`, `battery`) VALUES ("old", "0,0", 100);
INSERT INTO scooter (`status`, `pos`, `battery`) VALUES ("new", "10,0", 200);

INSERT INTO customer (`first_name`, `last_name`, `email`, `balance`) VALUES ("fname1","lname1", "name1@mail.se", 200);
INSERT INTO customer (`first_name`, `last_name`, `email`, `balance`) VALUES ("fname2","lname2", "name2@mail.se", 50);

INSERT INTO parking_zone (`pos`) VALUES ("10, 10");
INSERT INTO parking_zone (`pos`) VALUES ("10, 15");

INSERT INTO charging_station (`pos`) VALUES ("15, 10");
INSERT INTO charging_station (`pos`) VALUES ("15, 15");

INSERT INTO city (`name`, `fee`, `penalty_fee`, `discount`) VALUES ("Stockholm", 20, 30, 40);
INSERT INTO city (`name`, `fee`, `penalty_fee`, `discount`) VALUES ("Anderslöv", 20, 30, 40);

INSERT INTO trip (`scooter_id`, `customer_id`, `start_time`, `end_time`, `start_pos`, `end_pos`, `price`) VALUES (1, 2, '2022-12-12 00:23:04.717', '2022-12-12 00:43:04.717', "0,0", "10,10", "100");
INSERT INTO trip (`scooter_id`, `customer_id`, `start_time`, `end_time`, `start_pos`, `end_pos`, `price`) VALUES (2, 1, '2022-12-12 00:33:04.717', '2022-12-12 00:53:04.717', "10,10", "15,15", "150");




-- Procedure to show all scooters
DELIMITER ;;
CREATE PROCEDURE get_all_scooters()
BEGIN
    SELECT * FROM scooter;
END
;;
DELIMITER ;


-- Procedure to show one scooter
DELIMITER ;;
CREATE PROCEDURE get_one_scooter(
    `a_id` INT
)
BEGIN
    SELECT * FROM scooter
    WHERE `id` = `a_id`;
END
;;
DELIMITER ;


-- Procedure to add a scooters
DELIMITER ;;
CREATE PROCEDURE add_scooter(
    `a_status` CHAR(20),
    `a_pos` CHAR(50),
    `a_battery` INT(3)
)
BEGIN
    INSERT INTO scooter (`status`, `pos`, `battery`) 
    VALUES (`a_status`, `a_pos`, `a_battery`);
END
;;
DELIMITER ;


-- Procedure to update one scooter
DELIMITER ;;
CREATE PROCEDURE update_scooter(
    `a_id` INT,
    `a_status` CHAR(20),
    `a_pos` CHAR(50),
    `a_battery` INT(3)
    )
BEGIN
    UPDATE scooter
    SET
		`status` = `a_status`,
		`pos` = `a_pos`,
		`battery` = `a_battery`
	WHERE `id` = `a_id`
    ;
END
;;
DELIMITER ;


-- Procedure to show all customers
DELIMITER ;;
CREATE PROCEDURE get_all_customers()
BEGIN
    SELECT * FROM customer;
END
;;
DELIMITER ;


-- Procedure to show one customer
DELIMITER ;;
CREATE PROCEDURE get_one_customer(
    `a_id` INT
)
BEGIN
    SELECT * FROM customer
    WHERE `id` = `a_id`;
END
;;
DELIMITER ;


-- Procedure to add a customer
DELIMITER ;;
CREATE PROCEDURE add_customer(
    `a_first_name` CHAR(20),
    `a_last_name` CHAR(30),
    `a_email` CHAR(50),
    `a_balance` FLOAT
)
BEGIN
    INSERT INTO customer (`first_name`, `last_name`, `email`, `balance`) 
    VALUES (`a_first_name`, `a_last_name`, `a_email`, `a_balance`);
END
;;
DELIMITER ;


-- Procedure to update one customer
DELIMITER ;;
CREATE PROCEDURE update_customer(
    `a_id` INT,
    `a_first_name` CHAR(20),
    `a_last_name` CHAR(30),
    `a_email` CHAR(50),
    `a_balance` FLOAT
    )
BEGIN
    UPDATE customer
    SET
		`first_name` = `a_first_name`,
        `last_name` = `a_last_name`,
        `email` = `a_email`,
        `balance` = `a_balance`
	WHERE `id` = `a_id`
    ;
END
;;
DELIMITER ;


-- Procedure to show all parking zones
DELIMITER ;;
CREATE PROCEDURE get_all_parking_zones()
BEGIN
    SELECT * FROM parking_zone;
END
;;
DELIMITER ;


-- Procedure to show one parking zone
DELIMITER ;;
CREATE PROCEDURE get_one_parking_zone(
    `a_id` INT
)
BEGIN
    SELECT * FROM parking_zone
    WHERE `id` = `a_id`;
END
;;
DELIMITER ;


-- Procedure to add a parking zone
DELIMITER ;;
CREATE PROCEDURE add_parking_zone(
    `a_pos` CHAR(50)
)
BEGIN
    INSERT INTO parking_zone (`pos`) 
    VALUES (`a_pos`);
END
;;
DELIMITER ;


-- Procedure to show all charging stations
DELIMITER ;;
CREATE PROCEDURE get_all_charging_stations()
BEGIN
    SELECT * FROM charging_station;
END
;;
DELIMITER ;


-- Procedure to show one charging station
DELIMITER ;;
CREATE PROCEDURE get_one_charging_station(
    `a_id` INT
)
BEGIN
    SELECT * FROM charging_station
    WHERE `id` = `a_id`;
END
;;
DELIMITER ;


-- Procedure to add a charging station
DELIMITER ;;
CREATE PROCEDURE add_charging_station(
    `a_pos` CHAR(50)
)
BEGIN
    INSERT INTO charging_station (`pos`) 
    VALUES (`a_pos`);
END
;;
DELIMITER ;


-- Procedure to show all citis
DELIMITER ;;
CREATE PROCEDURE get_all_citis()
BEGIN
    SELECT * FROM city;
END
;;
DELIMITER ;


-- Procedure to show one city
DELIMITER ;;
CREATE PROCEDURE get_one_city(
    `a_id` INT
)
BEGIN
    SELECT * FROM city
    WHERE `id` = `a_id`;
END
;;
DELIMITER ;


-- Procedure to add a city
DELIMITER ;;
CREATE PROCEDURE add_city(
    `a_name` CHAR(20),
    `a_fee` FLOAT,
    `a_penalty_fee` FLOAT,
    `a_discount` FLOAT
)
BEGIN
    INSERT INTO city (`name`, `fee`, `penalty_fee`, `discount`) 
    VALUES (`a_name`, `a_fee`, `a_penalty_fee`, `a_discount`);
END
;;
DELIMITER ;


-- Procedure to show all trips
DELIMITER ;;
CREATE PROCEDURE get_all_trips()
BEGIN
    SELECT * FROM trip;
END
;;
DELIMITER ;


-- Procedure to show one trip
DELIMITER ;;
CREATE PROCEDURE get_one_trip(
    `a_id` INT
)
BEGIN
    SELECT * FROM trip
    WHERE `id` = `a_id`;
END
;;
DELIMITER ;


-- Procedure to add a trip
DELIMITER ;;
CREATE PROCEDURE add_trip(
    `a_scooter_id` INT,
    `a_customer_id` INT,
    `a_start_pos` CHAR(50)
)
BEGIN
    INSERT INTO trip (`scooter_id`, `customer_id`, `start_time`, `start_pos`) 
    VALUES (`a_scooter_id`, `a_customer_id`, CURRENT_TIMESTAMP, `a_start_pos`);
END
;;
DELIMITER ;


-- Procedure to update one trip
DELIMITER ;;
CREATE PROCEDURE update_trip(
    `a_id` INT,
    `a_end_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `a_end_pos` CHAR(50),
    `a_price` FLOAT,
    )
BEGIN
    UPDATE trip
    SET
        `end_time` = CURRENT_TIMESTAMP,
        `end_pos` = `a_end_pos`,
        `price` = `a_price`
	WHERE `id` = `a_id`
    ;
END
;;
DELIMITER ;


-- Function to calculate trips price
-- DROP FUNCTION IF EXISTS calc_price;
-- DELIMITER ;;
-- CREATE FUNCTION calc_price(
--     `a_trips_id` INT
--     )
-- RETURNS FLOAT
-- DETERMINISTIC
-- BEGIN
	
-- END
-- ;;
-- DELIMITER ;


-- delete scooter
-- delete customer
-- get scooters by position
-- triggers 
