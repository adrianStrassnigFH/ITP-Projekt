-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 31, 2025 at 03:20 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Spielewelt`
--
CREATE DATABASE IF NOT EXISTS `Spielewelt` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `Spielewelt`;

-- --------------------------------------------------------

--
-- Table structure for table `Difficulty`
--

DROP TABLE IF EXISTS `Difficulty`;
CREATE TABLE `Difficulty` (
  `DifficultyID` int(11) NOT NULL,
  `Difficulty` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Difficulty`
--

INSERT INTO `Difficulty` (`DifficultyID`, `Difficulty`) VALUES
(0, 'Easy'),
(1, 'Medium'),
(2, 'Hard');

-- --------------------------------------------------------

--
-- Table structure for table `Game`
--

DROP TABLE IF EXISTS `Game`;
CREATE TABLE `Game` (
  `GameID` int(11) NOT NULL,
  `Title` text NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Game`
--

INSERT INTO `Game` (`GameID`, `Title`, `Description`) VALUES
(1, 'Flappy Bird', 'Control a Bird flying through a world surviving as long as possible.');

-- --------------------------------------------------------

--
-- Table structure for table `GameDifficulty`
--

DROP TABLE IF EXISTS `GameDifficulty`;
CREATE TABLE `GameDifficulty` (
  `GameID` int(11) NOT NULL,
  `DifficultyID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `GameDifficulty`
--

INSERT INTO `GameDifficulty` (`GameID`, `DifficultyID`) VALUES
(1, 0),
(1, 1),
(1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `Salutation`
--

DROP TABLE IF EXISTS `Salutation`;

-- --------------------------------------------------------

--
-- Table structure for table `Scoreboard`
--

DROP TABLE IF EXISTS `Scoreboard`;
CREATE TABLE `Scoreboard` (
  `UserID_FK` int(11) NOT NULL,
  `GameID_FK` int(11) NOT NULL,
  `DifficultyID_FK` int(11) NOT NULL,
  `Score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Scoreboard`
--

INSERT INTO `Scoreboard` (`UserID_FK`, `GameID_FK`, `DifficultyID_FK`, `Score`) VALUES
(1, 1, 0, 30),
(1, 1, 1, 20);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
CREATE TABLE `User` (
  `UserID` int(11) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `Email` text NOT NULL,
  `Password` text NOT NULL,
  `FirstName` text NOT NULL,
  `LastName` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`UserID`, `isAdmin`, `Email`, `Password`, `FirstName`, `LastName`) VALUES
(1, 0, 'nawlokad@gmail.com', 'dalksj', 'David', 'Nawloka');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Difficulty`
--
ALTER TABLE `Difficulty`
  ADD PRIMARY KEY (`DifficultyID`);

--
-- Indexes for table `Game`
--
ALTER TABLE `Game`
  ADD PRIMARY KEY (`GameID`);

--
-- Indexes for table `GameDifficulty`
--
ALTER TABLE `GameDifficulty`
  ADD PRIMARY KEY (`GameID`,`DifficultyID`);

--
-- Indexes for table `Scoreboard`
--
ALTER TABLE `Scoreboard`
  ADD PRIMARY KEY (`UserID_FK`,`GameID_FK`,`DifficultyID_FK`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Game`
--
ALTER TABLE `Game`
  MODIFY `GameID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `GameDifficulty`
--
ALTER TABLE `GameDifficulty`
  ADD CONSTRAINT `DifficultyID_FK_Relation` FOREIGN KEY (`DifficultyID`) REFERENCES `Difficulty` (`DifficultyID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `GameID_FK_Relation` FOREIGN KEY (`GameID`) REFERENCES `Game` (`GameID`) ON UPDATE CASCADE;

--
-- Constraints for table `Scoreboard`
--
ALTER TABLE `Scoreboard`
  ADD CONSTRAINT `Difficulty_ID_FK_Relation` FOREIGN KEY (`DifficultyID_FK`) REFERENCES `Difficulty` (`DifficultyID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Game_ID_FK_Relation` FOREIGN KEY (`GameID_FK`) REFERENCES `Game` (`GameID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `User_ID_FK_Relation` FOREIGN KEY (`UserID_FK`) REFERENCES `User` (`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `User`
--
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
