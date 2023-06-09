-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2023 at 04:39 PM
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
-- Database: `truyentranh`
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
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` int(11) NOT NULL,
  `comicid` int(11) DEFAULT NULL,
  `comicLocalId` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `uri` varchar(1000) NOT NULL,
  `uploadTime` datetime DEFAULT current_timestamp(),
  `topiccomment_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`id`, `comicid`, `comicLocalId`, `name`, `uri`, `uploadTime`, `topiccomment_id`) VALUES
(1, 2, 0, 'Chap 1', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:34:19', 'ct1'),
(2, 1, 0, 'Chap 1', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:35:19', 'ct2'),
(3, 5, 0, 'chap 1', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:36:19', 'ct3'),
(4, 2, 0, 'Chap 2', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:37:19', 'ct4'),
(6, 3, 0, 'Chap 1', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:38:19', 'ct6'),
(7, 7, 0, 'Chap 1', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:39:19', 'ct7'),
(8, 8, 0, 'Chap 1', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:40:19', 'ct8'),
(9, 8, 0, 'Chap 2', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:41:19', 'ct9'),
(10, 6, 0, 'Chap 1', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.pngv', '2023-04-18 09:42:19', 'ct10'),
(11, 14, 0, 'Chap 1', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:43:19', 'ct11'),
(12, 2, NULL, 'chap 3', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:44:19', 'ct12'),
(13, 2, NULL, 'chap 4', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:45:19', 'ct13'),
(14, 2, NULL, 'chap 5', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:45:19', 'ct14'),
(15, 2, NULL, 'chap 6', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:46:19', 'ct15'),
(16, 8, NULL, 'chap 3', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 09:53:19', 'ct16'),
(17, 6, NULL, 'chap 2', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 10:39:25', 'ct17'),
(18, 7, NULL, 'Chap 2', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 18:23:58', 'ct18'),
(19, 12, NULL, 'Chap 1', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-18 19:34:35', 'ct19'),
(20, 1, NULL, 'chap 999', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-19 12:09:05', 'ct20'),
(21, 3, NULL, 'chap 1111', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-04-19 12:27:22', 'ct21'),
(23, 16, NULL, 'chap1', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-05-01 09:42:13', 'ct23'),
(24, 16, NULL, 'chap2', '1.jpg,2.png,3.png,4.png,5.png,6.png,7.png,8.png,9.png,10.png,11.png,12.png,13.png,14.png', '2023-05-01 09:55:36', 'ct24');

-- --------------------------------------------------------

--
-- Table structure for table `chapters__comment`
--

CREATE TABLE `chapters__comment` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `topic_id` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `timestampe` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chapters__comment`
--

INSERT INTO `chapters__comment` (`id`, `parent_id`, `topic_id`, `user_id`, `content`, `timestampe`) VALUES
(1, NULL, 'ct2', 2, 'huhuhuhuhuhhuhu', '2023-05-01 18:54:52'),
(4, NULL, 'ct1', 2, 'huhuhuhu', '2023-05-01 20:20:10'),
(5, NULL, 'ct1', 2, 'hix hix  đcm', '2023-05-01 20:23:04'),
(7, NULL, 'ct1', 2, 'hello em', '2023-05-01 22:14:27'),
(8, NULL, 'ct1', 2, 'hú hú ', '2023-05-01 22:15:57'),
(9, 8, 'ct1', 2, 'gì zậy', '2023-05-01 22:21:28');

-- --------------------------------------------------------

--
-- Table structure for table `comics`
--

CREATE TABLE `comics` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `views` int(11) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `topiccomment_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comics`
--

INSERT INTO `comics` (`id`, `name`, `author`, `status`, `views`, `image`, `topiccomment_id`) VALUES
(1, 'Truyện thứ 1', 'Author 1', NULL, 59, 'ake.jpg', 'cm1'),
(2, 'Truyện thứ 2', 'Author 2', NULL, 59, 'bluf.jpg', 'cm2'),
(3, 'Truyện thứ 3', 'Author 3', NULL, 3, 'ddsaaw.jpg', 'cm3'),
(5, 'test', 'test', NULL, 4, '337255205_1782278522173595_2167193403709380852_n.jpg', 'cm5'),
(6, 'Test 1', 'Author 1111', NULL, 13, '2021_09_06_09_43_525006EB-B9A1-4906-8621-0DFDC1DF5617.JPG', 'cm6'),
(7, 'Test 2', 'Author 3333', NULL, 16, '2021_11_02_16_23_IMG_1723.JPG', 'cm7'),
(8, 'Last Test', 'Author last', NULL, 4, '92607121_p0_master1200.jpg', 'cm8'),
(9, 'ADd new', 'úahod', NULL, 0, '269751839_1543218059346028_7069596240342700469_n.jpg', 'cm9'),
(10, 'Test 4444', 'd;ấ', NULL, 0, '105615137_p0_master1200.jpg', 'cm10'),
(12, 'halllooooo', 'áddsa', NULL, 0, '105080452_p0_master1200.jpg', 'cm12'),
(14, 'test aaaa', '211231', NULL, 5, '2021_11_02_16_23_IMG_1723.JPG', 'cm14'),
(16, 'add toap[sdjpasjdpasodjpaosdpasdoassd', 'o[asdi[asod[asd[oasdo[o[ad', NULL, 0, '103469012_p0.png', 'cm16'),
(17, 'ádasdasdasdasasasdasasdasasd', 'o[asdi[asod[asd[oasdo[o[ad', NULL, 0, '91362471_p0_master1200.jpg', 'cm17'),
(18, 'âggggggggggggggggggggggggggggggggggggggg', 'o[asdi[asod[asd[oasdo[o[ad', NULL, 0, '102036798_p0 - Copy - Copy (2).png', 'cm18'),
(19, 'ghuhuhuhuuhuhuhuhuhuhuhuuh', 'o[asdi[asod[asd[oasdo[o[ad', NULL, 0, '105006236_p0_master1200.jpg', 'cm19'),
(20, 'test add tag ', 'huhuhuhu', NULL, 0, 'Ã¡dasdasd-gigapixel-scale-2_00x.png', 'cm20'),
(21, 'ádasdas', 'ádasdas', NULL, 0, '92607121_p0_master1200.jpg', 'cm21'),
(22, 'ádasd', 'ádasasdas', NULL, 0, 'bluf.jpg', 'cm22'),
(23, 'ádasdasd', 'ádasasd', NULL, 0, 'ddsaaw.jpg', 'cm23'),
(24, 'ádasd', 'ádasda', NULL, 0, '2021_11_02_16_23_IMG_1723.JPG', 'cm24'),
(25, 'ádasd', 'ádasdasd', NULL, 0, 'ddsaaw.jpg', 'cm25'),
(26, 'ádasdas', 'ádasdassd', NULL, 0, 'Ã¡dasdas.png', 'cm26'),
(27, 'Thằng này là Truyện Hoàn CmN chỉnh', 'tao', NULL, 0, '2021_09_06_09_43_525006EB-B9A1-4906-8621-0DFDC1DF5617.JPG', 'cm27'),
(28, 'Thằng này là Truyện Hoàn CmN chỉnh', 'tao', NULL, 0, '2021_09_06_09_43_525006EB-B9A1-4906-8621-0DFDC1DF5617.JPG', 'cm28'),
(29, 'Lần này ok thật', 'ádasasdasasd', NULL, 0, '2021_09_06_09_43_525006EB-B9A1-4906-8621-0DFDC1DF5617.JPG', 'cm29');

-- --------------------------------------------------------

--
-- Table structure for table `comics_tags`
--

CREATE TABLE `comics_tags` (
  `comicid` int(11) DEFAULT NULL,
  `tagid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comics_tags`
--

INSERT INTO `comics_tags` (`comicid`, `tagid`) VALUES
(29, 3),
(29, 13),
(29, 19),
(29, 30),
(29, 32),
(1, 1),
(1, 2),
(1, 6),
(2, 3),
(2, 14),
(3, 4),
(3, 6),
(3, 9),
(3, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(10, 5),
(12, 1),
(14, 9),
(14, 1),
(7, 11),
(7, 7),
(16, 1),
(17, 1),
(18, 1),
(19, 1),
(20, 1),
(21, 1),
(22, 1),
(23, 1),
(24, 1),
(25, 1),
(26, 1),
(27, 1),
(28, 1),
(5, 5),
(6, 3),
(7, 7),
(8, 2),
(9, 5),
(10, 7),
(12, 13),
(12, 22),
(10, 13),
(14, 16),
(14, 22),
(6, 17),
(16, 19),
(17, 21),
(18, 8),
(19, 11),
(20, 15),
(21, 17),
(22, 12),
(23, 21),
(24, 20),
(25, 10),
(26, 11),
(27, 15),
(28, 16);

-- --------------------------------------------------------

--
-- Table structure for table `comics__comment`
--

CREATE TABLE `comics__comment` (
  `id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `topic_id` varchar(20) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `timestampe` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comics__comment`
--

INSERT INTO `comics__comment` (`id`, `parent_id`, `topic_id`, `user_id`, `content`, `timestampe`) VALUES
(1, NULL, 'cm2', 2, 'huhuhuhu', '2023-05-01 19:56:01'),
(2, NULL, 'cm2', 2, 'huhuhu địt mẹ m', '2023-05-01 19:56:01'),
(3, NULL, 'cm2', 2, 'huhuhu đcmm', '2023-05-01 19:56:01'),
(4, NULL, 'cm12', 2, 'huhuhu sss', '2023-05-01 20:09:30'),
(6, 1, 'cm2', 2, 'huhu cc à', '2023-05-01 20:54:41'),
(7, 2, 'cm2', 2, 'đcmmm ', '2023-05-01 21:33:40'),
(8, NULL, 'cm2', 2, 'test này', '2023-05-01 21:40:12'),
(9, NULL, 'cm2', 2, 'test này', '2023-05-01 21:42:17'),
(10, NULL, 'cm20', 2, 'test thử xem này', '2023-05-01 21:43:38'),
(11, NULL, 'cm20', 2, 'test thử xem này', '2023-05-01 21:44:18'),
(12, NULL, 'cm25', 2, 'truyện này để test', '2023-05-01 21:46:06'),
(13, NULL, 'cm25', 2, 'ok, lần này hết mẹ lỗi r', '2023-05-01 21:46:58'),
(14, 13, 'cm25', 2, 'oke chưa em', '2023-05-01 21:47:14'),
(15, 13, 'cm25', 2, 'ok xong r đấy địt mejjjjjjjjjjjjjjjjjjjjj', '2023-05-01 21:48:13');

-- --------------------------------------------------------

--
-- Table structure for table `lastupdatedcomic`
--

CREATE TABLE `lastupdatedcomic` (
  `id` int(11) DEFAULT NULL,
  `updatetime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lastupdatedcomic`
--

INSERT INTO `lastupdatedcomic` (`id`, `updatetime`) VALUES
(1, '2023-04-19 12:09:05'),
(2, '2023-04-18 19:25:20'),
(3, '2023-04-19 12:27:22'),
(4, '2023-04-18 19:16:49'),
(5, '2023-04-18 19:16:49'),
(6, '2023-04-18 19:16:49'),
(7, '2023-04-18 19:16:49'),
(8, '2023-04-18 19:16:49'),
(9, '2023-04-18 19:16:49'),
(10, '2023-04-18 19:16:49'),
(11, '2023-04-18 19:16:49'),
(12, '2023-04-18 19:34:35'),
(13, '2023-04-18 19:16:49'),
(14, '2023-04-18 19:16:49'),
(19, '2023-04-18 19:43:50'),
(16, '2023-04-18 19:44:31'),
(17, '2023-04-18 19:44:35'),
(18, '2023-04-18 19:44:39'),
(20, '2023-04-19 18:40:49'),
(21, '2023-04-19 18:42:04'),
(22, '2023-04-19 18:50:35'),
(23, '2023-04-19 18:52:19'),
(24, '2023-04-19 18:52:46'),
(25, '2023-04-19 18:53:53'),
(26, '2023-04-19 18:54:25'),
(29, '2023-04-19 19:00:55');

-- --------------------------------------------------------

--
-- Table structure for table `levels`
--

CREATE TABLE `levels` (
  `userid` int(11) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  `progress` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tagid` int(11) NOT NULL,
  `tagname` varchar(255) DEFAULT NULL,
  `taginf` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tagid`, `tagname`, `taginf`) VALUES
(1, 'Manga', 'Truyện tranh của Nhật Bản'),
(2, 'Manhua', 'Truyện tranh của Trung Quốc'),
(3, 'Manhwa', 'Truyện tranh của Hàn'),
(4, 'Action', 'Thể loại hành động, thường có nội dung về bạo lực, hỗn loạn,diễn biến nhanh'),
(5, 'Adult', ''),
(6, 'Adventure', 'Thể loại phiêu lưu, mạo hiểm, thường là hành trình của các nhân vật'),
(7, 'Chuyển Sinh', 'Thể loại có nội dung trong sáng và cảm động, thường có các tình tiết gây cười, các xung đột nhẹ nhàng'),
(8, 'Comedy', ''),
(9, 'Cooking', 'Thể loại có nội dung về nấu ăn, ẩm thực'),
(10, 'Cổ Đại', 'Truyện có nội dung xảy ra ở thời cổ đại phong kiến'),
(11, 'Drama', ''),
(12, 'Đam Mỹ', ''),
(13, 'Bách Hợp', ''),
(14, 'Ecchi', ''),
(15, 'Fantasy', 'Thể loại xuất phát từ trí tưởng tượng phong phú, từ pháp thuật đến thế giới trong mơ thậm chí là những câu chuyện thần tiên '),
(16, 'Gender Bender', 'Giới tính nhân vật lẫn lộn'),
(17, 'Harem', ''),
(18, 'Horror', 'rùng rợn, nghe cái tên là bạn đã hiểu thể loại này có nội dung thế nào. Nó làm cho bạn kinh hãi, khiếp sợ, ghê tởm, run rẩy, có thể gây sock'),
(19, 'Mecha', 'còn được biết đến dưới cái tên meka hay mechs, là thể loại nói tới robot'),
(20, 'Mystery', 'Thể loại thường xuất hiện những điều bí ấn không thể lí giải được và sau đó là những nỗ lực của nhân vật chính nhằm tìm ra câu trả lời thỏa đáng'),
(21, 'Ngôn Tình', 'Truyện thuộc kiểu lãng mạn, kể về những sự kiện vui buồn trong tình yêu của nhân vật chính.'),
(22, 'One Shot', ''),
(23, 'Psychological', 'Thể loại liên quan đến những vấn đề về tâm lý của nhân vật'),
(24, 'Romance', 'Thường là những câu chuyện về tình yêu, tình cảm lãng mạn'),
(25, 'School Life', ''),
(26, 'Slice of Life', 'Nói về cuộc sống đời thường'),
(27, 'Smut', 'Những truyện có nội dung hơi nhạy cảm, đặc biệt là liên quan đến tình dục'),
(28, 'Sports', 'Truyện có nội dung về thể thao'),
(29, 'Tragedy', 'Thể loại chứa đựng những sự kiện mà dẫn đến kết cục là những mất mát hay sự rủi ro to lớn'),
(30, 'Trinh Thám', 'Các truyện có nội dung về các vụ án, các thám tử cảnh sát điều tra...'),
(31, 'Truyện Màu', ''),
(32, 'Xuyên Không', '');

-- --------------------------------------------------------

--
-- Table structure for table `userfollowingcomics`
--

CREATE TABLE `userfollowingcomics` (
  `userid` int(11) DEFAULT NULL,
  `comicid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userfollowingcomics`
--

INSERT INTO `userfollowingcomics` (`userid`, `comicid`) VALUES
(1, 3),
(1, 1),
(3, 3),
(3, 6),
(3, 7),
(1, 2),
(1, 24),
(2, 2),
(2, 20),
(2, 20),
(2, 22);

-- --------------------------------------------------------

--
-- Table structure for table `userreadchapters`
--

CREATE TABLE `userreadchapters` (
  `userid` int(11) DEFAULT NULL,
  `chapterid` int(11) DEFAULT NULL,
  `readtime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userreadchapters`
--

INSERT INTO `userreadchapters` (`userid`, `chapterid`, `readtime`) VALUES
(1, 2, '2023-04-18 09:34:19'),
(1, 1, '2023-04-18 09:34:23'),
(1, 9, '2023-04-18 09:34:28'),
(1, 1, '2023-04-18 09:34:31'),
(1, 4, '2023-04-18 09:34:32'),
(1, 7, '2023-04-18 17:51:07'),
(1, 18, '2023-04-18 18:51:58'),
(1, 13, '2023-04-18 18:52:09'),
(1, 1, '2023-04-20 20:42:34'),
(1, 1, '2023-04-20 20:42:36'),
(1, 1, '2023-04-20 20:43:07'),
(1, 1, '2023-04-21 09:35:01'),
(1, 1, '2023-04-21 09:45:22'),
(1, 1, '2023-04-21 09:46:36'),
(1, 15, '2023-04-21 09:46:37'),
(1, 1, '2023-04-21 14:46:23'),
(1, 10, '2023-04-28 15:18:20');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `gmail` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `dayat` datetime DEFAULT current_timestamp(),
  `fullname` varchar(40) DEFAULT 'anonymous',
  `gender` varchar(6) DEFAULT 'khác',
  `Point` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `pass`, `gmail`, `avatar`, `dayat`, `fullname`, `gender`, `Point`) VALUES
(1, 'mavie1', '1', 'maviess10@gmail.com', '1.png', '2023-03-22 18:31:03', 'Phan a', 'Nam', 98),
(2, 'mavie', '1', NULL, 'bluf.jpg', '2023-03-26 18:07:00', 'Thủy Kê Tử', 'Nam', 43),
(3, 'vietanh', '1', NULL, '3.png', '2023-03-27 18:38:22', 'Thủy Kê Tử', 'Nam', 9),
(4, 'maviee', '1', NULL, '4.png', '2023-04-20 20:45:38', 'anonymous', 'khác', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Comics_ibfk_1` (`comicid`),
  ADD KEY `topiccomment_id` (`topiccomment_id`);

--
-- Indexes for table `chapters__comment`
--
ALTER TABLE `chapters__comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chapter__comment_ibfk_1` (`user_id`),
  ADD KEY `chapter__comment_ibfk_2` (`topic_id`);

--
-- Indexes for table `comics`
--
ALTER TABLE `comics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `topiccomment_id` (`topiccomment_id`);

--
-- Indexes for table `comics_tags`
--
ALTER TABLE `comics_tags`
  ADD KEY `comics_tags_ibfk_1` (`comicid`),
  ADD KEY `comics_tags_ibfk_2` (`tagid`);

--
-- Indexes for table `comics__comment`
--
ALTER TABLE `comics__comment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comic__comment_ibfk_1` (`user_id`),
  ADD KEY `comic__comment_ibfk_2` (`topic_id`);

--
-- Indexes for table `levels`
--
ALTER TABLE `levels`
  ADD KEY `levels_ibfk_1` (`userid`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tagid`);

--
-- Indexes for table `userfollowingcomics`
--
ALTER TABLE `userfollowingcomics`
  ADD KEY `UserFollowingComics_ibfk_1` (`userid`),
  ADD KEY `UserFollowingComics_ibfk_2` (`comicid`);

--
-- Indexes for table `userreadchapters`
--
ALTER TABLE `userreadchapters`
  ADD KEY `UserReadChapters_ibfk_1` (`userid`),
  ADD KEY `UserReadChapters_ibfk_2` (`chapterid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `chapters__comment`
--
ALTER TABLE `chapters__comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `comics`
--
ALTER TABLE `comics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `comics__comment`
--
ALTER TABLE `comics__comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `Comics_ibfk_1` FOREIGN KEY (`comicid`) REFERENCES `comics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `chapters__comment`
--
ALTER TABLE `chapters__comment`
  ADD CONSTRAINT `chapter__comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `chapter__comment_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `chapters` (`topiccomment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comics_tags`
--
ALTER TABLE `comics_tags`
  ADD CONSTRAINT `comics_tags_ibfk_1` FOREIGN KEY (`comicid`) REFERENCES `comics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comics_tags_ibfk_2` FOREIGN KEY (`tagid`) REFERENCES `tags` (`tagid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comics__comment`
--
ALTER TABLE `comics__comment`
  ADD CONSTRAINT `comic__comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comic__comment_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `comics` (`topiccomment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `levels`
--
ALTER TABLE `levels`
  ADD CONSTRAINT `levels_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userfollowingcomics`
--
ALTER TABLE `userfollowingcomics`
  ADD CONSTRAINT `UserFollowingComics_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserFollowingComics_ibfk_2` FOREIGN KEY (`comicid`) REFERENCES `comics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userreadchapters`
--
ALTER TABLE `userreadchapters`
  ADD CONSTRAINT `UserReadChapters_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserReadChapters_ibfk_2` FOREIGN KEY (`chapterid`) REFERENCES `chapters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
