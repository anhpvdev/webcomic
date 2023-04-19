CREATE TABLE `admin` (
  `admin_name` varchar(30) NOT NULL,
  `admin_password` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `users` (
  `userid` int(11) PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `pass` varchar(255),
  `gmail` varchar(255),
  `avatar` varchar(255),
  `dayat` datetime DEFAULT CURRENT_TIMESTAMP,
  `fullname` varchar(40) DEFAULT 'anonymous',
  `gender` varchar(6) DEFAULT 'khác',
  `Point` int(10) NOT NULL
);

CREATE TABLE `UserReadChapters` (
  `userid` int,
  -- `comicid` int,
  `chapterid` int,
  `readtime` datetime DEFAULT CURRENT_TIMESTAMP;
);

CREATE TABLE `levels` (
  `userid` int,
  `level` int,
  `progress` int
);

CREATE TABLE `UserFollowingComics` (
  `userid` int,
  `comicid` int
);

CREATE TABLE `tags` (
  `tagid` int PRIMARY KEY AUTO_INCREMENT,
  `tagname` varchar(255)
);

CREATE TABLE `comics_tags` (
  `comicid` int,
  `tagid` int
);

CREATE TABLE `Comics` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `author` varchar(255),
  `image` varchar(255) DEFAULT NULL,
  `status` int,
  `views` int
);

CREATE TABLE `Chapters` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `comicid` int,
  `comicLocalId` int,
  `name` varchar(255),
  `uploadTime` datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `ChapterImages` (
  `chapterid` int,
  `uri` varchar(255)
);

CREATE TABLE `TopicComments` (
  `id` int PRIMARY KEY AUTO_INCREMENT
);

CREATE TABLE `Comments` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `parent_id` int,
  `topic_id` int,
  `user_id` int,
  `content` varchar(255),
  `timestampe` time
);

CREATE TABLE `TopicComments_Comics` (
  `topic_id` int,
  `comic_id` int
);

CREATE TABLE `TopicComments_Chapters` (
  `topic_id` int ,
  `chapter_id` int
);

CREATE TABLE `LastUpdatedComic` (
  `id` int,
  `updatetime` datetime DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE `UserFollowingComics` 
   ADD CONSTRAINT `UserFollowingComics_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
   ADD CONSTRAINT `UserFollowingComics_ibfk_2` FOREIGN KEY (`comicid`) REFERENCES `comics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `Chapters`  ADD CONSTRAINT `Chapters_ibfk_1` FOREIGN KEY (`comicid`) REFERENCES `Comics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
   
ALTER TABLE `comics_tags` 
   ADD CONSTRAINT `comics_tags_ibfk_1` FOREIGN KEY (`comicid`) REFERENCES `Comics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
   ADD CONSTRAINT `comics_tags_ibfk_2` FOREIGN KEY (`tagid`) REFERENCES `tags` (`tagid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `levels` ADD CONSTRAINT `levels_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `UserReadChapters` 
	ADD CONSTRAINT `UserReadChapters_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `UserReadChapters_ibfk_2` FOREIGN KEY (`chapterid`) REFERENCES `Chapters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `ChapterImages`  ADD CONSTRAINT `ChapterImages_ibfk_1` FOREIGN KEY (`chapterid`) REFERENCES `Chapters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE `Comments` 
    ADD CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
    

ALTER TABLE `TopicComments` 
  ADD CONSTRAINT `TopicComments_ibfk_2` FOREIGN KEY (`id`) REFERENCES `Comments` (`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE;
  ADD CONSTRAINT `TopicComments_ibfk_1` FOREIGN KEY (`id`) REFERENCES `TopicComments_Chapters` (`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE,
   ADD CONSTRAINT `TopicComments_ibfk_3` FOREIGN KEY (`id`) REFERENCES `TopicComments_Comics` (`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `TopicComments_Comics` 
    ADD CONSTRAINT `TopicComments_Comics_ibfk_2` FOREIGN KEY (`comic_id`) REFERENCES `Comics` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `TopicComments_Chapters` 
    ADD CONSTRAINT `TopicComments_Chapters_ibfk_2` FOREIGN KEY (`chapter_id`) REFERENCES `Chapters` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;



INSERT INTO `admin` (`admin_name`, `admin_password`) VALUES
('mavie', '1');

INSERT INTO `users` (`userid`, `username`, `pass`, `gmail`, `avatar`, `dayat`, `fullname`, `gender`, `Point`) VALUES
(1, 'mavie1', '2', NULL, 'bluf.jpg', '2023-03-22 18:31:03', 'Phan a', 'Nam', 76),
(2, 'maviess10', '1', NULL, 'bluf.jpg', '2023-03-26 18:07:00', 'anonymous', 'khác', 0),
(3, 'vietanh', '1', NULL, '105006236_p0_master1200.jpg', '2023-03-27 18:38:22', 'Thủy Kê Tử', 'Nam', 9);


INSERT INTO `comics` (`id`, `name`, `author`, `image`, `status`, `views`) VALUES
(1, 'Truyện thứ 1', 'Author 1', 'ake.jpg', NULL, 57),
(2, 'Truyện thứ 2', 'Author 2', 'bluf.jpg',  NULL, 24),
(3, 'Truyện thứ 3', 'Author 3', 'ddsaaw.jpg', NULL, 3),
(4, 'Truyện thứ 4', 'Âosjd', 'vesa.jpg', NULL, 5),
(5, 'test', 'test', '337255205_1782278522173595_2167193403709380852_n.jpg', NULL, 4),
(6, 'Test 1', 'Author 1111', '2021_09_06_09_43_525006EB-B9A1-4906-8621-0DFDC1DF5617.JPG', NULL, 0),
(7, 'Test 2', 'Author 3333', '2021_11_02_16_23_IMG_1723.JPG', NULL, 1),
(8, 'Last Test', 'Author last', '92607121_p0_master1200.jpg',  NULL, 2),
(9, 'ADd new', 'úahod', '269751839_1543218059346028_7069596240342700469_n.jpg', NULL, 0),
(10, 'Test 4444', 'd;ấ', '105615137_p0_master1200.jpg',  NULL, 0),
(11, 'Hallo', 'hallo', '105615137_p0_master1200.jpg', NULL, 0),
(12, 'halllooooo', 'áddsa', '105080452_p0_master1200.jpg',  NULL, 0),
(13, 'halllooooo', 'áddsa', '105080452_p0_master1200.jpg',  NULL, 0),
(14, 'test aaaa', '211231', '2021_11_02_16_23_IMG_1723.JPG',  NULL, 2),
(15, 'hahahahahha', 'ajaasida', '2.png', NULL, 0);

INSERT INTO `chapters` (`id`, `comicid`, `comicLocalId`, `name`, `uploadTime`) VALUES
(1, 2, 0, 'Chap 1', NULL),
(2, 1, 0, 'Chap 1', NULL),
(3, 5, 0, 'chap 1', NULL),
(4, 2, 0, 'Chap 2', NULL),
(5, 4, 0, 'Chap 1', NULL),
(6, 3, 0, 'Chap 1', NULL),
(7, 7, 0, 'Chap 1', NULL),
(8, 8, 0, 'Chap 1', NULL),
(9, 8, 0, 'Chap 1', NULL),
(10, 6, 0, 'Chap 1', NULL),
(11, 14, 0, 'Chap 1', NULL);

INSERT INTO `userfollowingcomics` (`userid`, `comicid`) VALUES
(1, 3),
(1, 4),
(1, 1),
(1, 2),
(1, 4),
(3, 3),
(3, 6),
(3, 7);

INSERT INTO chapterimages(chapterid ,uri) 
VALUES (1, "1.jpg,2.jpg,3.jpg,4.jpg"),
(2, "1.jpg,2.jpg,3.jpg,4.jpg"),
(3, "1.jpg,2.jpg,3.jpg,4.jpg,5.jpg"),
(4, "1.jpg,2.jpg,3.jpg,4.jpg,5.jpg,6.jpg,7.jpg,8.jpg,9.jpg,10.jpg"),
(5, "1.jpg,2.jpg,3.jpg,4.jpg,5.jpg"),
(6, "1.jpg,2.jpg,3.jpg,4.jpg,5.jpg,6.jpg,7.jpg,8.jpg"),
(7, "1.jpg,2.jpg,3.jpg,4.jpg,5.jpg,6.jpg,7.jpg,8.jpg,9.jpg,10.jpg"),
(8, "1.jpg,2.jpg,3.jpg,4.jpg"),
(9, "1.jpg,2.jpg,3.jpg,4.jpg"),
(10, "1.jpg,2.jpg,3.jpg,4.jpg"),
(11,"1.jpg,2.jpg,3.jpg,4.jpg,5.jpg,6.jpg,7.jpg,8.jpg,9.jpg,10.jpg" ),
(12, "1.jpg,2.jpg,3.jpg,4.jpg,5.jpg"),
(13, "6.jpg,7.jpg"),
(14, "8.jpg,9.jpg"),
(15, "5.jpg,9.jpg,10.jpg"),
(16, "6.jpg,7.jpg,8.jpg");


INSERT INTO `lastupdatedcomic`(id) 
VALUES(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14);


