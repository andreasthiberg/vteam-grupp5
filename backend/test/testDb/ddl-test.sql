DROP DATABASE IF EXISTS test;

CREATE DATABASE IF NOT EXISTS test;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

flush privileges;

USE test;

DROP TABLE IF EXISTS `trip`;
DROP TABLE IF EXISTS `scooter`;
DROP TABLE IF EXISTS `customer`;
DROP TABLE IF EXISTS `charging_station`;
DROP TABLE IF EXISTS `parking_zone`;
DROP TABLE IF EXISTS `city`;
DROP TABLE IF EXISTS `api_log`;

DROP PROCEDURE IF EXISTS `get_all_scooters`;
DROP PROCEDURE IF EXISTS `get_one_scooter`;
DROP PROCEDURE IF EXISTS `add_scooter`;
DROP PROCEDURE IF EXISTS `update_scooter`;
DROP PROCEDURE IF EXISTS `report_scooter`;
DROP PROCEDURE IF EXISTS `add_zone_to_scooter`;
DROP PROCEDURE IF EXISTS `add_station_to_scooter`;

DROP PROCEDURE IF EXISTS `get_all_customers`;
DROP PROCEDURE IF EXISTS `get_one_customer`;
DROP PROCEDURE IF EXISTS `add_customer`;
DROP PROCEDURE IF EXISTS `update_customer`;
DROP PROCEDURE IF EXISTS `change_customer_status`;

DROP PROCEDURE IF EXISTS `get_all_parking_zones`;
DROP PROCEDURE IF EXISTS `get_one_parking_zone`;
DROP PROCEDURE IF EXISTS `add_parking_zone`;

DROP PROCEDURE IF EXISTS `get_all_charging_stations`;
DROP PROCEDURE IF EXISTS `get_one_charging_station`;
DROP PROCEDURE IF EXISTS `add_charging_station`;

DROP PROCEDURE IF EXISTS `get_all_cities`;
DROP PROCEDURE IF EXISTS `get_one_city`;
DROP PROCEDURE IF EXISTS `add_city`;

DROP PROCEDURE IF EXISTS `get_all_trips`;
DROP PROCEDURE IF EXISTS `get_one_trip`;
DROP PROCEDURE IF EXISTS `add_trip`;
DROP PROCEDURE IF EXISTS `update_trip`;
DROP PROCEDURE IF EXISTS `update_trips_price`;

DROP PROCEDURE IF EXISTS `get_trips_details`;
DROP PROCEDURE IF EXISTS `get_trips_price_details`;
DROP PROCEDURE IF EXISTS `get_extra_price_details`;
DROP PROCEDURE IF EXISTS `calc_duration`;

DROP PROCEDURE IF EXISTS `add_api_log_entry`;




CREATE TABLE `customer`
    (
    `id` INT AUTO_INCREMENT,
    `first_name` CHAR(20),
    `last_name` CHAR(30),
    `email` CHAR(50),
    `password` CHAR(100),
    `balance` FLOAT,
    `status` INT(1) DEFAULT 1,
    
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
    `station` INT(3) DEFAULT 0,
    `zone` INT(3) DEFAULT 0,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`city`) REFERENCES `city` (`name`)
    );

CREATE TABLE `parking_zone`
    (
    `id` INT AUTO_INCREMENT,
    `pos` CHAR(200),
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


CREATE TABLE `api_log`
    (
    `id` INT AUTO_INCREMENT,
    `ip` CHAR(20),
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

-- ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';

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
    `a_battery` INT(3),
    `a_city` CHAR(20)
)
BEGIN
    INSERT INTO scooter (`status`, `pos`, `battery`,`city`) 
    VALUES (`a_status`, `a_pos`, `a_battery`,`a_city`);
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
    SELECT `status`, `station` FROM scooter
    WHERE `id` = `a_id` 
    ;
END
;;
DELIMITER ;

-- Procedure to add station Id to scooter
DELIMITER ;;
CREATE PROCEDURE add_station_to_scooter(
    `scooter_id` INT,
    `station_id` CHAR(50)
    )
BEGIN
    UPDATE scooter
    SET
		`station` = `station_id`
	WHERE `id` = `scooter_id`
    ;
    SELECT `pos` FROM charging_station
    WHERE `id` = `station_id` 
    ;
END
;;
DELIMITER ;

-- Procedure to add zone Id to scooter
DELIMITER ;;
CREATE PROCEDURE add_zone_to_scooter(
    `scooter_id` INT,
    `zone_id` CHAR(50)
    )
BEGIN
    UPDATE scooter
    SET
		`zone` = `zone_id`
	WHERE `id` = `scooter_id`
    ;
    SELECT `pos` FROM parking_zone
    WHERE `id` = `zone_id` 
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


-- Procedure to disable one customer
DELIMITER ;;
CREATE PROCEDURE change_customer_status(
    `a_id` INT,
    `a_status` INT
    )
BEGIN
    UPDATE customer
    SET
        `status` = `a_status`
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
    `a_name` CHAR(20)
)
BEGIN
    SELECT * FROM city
    WHERE `name` = `a_name`;
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
    `a_penalty_fee` FLOAT,
    `a_discount` FLOAT
    )
BEGIN
    UPDATE trip
    SET
        `end_time` = CURRENT_TIMESTAMP,
        `end_pos` = `a_end_pos`,
        `penalty_fee` = `a_penalty_fee`,
        `discount` = `a_discount`
    WHERE `id` = `a_id`
    ;
END
;;
DELIMITER ;


-- Procedure to update one trips price
DELIMITER ;;
CREATE PROCEDURE update_trips_price(
    `a_id` INT,
    `a_price` FLOAT
    )
BEGIN
    UPDATE trip
    SET
        `price` = `a_price`
    WHERE `id` = `a_id`
    ;
END
;;
DELIMITER ;


-- -- Procedure to calculate trips duration
-- CREATE PROCEDURE calc_duration(
--     a_trip_id INT
--     )
-- BEGIN
--    SELECT TIMESTAMPDIFF(MINUTE, start_time, end_time) AS duration
--    FROM trip
--    WHERE id = a_trip_id;
-- END


-- -- Function to calculate trips price
-- DROP FUNCTION IF EXISTS calc_price;
-- DELIMITER ;;
-- CREATE FUNCTION calc_price(
--     `a_trips_id` INT
--     )
-- RETURNS FLOAT
-- DETERMINISTIC
-- BEGIN
--    DECLARE `fee` FLOAT;
--    DECLARE `fee_per_min` FLOAT;
--    DECLARE `penalty_fee` FLOAT;
--    DECLARE `discount` FLOAT;
--    DECLARE `duration` INT;

--    SELECT `t.penalty_fee`, `t.discount`, `c.fee`, `c.fee_per_minute`
--    FROM `trip` AS t
--    INNER JOIN `city` AS c 
--    ON `t.city` = `c.name`
--    WHERE `t.id` = `a_trips_id`;

--    CALL calc_duration(`a_trips_id`, `duration`)

--    RETURN `fee` + `fee_per_minute` * `duration` + `penalty_fee` - `discount`;
-- END



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

-- Procedure to add a log entry for the public API
DELIMITER ;;
CREATE PROCEDURE add_api_log_entry(
    `a_ip` CHAR(20)
)
BEGIN
    INSERT INTO api_log (`ip`) 
    VALUES (`a_ip`);
END
;;
DELIMITER ;

source testCities.sql;
source testCustomers.sql;
source testScooters.sql;
source testStations.sql;
source testTrips.sql;
source testZones.sql;