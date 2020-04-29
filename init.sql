DROP TABLE IF EXISTS `JMB_Pizza_Orders`;

CREATE TABLE IF NOT EXISTS `JMB_Pizza_Orders` (
  `order_id` int AUTO_INCREMENT,
  `pizza_size` varchar(10) NOT NULL,
  `pizza_toppings` varchar(200) NOT NULL,
  `pizza_sauce` varchar(10) NOT NULL,
  `pizza_cheese` varchar(10) NOT NULL,
  `order_created_time` datetime,
  `order_ready_time` datetime,
  `order_delivered_time` datetime,
  PRIMARY KEY (`order_id`)
);