DROP DATABASE IF EXISTS typing;
CREATE DATABASE IF NOT EXISTS typing;

USE typing;

DROP TABLE IF EXISTS def_user;

CREATE TABLE def_user (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `letter` CHAR(1) NULL,
  `after` CHAR(1) NULL,
  `delay` INT NULL,
  `time` CHAR(255) NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS users;

CREATE TABLE `users` (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `name` CHAR(32) NULL,
  `email` CHAR(255) NULL,
  `password` CHAR(32) NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS settings;

CREATE TABLE settings (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `flags` INT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`user_id`) REFERENCES users(`id`)
);
