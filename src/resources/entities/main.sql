-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 16, 2023 at 01:47 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nettruyen`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_name` varchar(30) NOT NULL,
  `admin_password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_name`, `admin_password`) VALUES
('mavie', '1');

-- --------------------------------------------------------

--
-- Table structure for table `chapterimages`
--

CREATE TABLE `chapterimages` (
  `id` int(11) NOT NULL,
  `chapterid` int(11) DEFAULT NULL,
  `uri` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` int(11) NOT NULL,
  `comicid` int(11) DEFAULT NULL,
  `comicLocalId` int(11) DEFAULT NULL,
  `chap` varchar(255) DEFAULT NULL,
  `uploadTime` datetime DEFAULT NULL,
  `imagenumber` int(11) DEFAULT NULL,
  `Style` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`id`, `comicid`, `comicLocalId`, `chap`, `uploadTime`, `imagenumber`, `Style`) VALUES
(1, 2, 0, 'Chap 1', NULL, 4, 1),
(2, 1, 0, 'Chap 1', NULL, 4, 1),
(3, 5, 0, 'chap 1', NULL, 5, 1),
(4, 2, 0, 'Chap 2', NULL, 20, 2),
(5, 4, 0, 'Chap 1', NULL, 5, 2),
(6, 3, 0, 'Chap 1', NULL, 8, 2),
(7, 7, 0, 'Chap 1', NULL, 20, 2),
(8, 8, 0, 'Chap 1', NULL, 4, 1),
(9, 8, 0, 'Chap 1', NULL, 4, 1),
(10, 6, 0, 'Chap 1', NULL, 4, 1),
(11, 14, 0, 'Chap 1', NULL, 20, 2);

-- --------------------------------------------------------

--
-- Table structure for table `comics`
--

CREATE TABLE `comics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `image` varchar(1000) DEFAULT NULL,
  `tag` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `views` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comics`
--

INSERT INTO `comics` (`id`, `name`, `author`, `image`, `tag`, `status`, `views`) VALUES
(1, 'Truyện thứ 1', 'Author 1', 'ake.jpg', 'Lmao - Lmao - Lmao', NULL, 57),
(2, 'Truyện thứ 2', 'Author 2', 'bluf.jpg', 'lmao', NULL, 24),
(3, 'Truyện thứ 3', 'Author 3', 'ddsaaw.jpg', '1 - 22 2-3-álkdhoias', NULL, 3),
(4, 'Truyện thứ 4', 'Âosjd', 'vesa.jpg', 'lmao test etst', NULL, 5),
(5, 'test', 'test', '337255205_1782278522173595_2167193403709380852_n.jpg', 'test', NULL, 4),
(6, 'Test 1', 'Author 1111', '2021_09_06_09_43_525006EB-B9A1-4906-8621-0DFDC1DF5617.JPG', 'Tag 1', NULL, 0),
(7, 'Test 2', 'Author 3333', '2021_11_02_16_23_IMG_1723.JPG', 'Tag 1 4 5', NULL, 1),
(8, 'Last Test', 'Author last', '92607121_p0_master1200.jpg', 'Tag last', NULL, 2),
(9, 'ADd new', 'úahod', '269751839_1543218059346028_7069596240342700469_n.jpg', 'áoijd', NULL, 0),
(10, 'Test 4444', 'd;ấ', '105615137_p0_master1200.jpg', 'psadfp', NULL, 0),
(11, 'Hallo', 'hallo', '105615137_p0_master1200.jpg', 'hallo', NULL, 0),
(12, 'halllooooo', 'áddsa', '105080452_p0_master1200.jpg', 'ádad', NULL, 0),
(13, 'halllooooo', 'áddsa', '105080452_p0_master1200.jpg', 'ádad', NULL, 0),
(14, 'test aaaa', '211231', '2021_11_02_16_23_IMG_1723.JPG', 'ádasdasd', NULL, 2),
(15, 'hahahahahha', 'ajaasida', '2.png', 'aosdhoasdoasd', NULL, 0);

-- --------------------------------------------------------



CREATE TABLE `comics_tags` (
  `comicid` int(11) DEFAULT NULL,
  `tagid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------



CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `comicid` int(11) DEFAULT NULL,
  `timestampe` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `comments` (`id`, `parent_id`, `user_id`, `content`, `comicid`, `timestampe`) VALUES
(1, 0, 1, 'Hee loo', 1, '2023-03-27 19:14:58'),
(2, 0, 1, 'tesst thuwr tis tgoi ma', 2, '2023-03-27 19:17:08'),
(3, 0, 1, 'Owf owf tesst comic 4 comemnt', 2, '2023-03-27 19:18:50'),
(4, 0, 1, 'asaaaaa owf owf owf hgegegee', 2, '2023-03-27 19:19:55'),
(5, 0, 1, 'You\'re a reminder of the things I can\'t have', 4, '2023-03-27 19:21:05'),
(6, 0, 1, 'helello jaspd', 5, '2023-03-27 19:33:42'),
(7, 0, 1, 'uar lmao', 5, '2023-03-27 19:34:09'),
(8, 0, 1, 'asdasdasdaasdasd', 4, '2023-03-27 19:37:33'),
(9, 0, 1, 'hello 1234', 4, '2023-03-27 19:37:38'),
(10, 0, 1, 'tao là Kê tử aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 4, '2023-03-27 19:38:03'),
(11, 0, 3, 'lamooooooo', 7, '2023-03-28 13:03:31'),
(12, 0, 3, 'halllllo', 6, '2023-03-28 13:03:53'),
(13, 0, 1, 'halo', 3, '2023-03-28 14:22:18');

-- --------------------------------------------------------


CREATE TABLE `history` (
  `userid` int(11) DEFAULT NULL,
  `comicid` int(11) DEFAULT NULL,
  `chapterid` int(11) DEFAULT NULL,
  `id` int(11) PRIMARY KEY AUTO_INCREMENT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `history` (`userid`, `comicid`, `chapterid`, `idhistory`) VALUES
(1, 1, 2, 48),
(1, 5, 3, 49),
(1, 4, 5, 51),
(1, 3, 6, 53),
(3, 3, 6, 58),
(3, 4, 5, 60),
(3, 8, 9, 62),
(3, 7, 7, 63),
(1, 2, 1, 64),
(1, 14, 11, 66),
(3, 2, 4, 67);



CREATE TABLE `lastupdatedcomic` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `levels` (
  `userid` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `progress` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `tags` (
  `tagid` int(11) DEFAULT NULL,
  `tagname` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `topiccomments` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `topiccomments_chapters` (
  `topic_id` int(11) DEFAULT NULL,
  `chapter_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `topiccomments_comics` (
  `topic_id` int(11) DEFAULT NULL,
  `comic_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `userfollowingcomics` (
  `userid` int(11) NOT NULL,
  `comicid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `userfollowingcomics` (`userid`, `comicid`) VALUES
(0, 3),
(0, 4),
(1, 1),
(1, 2),
(1, 4),
(3, 3),
(3, 6),
(3, 7);



CREATE TABLE `userreadchapters` (
  `userid` int(11) DEFAULT NULL,
  `chapterid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------



CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `gmail` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT 'https://www.rd.com/wp-content/uploads/2021/01/GettyImages-588935825.jpg',
  `dayat` datetime DEFAULT current_timestamp(),
  `fullname` varchar(40) DEFAULT 'anonymous',
  `gender` varchar(6) DEFAULT 'khác',
  `Point` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `users` (`userid`, `username`, `pass`, `gmail`, `avatar`, `dayat`, `fullname`, `gender`, `Point`) VALUES
(1, 'mavie1', '2', NULL, 'bluf.jpg', '2023-03-22 18:31:03', 'Phan a', 'Nam', 76),
(2, 'maviess10', '1', NULL, 'bluf.jpg', '2023-03-26 18:07:00', 'anonymous', 'khác', 0),
(3, 'vietanh', '1', NULL, '105006236_p0_master1200.jpg', '2023-03-27 18:38:22', 'Thủy Kê Tử', 'Nam', 9);


ALTER TABLE `chapterimages`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `comics`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `history`
  ADD PRIMARY KEY (`idhistory`),
  ADD KEY `chapterid` (`chapterid`),
  ADD KEY `comicid` (`comicid`),
  ADD KEY `userid` (`userid`);


ALTER TABLE `lastupdatedcomic`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `topiccomments`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `userfollowingcomics`
  ADD PRIMARY KEY (`userid`,`comicid`),
  ADD KEY `userid` (`userid`,`comicid`),
  ADD KEY `comicid` (`comicid`);


ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);


ALTER TABLE `chapterimages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;


ALTER TABLE `comics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;


ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;


ALTER TABLE `history`
  MODIFY `idhistory` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;


ALTER TABLE `lastupdatedcomic`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `topiccomments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;


ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`chapterid`) REFERENCES `chapters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_2` FOREIGN KEY (`comicid`) REFERENCES `comics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `userfollowingcomics`
  ADD CONSTRAINT `userfollowingcomics_ibfk_1` FOREIGN KEY (`comicid`) REFERENCES `comics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;


