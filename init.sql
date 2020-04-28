DROP TABLE IF EXISTS `JMB_Pizza_Orders`;

CREATE TABLE IF NOT EXISTS `JMB_Pizza_Orders` (
  `order_id` int AUTO_INCREMENT,
--   `pizza_type` varchar(20) NOT NULL,
  `pizza_size` varchar(10) NOT NULL,
  `pizza_toppings` varchar(200) NOT NULL,
  `pizza_sauce` varchar(10) NOT NULL,
  `pizza_cheese` varchar(10) NOT NULL,
--   `price` float NOT NULL,
--   `first_name` varchar(15) NOT NULL,
--   `last_name` varchar(15) NOT NULL,
--   `street_address` varchar(150) NOT NULL,
--   `state` varchar(2) NOT NULL,
--   `city` varchar(30) NOT NULL,
--   `zipcode` varchar(5) NOT NULL,
--   `phone_number` varchar(10) NOT NULL,
  PRIMARY KEY (`order_id`)
);