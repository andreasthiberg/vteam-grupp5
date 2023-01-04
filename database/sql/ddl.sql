DROP DATABASE IF EXISTS high5;

CREATE DATABASE IF NOT EXISTS high5;

USE high5;

GRANT ALL PRIVILEGES ON *.* TO 'root' @'%' WITH GRANT OPTION;

FLUSH PRIVILEGES;



DROP TABLE IF EXISTS `trip`;
DROP TABLE IF EXISTS `scooter`;
DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `charging_station`;
DROP TABLE IF EXISTS `parking_zone`;
DROP TABLE IF EXISTS `city`;

DROP PROCEDURE IF EXISTS `get_all_scooters`;
DROP PROCEDURE IF EXISTS `get_one_scooter`;
DROP PROCEDURE IF EXISTS `add_scooter`;
DROP PROCEDURE IF EXISTS `update_scooter`;
DROP PROCEDURE IF EXISTS `report_scooter`;

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

DROP PROCEDURE IF EXISTS `get_trips_details`;
DROP PROCEDURE IF EXISTS `get_trips_price_details`;
DROP PROCEDURE IF EXISTS `get_extra_price_details`;
DROP PROCEDURE IF EXISTS `calc_duration`;



CREATE TABLE `customer`
    (
    `id` INT AUTO_INCREMENT,
    `first_name` CHAR(20),
    `last_name` CHAR(30),
    `email` CHAR(50),
    `password` CHAR(100),
    `balance` FLOAT,
    
    PRIMARY KEY (`id`)
    );

CREATE TABLE `city`
    (
    -- `id` INT AUTO_INCREMENT,
    `name` CHAR(20),
    `fee` FLOAT,
    `fee_per_min` FLOAT,
    `penalty_fee` FLOAT DEFAULT 50,
    `discount` FLOAT DEFAULT 50,

    PRIMARY KEY (`name`)
    );

CREATE TABLE `scooter`
    (
    `id` INT AUTO_INCREMENT,
    `status` INT(3),
    `pos` CHAR(50),
    `battery` INT(3),
    `city` CHAR(20),

    PRIMARY KEY (`id`),
    FOREIGN KEY(`city`) REFERENCES `city` (`name`)
    );

CREATE TABLE `parking_zone`
    (
    `id` INT AUTO_INCREMENT,
    `pos` CHAR(100),
    `city` CHAR(20),

    PRIMARY KEY (`id`),
    FOREIGN KEY(`city`) REFERENCES `city` (`name`)
    );

CREATE TABLE `charging_station`
    (
    `id` INT AUTO_INCREMENT,
    `pos` CHAR(50),
    `status` TINYINT,
    `city` CHAR(20),
    `parking_zone` INT,

    PRIMARY KEY (`id`),
    FOREIGN KEY(`city`) REFERENCES `city` (`name`),
    FOREIGN KEY(`parking_zone`) REFERENCES `parking_zone` (`id`)
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
    `penalty_fee` FLOAT DEFAULT NULL,
    `discount` FLOAT DEFAULT NULL,
    `price` FLOAT DEFAULT NULL,
    `city` CHAR(20),

    PRIMARY KEY(`id`),
    FOREIGN KEY(`scooter_id`) REFERENCES `scooter` (`id`),
    FOREIGN KEY(`customer_id`) REFERENCES `customer` (`id`),
    FOREIGN KEY(`city`) REFERENCES `city` (`name`)
    );

-- ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';


INSERT INTO customer (`first_name`, `last_name`, `email`, `password`, `balance`) VALUES ("fname1","lname1", "name1@mail.se", "password1", 200);
INSERT INTO customer (`first_name`, `last_name`, `email`, `password`, `balance`) VALUES ("fname2","lname2", "name2@mail.se", "password2", 50);

INSERT INTO city (`name`, `fee`, `fee_per_min`, `penalty_fee`, `discount`) VALUES ("Stockholm", 20, 5, 30, 40);
INSERT INTO city (`name`, `fee`, `fee_per_min`, `penalty_fee`, `discount`) VALUES ("Malmö", 20, 5, 30, 40);

INSERT INTO scooter (`status`, `pos`, `battery`, `city`) VALUES (1, "0,0", 100, "Stockholm");
INSERT INTO scooter (`status`, `pos`, `battery`, `city`) VALUES (1, "20,20", 200, "Stockholm");

INSERT INTO parking_zone ( `pos`, `city` ) VALUES ('59.402724,17.939324', 'Stockholm');
INSERT INTO parking_zone ( `pos`, `city` ) VALUES ('59.274756,18.049059', 'Stockholm');

INSERT INTO charging_station (`pos`, `status`, `city`, `parking_zone`) VALUES ("15, 10", 0, "Stockholm", 1);
INSERT INTO charging_station (`pos`, `status`, `city`, `parking_zone`) VALUES ("10, 20", 0, "Stockholm", 2);

INSERT INTO trip (`scooter_id`, `customer_id`, `start_time`, `end_time`, `start_pos`, `end_pos`, `penalty_fee`, `discount`, `price`, `city`) VALUES (1, 2, '2022-12-12 00:23:04.717', '2022-12-12 00:43:04.717', "0,0", "10,10", 0, 50, 100, "Stockholm");
INSERT INTO trip (`scooter_id`, `customer_id`, `start_time`, `end_time`, `start_pos`, `end_pos`, `penalty_fee`, `discount`, `price`, `city`) VALUES (2, 1, '2022-12-12 00:33:04.717', '2022-12-12 00:53:04.717', "10,10", "15,15", 50, 0, 150, "Stockholm");



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
    `a_status` INT(3),
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
    `a_status` INT(3),
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


-- Procedure to recieve update from scooter brain
DELIMITER ;;
CREATE PROCEDURE report_scooter(
    `a_id` INT,
    `a_pos` CHAR(50),
    `a_battery` INT(3)
    )
BEGIN
    UPDATE scooter
    SET
		`pos` = `a_pos`,
		`battery` = `a_battery`
	WHERE `id` = `a_id`
    ;
    SELECT `status` FROM scooter
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
    `a_password` CHAR(100),
    `a_balance` FLOAT
)
BEGIN
    INSERT INTO customer (`first_name`, `last_name`, `email`, `password`, `balance`) 
    VALUES (`a_first_name`, `a_last_name`, `a_email`, `a_password`, `a_balance`);
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
    `a_password` CHAR(100),
    `a_balance` FLOAT
    )
BEGIN
    UPDATE customer
    SET
        `first_name` = `a_first_name`,
        `last_name` = `a_last_name`,
        `email` = `a_email`,
        `password`= `a_password`,
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
    `a_pos` CHAR(50),
    `a_city` CHAR(20)
)
BEGIN
    INSERT INTO parking_zone (`pos`, `city`) 
    VALUES (`a_pos`, `a_city`);
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
    `a_pos` CHAR(50),
    `a_status` TINYINT,
    `a_city` CHAR(20)
)
BEGIN
    INSERT INTO charging_station (`pos`, `status`, `city`) 
    VALUES (`a_pos`, `a_status`, `a_city`);
END
;;
DELIMITER ;


-- Procedure to show all cities
DELIMITER ;;
CREATE PROCEDURE get_all_cities()
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
    `a_fee_per_min` FLOAT,
    `a_penalty_fee` FLOAT,
    `a_discount` FLOAT
)
BEGIN
    INSERT INTO city (`name`, `fee`, `fee_per_min`, `penalty_fee`, `discount`) 
    VALUES (`a_name`, `a_fee`, `a_fee_per_min`, `a_penalty_fee`, `a_discount`);
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
    `a_start_pos` CHAR(50),
    `a_city` CHAR(20)
)
BEGIN
    INSERT INTO trip (`scooter_id`, `customer_id`, `start_time`, `start_pos`, `city`) 
    VALUES (`a_scooter_id`, `a_customer_id`, CURRENT_TIMESTAMP, `a_start_pos`, `a_city`);
END
;;
DELIMITER ;


-- Procedure to update one trip
DELIMITER ;;
CREATE PROCEDURE update_trip(
    `a_id` INT,
    `a_end_pos` CHAR(50),
    `a_price` FLOAT,
    `a_penalty_fee` FLOAT,
    `a_discount` FLOAT
    )
BEGIN
    UPDATE trip
    SET
        `end_time` = CURRENT_TIMESTAMP,
        `end_pos` = `a_end_pos`,
        `price` = `a_price`,
        `penalty_fee` = `a_penalty_fee`,
        `discount` = `a_discount`
    WHERE `id` = `a_id`
    ;
END
;;
DELIMITER ;


-- Function to calculate trips duration
DROP FUNCTION IF EXISTS calc_duration;
DELIMITER ;;
CREATE FUNCTION calc_duration(
    `a_trips_id` INT
    )
RETURNS INT
DETERMINISTIC
BEGIN
    RETURN TIMESTAMPDIFF(MINUTE, (SELECT `start_time` FROM `trip` WHERE `id` = `a_trips_id`), (SELECT `end_time` FROM `trip` WHERE `id` = `a_trips_id`));
END
;;
DELIMITER ;


-- Function to calculate trips price
DROP FUNCTION IF EXISTS calc_price;
DELIMITER ;;
CREATE FUNCTION calc_price(
    `a_trips_id` INT
    )
RETURNS FLOAT
DETERMINISTIC
BEGIN
    RETURN (SELECT `fee` FROM `city` WHERE `name` = (SELECT `city` FROM `trip` WHERE `id` = `a_trips_id`)) 
    +
    ( (SELECT `fee_per_min` FROM `city` WHERE `name` = (SELECT `city` FROM `trip` WHERE `id` = `a_trips_id`)) * calc_duration(`a_trips_id`) )
    +
    (SELECT `penalty_fee` FROM `trip` WHERE `id` = `a_trips_id`)
    -
    (SELECT `discount` FROM `trip` WHERE `id` = `a_trips_id`)
    ;
END
;;
DELIMITER ;



-- Procedure to show one trips details
DELIMITER ;;
CREATE PROCEDURE get_trips_details(
    `a_trips_id` INT
)
BEGIN
    SELECT `start_pos`, `end_pos`, calc_duration(`a_trips_id`), `price` FROM `trip` WHERE `id` = `a_trips_id`;
END
;;
DELIMITER ;


-- Procedure to show one trips price details
DELIMITER ;;
CREATE PROCEDURE get_trips_price_details(
    `a_trips_id` INT
)
BEGIN
    SELECT `fee`, `fee_per_min` FROM `city` WHERE `name` = (SELECT `city` FROM `trip` WHERE `id` = `a_trips_id`);
END
;;
DELIMITER ;


-- Procedure to show one trips price details
DELIMITER ;;
CREATE PROCEDURE get_extra_price_details(
    `a_trips_id` INT
)
BEGIN
    SELECT `penalty_fee`, `discount` FROM `trip` WHERE `id` = `a_trips_id`;
END
;;
DELIMITER ;



-- delete scooter
-- delete customer
-- get scooters by position
-- triggers 