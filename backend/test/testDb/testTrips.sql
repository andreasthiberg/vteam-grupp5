USE test;

INSERT INTO trip (`scooter_id`, `customer_id`, `start_time`, `end_time`, `start_pos`, `end_pos`, `penalty_fee`, `discount`, `price`, `city`) VALUES (1, 2, '2022-12-12 00:23:04', '2022-12-12 00:43:04', "[0,0]", "[10,10]", 0, 50, 100, "Stockholm"),
(1, 1, '2022-12-12 00:33:04', '2022-12-12 00:53:04', "[10,10]", "[15,15]", 0, 50, 150, "Stockholm"),
(2, 1, '2022-12-12 12:30:00', '2022-12-12 12:35:04', "[12,11]", "[10,18]", 50, 0, 250, "Stockholm"),
(3, 1, '2022-12-12 00:33:04', '2022-12-12 00:53:04', "[10,10]", "[15,15]", 0, 0, 200, "Stockholm"),
(4, 2, '2022-12-12 00:33:04', '2022-12-12 00:53:04', "[10,10]", "[15,15]", 50, 0, 150, "Stockholm"),
(5, 3, '2022-12-12 00:33:04', '2022-12-12 00:53:04', "[10,10]", "[15,15]", 50, 0, 150, "Stockholm"),
(6, 4, '2022-12-12 00:33:04', '2022-12-12 00:53:04', "[10,10]", "[15,15]", 50, 0, 150, "Stockholm");