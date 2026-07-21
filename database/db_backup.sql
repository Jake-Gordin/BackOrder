/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.15-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: inventory
-- ------------------------------------------------------
-- Server version	10.11.15-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `inventory`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `inventory` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;

USE `inventory`;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `Item_Name` varchar(255) DEFAULT 'No Name',
  `Description` varchar(255) DEFAULT 'No Description',
  `Quantity` int(11) DEFAULT 0,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES
(1402,17290,'BD ROYAL OBLITERATOR','A delicate instrument for the discerning metalhead.',78),
(2000,41236,'Gibby Grubgrabbler','An experimental guitar made of reclaimed coffee grounds. Sounds terrible, smells awful.',9),
(4546,37078,'Red Straver','With a history going back over 75 years, the Straver series of premium guitars brings a sense of decorum, heraldry, and tradition that can turn any bedroom wall into an art gallery.',45),
(21811,37078,'Straver XTREME','This guitar is razor sharp! It\'s deadly edges make it nearly unplayable!',679),
(26594,17290,'BD Royal DECIMATOR','IT DECIMATES',6),
(30392,41236,'Gibby Dustsweeper','An old favorite for Blues and Jazz enthusiasts alike! Classic styling evokes the gilded age on an instrument that would be at home on any stage.',90),
(33691,37078,'Straver Lite','It\'s only got a few frets - great for starters.',44),
(33985,37078,'Straver Vintage','Wow, that\'s expensive! With prices like this, it\'s no wonder that these are continuously being bought and resold.',2),
(35639,41236,'Gibby Streetlander','Classic lines and beautiful sounds make this a perennial hit.',563);
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `First_Name` varchar(255) DEFAULT NULL,
  `Last_Name` varchar(255) DEFAULT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Username` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(4430,'test','test','test','$2b$12$.TCHajitY5eZYb3NJp4FqeJxT4XkFVxUF7CjkPNkh6wNU.emk37rC'),
(17290,'Gorloch','The Mighty','Gorloch','$2b$12$cGRvIEoBRGLRftBfIJSbUO2jS3SJ4V.UkVN79i1w6gFHvpVRhBGi2'),
(19236,'Trunt','Cowbell','bootscootin','$2b$12$KRoNxikk.q2v.nSiwgLzme7g6rZlPdDb9eB805pcMyhuWt1eeifae'),
(37078,'Chuck','Strummer','CStrummer','$2b$12$lxpoBD92IoFmicHO40Em3O8/PClHarDrdhzkEbWG5MUg/cZ3Gc/7y'),
(41236,'Marcus','Aurelius','Marcus','$2b$12$B2Penxa8KyBwnyMmo6XZKepD3kTo.zdfU4ozK1EV8YJPnR7jUNuha');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-21 23:39:44
