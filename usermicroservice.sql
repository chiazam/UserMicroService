-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table usermicroservice.kyc
CREATE TABLE IF NOT EXISTS `kyc` (
  `id` int(11) NOT NULL,
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
/*!40000 ALTER TABLE `kyc` DISABLE KEYS */;
/*!40000 ALTER TABLE `kyc` ENABLE KEYS */;

-- Dumping structure for table usermicroservice.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fullname` longtext NOT NULL,
  `email` longtext NOT NULL,
  `password` longtext NOT NULL,
  `type` longtext NOT NULL,
  `logid` longtext NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table usermicroservice.users: ~1 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `type`, `logid`, `date`) VALUES
	(1, 'Azam Udekwe', 'azam@gmail.com', '$2y$10$BbpSpivuL.KDbRMtLozdwuzYk1jn3x6f32uLmNFQHh/5zmFlTvr0u', 'seller', '', '2023-09-27 01:39:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table usermicroservice.verify
CREATE TABLE IF NOT EXISTS `verify` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` longtext NOT NULL,
  `userid` longtext NOT NULL,
  `why` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

-- Dumping data for table usermicroservice.verify: ~1 rows (approximately)
/*!40000 ALTER TABLE `verify` DISABLE KEYS */;
INSERT INTO `verify` (`id`, `token`, `userid`, `why`) VALUES
	(1, 'd2ljpd8hl', '1', 'user');
/*!40000 ALTER TABLE `verify` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
