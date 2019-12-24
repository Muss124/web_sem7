-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Дек 24 2019 г., 20:26
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `lab4`
--

-- --------------------------------------------------------

--
-- Структура таблицы `favorite`
--

CREATE TABLE IF NOT EXISTS `favorite` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `CityName` text NOT NULL,
  `Temperature` float NOT NULL,
  `Weather` text NOT NULL,
  `Humidity` float NOT NULL,
  `Pressure` float NOT NULL,
  `Wind` float NOT NULL,
  `Longitude` float NOT NULL,
  `Latitude` float NOT NULL,
  `Icon` text NOT NULL,
  `Cod` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=41 ;

--
-- Дамп данных таблицы `favorite`
--

INSERT INTO `favorite` (`id`, `CityName`, `Temperature`, `Weather`, `Humidity`, `Pressure`, `Wind`, `Longitude`, `Latitude`, `Icon`, `Cod`) VALUES
(3, 'Kiev', 6.74, 'overcast clouds', 87, 1004, 3, 30.52, 50.43, '04n', 200),
(32, 'Balakovo', -4.36, 'clear sky', 79, 1022, 3.55, 47.82, 52.02, '01n', 200),
(35, 'Guatemala', 29.43, 'broken clouds', 58, 1014, 4.6, -40.39, -19.86, '04d', 200),
(36, 'Sankt-Peterburg', 3.72, 'mist', 93, 1007, 3, 30.25, 59.92, '50n', 200),
(40, 'Chad', 8.58, 'overcast clouds', 100, 1020, 1.4, -83.02, 36.97, '04d', 200);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
