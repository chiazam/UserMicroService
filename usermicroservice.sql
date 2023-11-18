-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table usermicroservice.kyc
CREATE TABLE IF NOT EXISTS `kyc` (
  `id` int NOT NULL,
  `userid` longtext NOT NULL,
  `address` longtext NOT NULL,
  `phone` longtext NOT NULL,
  `verifyNo` longtext NOT NULL,
  `verifyType` longtext NOT NULL,
  `bankName` longtext NOT NULL,
  `AccNo` longtext NOT NULL,
  `AccName` longtext NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Dumping data for table usermicroservice.kyc: ~0 rows (approximately)

-- Dumping structure for table usermicroservice.kyc_verify
CREATE TABLE IF NOT EXISTS `kyc_verify` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` longtext NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table usermicroservice.kyc_verify: ~0 rows (approximately)

-- Dumping structure for table usermicroservice.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` longtext NOT NULL,
  `email` longtext NOT NULL,
  `password` longtext NOT NULL,
  `type` longtext NOT NULL,
  `logid` longtext,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Dumping data for table usermicroservice.users: ~3 rows (approximately)
INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `type`, `logid`, `date`) VALUES
	(1, 'chiazam udekwe', 'azam@gmail.com', '$2b$10$J8LnzrSn3bJ104yY7YYx3OI1ueBcUCkhAIkB1rz/odxSouox0uedi', 'seller', 'NULL', '2023-10-08 03:57:18'),
	(2, 'elomi udex', 'chielo@gmail.com', '$2b$10$0s7PkoBzcqQqQMIiHN6mlO6IQAm.Qldu4XrnMUSFXTXBrIQFeDhkC', 'buyer', 'WYiku4DobL', '2023-10-08 06:34:51');

-- Dumping structure for table usermicroservice.verify
CREATE TABLE IF NOT EXISTS `verify` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `userid` longtext NOT NULL,
  `why` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

-- Dumping data for table usermicroservice.verify: ~1 rows (approximately)
INSERT INTO `verify` (`id`, `token`, `userid`, `why`) VALUES
	(2, 'epod9TWxI5', '2', 'user');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
