-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 09, 2022 at 05:37 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bkshop`
--
DROP DATABASE IF EXISTS bkshop;
CREATE DATABASE bkshop;
USE bkshop;
-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `username`, `password`) VALUES
(1, 'datkui', '$2y$10$sH9P2JH135RLI381/x6UPun5kRiFSm3DZljaDraPylq9spbfA5Yqm');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fName` varchar(255) NOT NULL,
  `lName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `birthday` date NOT NULL,
  `url_avt` varchar(100) NOT NULL,
  `isBlocked` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `fName`, `lName`, `email`, `phone`, `birthday`, `url_avt`, `isBlocked`) VALUES
(1, 'tri', '$2y$10$sH9P2JH135RLI381/x6UPun5kRiFSm3DZljaDraPylq9spbfA5Yqm', 'Lê Cao Minh', 'Trí', '', '', '0000-00-00', 'https://www.seekpng.com/png/full/514-5147412_default-avatar-icon.png', 0),
(2, 'dat', '$2y$10$sH9P2JH135RLI381/x6UPun5kRiFSm3DZljaDraPylq9spbfA5Yqm', 'Đào Xuân', 'Đạt', '', '', '0000-00-00', 'https://www.seekpng.com/png/full/514-5147412_default-avatar-icon.png', 0),
(3, 'an', '$2y$10$sH9P2JH135RLI381/x6UPun5kRiFSm3DZljaDraPylq9spbfA5Yqm', 'Dư Văn', 'An', '', '', '0000-00-00', 'https://www.seekpng.com/png/full/514-5147412_default-avatar-icon.png', 0),
(4, 'vinh', '$2y$10$sH9P2JH135RLI381/x6UPun5kRiFSm3DZljaDraPylq9spbfA5Yqm', 'Nguyễn Phúc', 'Vinh', '', '', '0000-00-00', 'https://www.seekpng.com/png/full/514-5147412_default-avatar-icon.png', 0);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` varchar(500) NOT NULL,
  `rate` int(11) NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`id`, `product_id`, `user_id`, `comment`, `rate`, `datetime`) VALUES
(1, 1, 1, ' giải pháp tản nhiệt mới Up-Down Air - tản nhiệt theo hai hướng khác nhau giúp hiệu suất tuần hoàn nhiệt nhanh hơn, tốt hơn.', 5, '2020-08-03 00:00:00'),
(2, 1, 2, 'Thiết kế bắt mắt, sang trọng, máy gọn nhẹ. Pin sử dụng được lâu, sạc nhanh.', 5, '2020-08-03 00:00:00'),
(3, 1, 3, 'PwNForCard', 5, '2020-07-27 00:00:00'),
(4, 2, 4, 'tuy 16\" nhưng máy rất mỏn nhẹ, rất đáng đồng tiền', 5, '2020-07-08 00:00:00'),
(5, 2, 1, 'màn hình hiển thị sắc nét, sống động', 5, '2020-07-15 00:00:00'),
(6, 2, 2, 'thời gian sử dụng pin lâu', 5, '2020-07-15 00:00:00'),
(7, 3, 3, 'không chỉ máy đẹp mỏng nhẹ mà màn hình 2k cực kì đẹp, đáng đồng tiền', 5, '2020-07-08 00:00:00'),
(8, 4, 4, 'máy xài mát, led rgb đẹp', 5, '2020-12-04 00:00:00'),
(9, 4, 1, 'chơi game mượt , mát mình rất thích . Balo tặng kèm dày dặn , đẹp', 5, '2020-02-23 00:00:00'),
(10, 5, 2, 'xài ok lắm nha , con này xứng đáng lap gaming quốc dân', 5, '2020-01-07 00:00:00'),
(11, 5, 3, 'Xài tốt cho nhu cầu học, văn phòng và cả gaming, máy chạy nhanh, mát, 15.6inch nhưng gọn nhẹ, mang vác rất thoải mái', 5, '2020-12-20 00:00:00'),
(12, 6, 4, 'máy mát , loa hơi nhỏ nhưng mò ra dc phần mềm chỉnh loa nên fix lại xai ok , nên nâng cây ram để hiệu năng tốt nhất', 5, '2020-01-14 00:00:00'),
(13, 6, 1, 'chơi phê', 5, '2020-01-07 00:00:00'),
(14, 6, 2, 'Có máy gaming chất liệu kim loại dưới 23 triệu CPU i5 hoặc i7 chip h ram >8GB,dung lượng khoảng 500 GB k', 5, '2020-01-28 00:00:00'),
(15, 6, 3, 'trải nghiệm máy 3 tháng máy xài khá hài lòng , không ngờ sáng gửi máy vệ sinh mà trưa đã có máy rồi , dịch vụ Acer rất tốt và nhanh ', 5, '2020-02-22 00:00:00'),
(16, 6, 4, 'máy chạy tốt các phần mềm , mát mẻ khá thích', 5, '2020-01-07 00:00:00'),
(17, 6, 1, 'máy xài mát', 5, '2020-12-04 00:00:00'),
(18, 7, 2, 'máy mình đánh giá nhiệt độ khá mát mặc dù chơi game nặng 2-3 tiếng liên tục , led mượt lắm nha mn ', 5, '2020-02-23 00:00:00'),
(19, 7, 3, 'máy xài ok , dc vệ sinh miễn phí vs khá nhanh , sáng gửi chiều đã có máy , service hãng tốt', 5, '2020-01-07 00:00:00'),
(20, 7, 4, 'máy xài dc 1 tháng quay lại feedback cho shop , máy rất mướt , chạy tốt các phần mềm', 5, '2020-01-14 00:00:00'),
(21, 7, 1, 'máy rất ok nha , led đẹp , chỉnh được quạt nên mát lắm', 5, '2020-01-07 00:00:00'),
(22, 7, 2, 'không có gì để chê , máy mát , đầy đủ wc', 5, '2020-01-03 00:00:00'),
(23, 7, 3, 'Phân vân giữa Intel và AMD, nên lấy con nào nhỉ?', 5, '2020-12-29 00:00:00'),
(24, 7, 4, 'máy cầm chắc tay , nâng cấp tốt , service nhanh lẹ', 5, '2020-02-28 00:00:00'),
(25, 7, 1, 'đã mua , dùng ổn , game mượt', 5, '2020-03-12 00:00:00'),
(26, 7, 2, 'máy xài ok lắm , mua bên shop giá tốt hơn các shop khác , tuy cửa hàng hơi nhỏ nhưng nhân viên tư vấn nhiệt tình , máy chính hãng', 5, '2020-02-21 00:00:00'),
(27, 7, 3, 'máy ok , khá gọn không quá to so với máy dòng Victus , máy mở bằng 1 tay thoải mái', 5, '2020-02-27 00:00:00'),
(28, 8, 4, 'Mua vào dịp sale cuối năm của shop, giá đúng tốt, ko uổng công từ Long An chạy lên mua, nv nhiệt tình, có dịp sẽ ủng hộ tiếp', 5, '2020-12-29 00:00:00'),
(29, 9, 1, 'Bên mình có hỗ trợ đổi ram 2x4gb của máy này lên 16gb ko ạ? Nếu có thì giá bn ạ. Xin  cảm ơn', 5, '2020-02-06 00:00:00'),
(30, 9, 2, 'Phân vân giữa Nitro 5 và Victus 16, nhưng cuối cùng chọn HP, dùng qua khá hài lòng, bàn phím led trắng đơn giãn vì mình là người đi làm', 5, '2020-12-16 00:00:00'),
(31, 10, 3, 'Phiên bản 2021 đã được cải tiến thay đổi về bản lề được giấu kín một cách hoàn hảo. Thiết kế mỏng nhẹ, dễ dàng di chuyển, màu sang trọng.', 5, '2020-08-28 00:00:00'),
(32, 10, 4, 'Tốc độ kết nối wifi nhanh, ổn định. Xử lý tác vụ mượt mà.', 5, '2020-08-28 00:00:00'),
(33, 11, 1, 'Tỷ lệ khung hình 16:10 của màn hình mang lại nhiều lợi ích khi sử dụng như đọc tài lại, nhiều không gian dọc hơn, ít phải cuộn xuống hơn.', 5, '2020-07-08 00:00:00'),
(34, 11, 2, 'Thiết kế gọn nhẹ, sang trọng, cấu hình cao, xử lý công việc nhanh chóng.', 5, '2020-08-28 00:00:00'),
(35, 11, 3, 'Pin sử dụng được lâu, sạc Pin nhanh. Bàn phím đánh rất êm và thoải mái.', 5, '2020-08-28 00:00:00'),
(36, 12, 4, 'tuy 17\" nhưng sản phẩm rất mỏng nhẹ, thiết kế đẹp, pin trâu, khá ngon', 5, '2020-07-08 00:00:00'),
(37, 13, 1, 'Thiết kế máy rất đẹp, cầm rất nhẹ tay, pin sử dụng được lâu trên 10 tiếng', 5, '2020-07-08 00:00:00'),
(38, 13, 2, 'Máy xử lý nhanh. Thiết kế đẹp, sang trọng.', 5, '2020-07-15 00:00:00'),
(39, 13, 3, 'tản nhiệt mới Up-Down Air - tản nhiệt theo hai hướng khác nhau, cho phép hiệu suất tuần hoàn nhiệt nhanh hơn, tốt hơn trong thời gian dài sử dụng.', 5, '2020-07-28 00:00:00'),
(40, 13, 4, 'Thiết kế mỏng nhẹ bản lề sẽ được giấu kín sang trọng, đẹp mắt', 5, '2020-07-28 00:00:00'),
(41, 13, 1, 'sạc nhanh, pin sử dụng được lâu', 5, '2020-07-15 00:00:00'),
(42, 14, 2, 'màn hình hiển thị sắc nét, sống động', 5, '2020-07-15 00:00:00'),
(43, 14, 3, 'tản nhiệt theo hai hướng khác nhau tản nhiệt nhanh hơn, tốt hơn trong thời gian dài sử dụng.', 5, '2020-07-15 00:00:00'),
(44, 14, 4, 'sản phẩm thiết kế nhỏ gọn, mỏng, nhẹ, rất phù hợp cho mang vác đi làm việc', 5, '2020-07-08 00:00:00'),
(45, 15, 1, 'laptop nhỏ gọn , dễ dàng bỏ túi và mang đến bất kỳ đâu, tuyệt vời', 5, '2020-07-08 00:00:00'),
(46, 16, 2, 'Shop rất chuyên nghiệp, chu đáo, làm việc cũng nhanh chóng. Máy mình mua dùng thấy chất lượng, bản lề trước khi mua hơi sợ nhưng dùng rồi thì rất thích, màn hình máy đẹp, sáng, màu hiển thị đẹp. Màn hình cảm ứng cũng mượt, hiệu năng ổn. 5 sao cho cả shop và máy.', 5, '2020-12-15 00:00:00'),
(47, 16, 3, 'Sau nhiều so sánh cân nhắc nhu cầu sử dụng với các thương hiệu và kiểu máy, mình quyết định chọn Asus dòng ZenBook flip13. Thật sự hài lòng sau 8 tháng sử dụng. Thật sự ấn tượng với khả năng màn hình gập 180 rất hữu ích trong các cuộc gặp mặt đối tác chia sẽ trình bày thông tin dữ liệu. và thú vị hơn nữa khi mình có thể ký trực tiếp bằng bút cám ứng lên màn hình cho các file words, điều này giúp ích rất nhiều trong giai đoạn giản cách và phải làm việc tại nhà. Trọng lượng thì rất vừa tay dễ di c', 5, '2020-12-29 00:00:00'),
(48, 17, 4, 'Cấu hình khá ngon trong tầm giá, mua về chơi CSGO mượt luôn', 5, '2020-11-23 00:00:00'),
(49, 17, 1, 'máy chạy tốt , mát thật , được vệ sinh máy free', 5, '2020-02-25 00:00:00'),
(50, 17, 2, 'máy xài mướt , lặn lội từ Tây ninh lên mua khá ưng ý , led đẹp', 5, '2020-02-14 00:00:00'),
(51, 17, 3, 'mới dùng 1 tháng quay lại feedback , máy xài mượt , mát lắm , nhân viên tư vấn nhiệt tình', 5, '2020-01-07 00:00:00'),
(52, 19, 4, 'Choi h hỏi bên shop có hỗ trợ nhập lại quà tặng nếu khách ko lấy quà ko v? Nếu có thì giá nhập lại sẽ ntn?', 5, '2020-02-08 00:00:00'),
(53, 19, 1, 'Bây giờ mình mua thì có nhận được quà trong mục \"Quà tặng: Ưu đãi dành cho khách đặt trước\" không?', 5, '2020-09-13 00:00:00'),
(54, 23, 2, 'Giá mua trực tiếp là 19tr990 hay là 18tr490 giống mua onl vậy shop', 5, '2020-01-13 00:00:00'),
(55, 23, 3, 'Shop có thay main con này ko ạ', 5, '2020-02-17 00:00:00'),
(56, 23, 4, 'Khá ung thiết kế đơn giản con này ,xài mượt', 5, '2020-12-04 00:00:00'),
(57, 24, 1, 'Cửa hàng ơi cho hỏi là khi nào mình về bản 17,3 và chạy chip Amd vậy', 5, '2020-01-18 00:00:00'),
(58, 24, 2, 'Bây giờ có hàng chưa vậy shop ?', 5, '2020-02-12 00:00:00'),
(59, 24, 3, 'nitro 5 tiger bản amd 6000 series có hàng ở shop mình chưa v ạ ?', 5, '2020-02-11 00:00:00'),
(60, 24, 4, 'bản này hiện tại store thủ đức có hàng chưa ạ ??', 5, '2020-02-15 00:00:00'),
(61, 24, 1, 'Nitro 5 Tiger chừng nào về hàng ạ , hóng con này quá', 5, '2020-01-18 00:00:00'),
(62, 24, 2, 'Mình muốn mua online nhưng không đặt cọc đc, thì mua máy rồi nhận tiền có được không shop', 5, '2020-02-20 00:00:00'),
(63, 24, 3, 'ad ơi e có đặt cọc , bao lâu về vậy ạ , nôn máy về quá', 5, '2020-02-16 00:00:00'),
(64, 24, 4, 'store thủ đức đã có hàng chưa ạ ?', 5, '2020-02-16 00:00:00'),
(65, 24, 1, 'bản này làm từ nhựa hả shop ', 5, '2020-01-17 00:00:00'),
(66, 25, 2, 'máy cấu hình ổn so với giá thành, ngoại hình đẹp, điểm trừ duy nhất là mặt A và C bám dấu vân tay quá', 5, '2020-01-07 00:00:00'),
(67, 27, 3, 'máy xài ok lắm , nhẹ ', 5, '2020-02-18 00:00:00'),
(68, 27, 4, 'máy đẹp , mua cho em gái dùng khá thích , màu vàng gold nhìn sang lắm', 5, '2020-01-07 00:00:00'),
(69, 28, 1, 'máy xài mượt các ứng dụng vp , bản lề mở thoải mái', 5, '2020-02-22 00:00:00'),
(70, 29, 2, 'Tốt', 5, '2020-03-03 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `state` varchar(255) NOT NULL,
  `total_ship` float NOT NULL,
  `date` datetime NOT NULL,
  `username` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `order_item`
--

CREATE TABLE `order_item` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `price` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_item`
--


-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `product_code` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `cpu` varchar(255) DEFAULT NULL,
  `ram` varchar(255) DEFAULT NULL,
  `gpu` varchar(255) DEFAULT NULL,
  `os` varchar(255) DEFAULT NULL,
  `old_price` float NOT NULL,
  `price` float NOT NULL,
  `screen` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `battery` int(50) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `rating` float NOT NULL,
  `num_reviewer` int(11) NOT NULL,
  `img_cover` varchar(255) NOT NULL,
  `isDisabled` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `name`, `url`, `product_code`, `brand`, `cpu`, `ram`, `gpu`, `os`, `old_price`, `price`, `screen`, `size`, `battery`, `amount`, `description`, `rating`, `num_reviewer`, `img_cover`, `isDisabled`) VALUES
(1, 'Laptop Acer Nitro 5 Eagle AN515-57-54MV', 'https://hangchinhhieu.vn/products/laptop-lg-gram-2021-14zd90p-g-ax51a5-i5-1135g7', '14ZD90P-G.AX51A5', 'ACER', 'Intel Core i5-11400H 2.7GHz up to 4.5GHz 12MB', '4GB DDR4', 'NVIDIA GeForce RTX™ 3050 4GB GDDR6', 'Windows 11 Home', 34.99, 22.49, ' 15.6;#039; FHD (1920 x 1080) IPS, 144Hz, Anti-Glare, 45% NTSC, 65% sRGB', '363.4 x 255 x 23.9 mm', 72, 10, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 5, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax51a5_a2e71f3575f543d8940d22d64592e887_master.png', 0),
(2, 'Laptop LG Gram 2021 16Z90P-G.AH73A5', 'https://hangchinhhieu.vn/products/laptop-lg-gram-2021-16z90p-g-ah73a5-i7-1165g7', '16Z90P-G.AH73A5', 'LG', 'Intel Core i7-1165G7 2.8GHz up to 4.7GHz 12MB', '16GB (8GBx2) LPDDR4X 4266MHz (Onboard)', 'Intel Iris Xe Graphics', 'Windows 10 Home', 49.99, 40.89, '16\" WQXGA (2560 x 1600), 16:10, IPS, DCI-P3 99%', '355.9 x 243.4 x 16.8 mm', 80, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 3, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah73a5_1022f07220d34034b8ca6da3ca669dea_master.png', 0),
(3, 'Laptop LG Gram 2021 17ZD90P-G.AX71A5', 'https://hangchinhhieu.vn/products/laptop-lg-gram-2021-17zd90p-g-ax71a5-i7-1165g7', '17ZD90P-G.AX71A5', 'LG', 'Intel Core i7-1165G7 2.8GHz up to 4.7GHz 12MB', '16GB (8GBx2) LPDDR4X 4266MHz (Onboard)', 'Intel Iris Xe Graphics', NULL, 44.99, 39.99, '17\" WQXGA (2560 x 1600), 16:10, IPS, DCI-P3 99%', '380.2 x 260.1 x 17.8 mm', 80, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 1, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17zd90p-g.ax71a5_40aab526d08649d89764e9934615febd_master.png', 0),
(4, 'Laptop Acer Nitro 5 Eagle AN515-57-54MV', 'https://hangchinhhieu.vn/products/laptop-acer-nitro-5-eagle-an515-57-54mv-i5-11400h', 'AN515-57-54MV', 'ACER', 'Intel Core i5-11400H 2.7GHz up to 4.5GHz 12MB', '4GB DDR4', 'NVIDIA GeForce RTX™ 3050 4GB GDDR6', 'Windows 11 Home', 26.49, 22.49, '15.6\" FHD (1920 x 1080) IPS, 144Hz, Anti-Glare, 45% NTSC, 65% sRGB', '363.4 x 255 x 23.9 mm', 4, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 3, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-54mv-i5-11400h_b20e2a1a86f04fd7ae3921d1a60b1edd_master.png', 0),
(5, 'Laptop Acer Nitro 5 Eagle AN515-57-720A', 'https://hangchinhhieu.vn/products/laptop-acer-nitro-5-eagle-an515-57-720a-i7-11800h', 'AN515-57-720A', 'ACER', 'Intel Core i7-11800H 2.3GHz up to 4.6GHz 24MB', '4GB DDR4', 'NVIDIA GeForce RTX 3050Ti 4GB GDDR6', 'Windows 11 Home', 30.49, 26.99, '15.6\" FHD (1920 x 1080) IPS, 144Hz, Anti-Glare, 45% NTSC, 65% sRGB', '363.4 x 255 x 23.9 mm', 4, 0, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 3, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-720a_ee7399d9507a49219d3da0f9bc3efa84_master.png', 0),
(6, 'Laptop Acer Nitro 5 Eagle AN515-57-5669', 'https://hangchinhhieu.vn/products/laptop-acer-nitro-5-eagle-an515-57-5669-i5-11400h', 'AN515-57-5669', 'ACER', 'Intel Core i5-11400H 2.7GHz up to 4.5GHz 12MB', '4GB DDR4', 'NVIDIA® GeForce GTX™ 1650 4GB GDDR6', 'Windows 11 Home', 23.99, 20.29, '15.6\" FHD (1920 x 1080) IPS, 144Hz, Anti-Glare, 63% sRGB', '363.4 x 255 x 23.9 mm', 4, 3, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 6, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-5669-i5-11400h_c8e0d7d294b14d64aef3bdbeef0f5eb0_master.png', 0),
(7, 'Laptop Acer Nitro 5 AN515-45-R6EV', 'https://hangchinhhieu.vn/products/laptop-acer-nitro-5-an515-45-r6ev-r5-5600h', 'AN515-45-R6EV', 'ACER', 'AMD Ryzen 5 5600H 3.3GHz up to 4.2GHz 16MB', '4GB DDR4', 'NVIDIA GeForce GTX 1650 4GB GDDR6 + AMD Radeon™ Graphics', 'Windows 11 Home', 23.99, 19.99, '15.6\" FHD (1920 x 1080) IPS, 144Hz, Acer ComfyViewTM LED-backlit TFT LCD, 65% sRGB', '363.4 x 255 x 23.9 mm', 4, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 11, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-an515-45-r6ev-r5-5600h_081c5fd05db540dfbfaa4ff3d93c7563_master.png', 0),
(8, 'Laptop MSI Bravo 15 B5DD-276VN', 'https://hangchinhhieu.vn/products/laptop-msi-bravo-15-b5dd-276vn-r5-5600h', 'Bravo 15 B5DD-276VN', 'MSI', 'AMD Ryzen 5 5600H 3.3GHz up to 4.2GHz 16MB', '4GB DDR4', 'AMD Radeon™ RX 5500M 4GB GDDR6 + AMD Radeon™ Graphics', 'Windows 11 Home', 22.49, 17.79, '15.6\" FHD (1920 x 1080) IPS, 60Hz, Thin Bezel, Anti-Glare with 45% NTSC', '359 x 259 x 24.95 mm', 3, 1, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 1, 'https://product.hstatic.net/1000233206/product/msi-bravo-15-b5dd-276vn-r5-5600h_b1f030f36782439e8c7111b0358e695d_master.png', 0),
(9, 'Laptop HP Victus 16-e0177AX', 'https://hangchinhhieu.vn/products/laptop-hp-victus-16-e0177ax-4r0u9pa-r5-5600h', '4R0U9PA', 'HP', 'AMD Ryzen 5 5600H 3.3GHz up to 4.2GHz 16MB', '4GB DDR4', 'NVIDIA GeForce GTX 1650 4GB GDDR6', 'Windows 11 Home', 22.99, 20.49, '16.1\" FHD (1920 x 1080), 144 Hz, IPS, micro-edge, anti-glare, 250 nits, 45% NTSC', '37 x 26 x 2,35 cm', 4, 2, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 4.5, 4, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0177ax-4r0u9pa_ee1239f3c6ab4d768fe53fe30262aab5_master.png', 0),
(10, 'Laptop LG Gram 2021 16ZD90P-G.AX54A5', 'https://hangchinhhieu.vn/products/laptop-lg-gram-2021-16zd90p-g-ax54a5-i5-1135g7', '16ZD90P-G.AX54A5', 'LG', 'Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB', '8GB (4GBx2) LPDDR4X 4266MHz (Onboard)', 'Intel Iris Xe Graphics', NULL, 39.99, 36.99, '16\" WQXGA (2560 x 1600), 16:10, IPS, DCI-P3 99%', '355.9 x 243.4 x 16.8 mm', 80, 0, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 2, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16zd90p-g.ax54a5_a6f0d976a3404efcb3074deef72e42da_master.png', 0),
(11, 'Laptop LG Gram 2021 17Z90P-G.AH76A5', 'https://hangchinhhieu.vn/products/laptop-lg-gram-2021-17z90p-g-ah76a5-i7-1165g7', '17Z90P-G.AH76A5', 'LG', 'Intel Core i7-1165G7 2.8GHz up to 4.7GHz 12MB', '16GB (8GBx2) LPDDR4X 4266MHz (Onboard)', 'Intel Iris Xe Graphics, ', 'Windows 10 Home', 52.99, 43.69, '17\" WQXGA (2560 x 1600), 16:10, IPS, DCI-P3 99%', '380.2 x 260.1 x 17.8 mm', 80, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 3, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah76a5_d3ed2a82c16b40dba4e6bb6f1ba16680_master.png', 0),
(12, 'Laptop LG Gram 2021 17Z90P-G.AH78A5', 'https://hangchinhhieu.vn/products/laptop-lg-gram-2021-17z90p-g-ah78a5-i7-1165g7', '17Z90P-G.AH78A5', 'LG', 'Intel Core i7-1165G7 2.8GHz up to 4.7GHz 12MB', '16GB (8GBx2) LPDDR4X 4266MHz (Onboard)', 'Intel Iris Xe Graphics, ', 'Windows 10 Home', 54.99, 46.89, '17\" WQXGA (2560 x 1600), 16:10, IPS, DCI-P3 99%', '380.2 x 260.1 x 17.8 mm', 80, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 1, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah78a5_380b5307c0ec4c00880473f1008bc26c_master.png', 0),
(13, 'Laptop LG Gram 2021 14Z90P-G.AH75A5', 'https://hangchinhhieu.vn/products/laptop-lg-gram-2021-14z90p-g-ah75a5-i7-1165g7', 'LG Gram 14Z90P-G.AH75A5', 'LG', 'Intel Core i7-1165G7 2.8GHz up to 4.7GHz 12MB', '16GB (8GBx2) LPDDR4X 4266MHz (Onboard)', 'Intel Iris Xe Graphics', 'Windows 10 Home', 47.99, 39.99, '14\" WUXGA (1920x1200), 16:10, IPS, DCI-P3 99%', '313.4 x 215.2 x 16.8 mm', 72, 0, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 6, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_14z90p-g.ah75a5_65b9a5140ca6490db2e77217f0ee142e_master.png', 0),
(14, 'Laptop LG Gram 2021 16Z90P-G.AH75A5', 'https://hangchinhhieu.vn/products/laptop-lg-gram-2021-16z90p-g-ah75a5-i7-1165g7', '16Z90P-G.AH75A5', 'LG', 'Intel Core i7-1165G7 2.8GHz up to 4.7GHz 12MB', '16GB (8GBx2) LPDDR4X 4266MHz (Onboard)', 'Intel Iris Xe Graphics', 'Windows 10 Home', 50.99, 42.89, '16\" WQXGA (2560 x 1600), 16:10, IPS, DCI-P3 99%', '355.9 x 243.4 x 16.8 mm', 80, 0, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 3, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah75a5_2c4cec86ac4b4970910719e71b8440ec_master.png', 0),
(15, 'Laptop LG Gram 2021 14ZD90P-G.AX56A5', 'https://hangchinhhieu.vn/products/laptop-lg-gram-2021-14zd90p-g-ax56a5-i5-1135g7', '14ZD90P-G.AX56A5', 'LG', 'Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB', '16GB (8GBx2) LPDDR4X 4266MHz (Onboard)', 'Intel Iris Xe Graphics', 'FreeDos', 37.99, 34.49, '14\" WUXGA (1920x1200), 16:10, IPS, DCI-P3 99%', '313.4 x 215.2 x 16.8 mm', 72, 1, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 1, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax56a5_514e3b112baa48c88bf7a25c65dec831_master.png', 0),
(16, 'Laptop ASUS ZenBook Flip 13 UX363EA-HP726W', 'https://hangchinhhieu.vn/products/laptop-asus-zenbook-flip-13-ux363ea-hp726w-i5-1135g7', 'UX363EA-HP726W', 'ASUS', 'Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB', '8GB LPDDR4X on board', 'Intel Iris Xe Graphics', 'Windows 11 Home', 27.99, 23.69, '13.3\" OLED FHD (1920 x 1080) 16:9 aspect ratio, 0.2ms response time, 550nits peak brightness, ', '30.5 x 21.1 x 1.19 ~ 1.39 (cm)', 0, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 3, 'https://bizweb.dktcdn.net/thumb/grande/100/372/934/products/asus-zenbook-flip-ux363ea-20317cf6-3abd-43ec-9689-43c9424036e7.jpg', 0),
(17, 'Laptop Acer Nitro 5 Eagle AN515-57-71VV', 'https://hangchinhhieu.vn/products/laptop-acer-nitro-5-eagle-an515-57-71vv-i7-11800h', 'AN515-57-71VV', 'ACER', 'Intel Core i7-11800H 2.3GHz up to 4.6GHz 24MB', '4GB DDR4', 'NVIDIA GeForce RTX 3050 4GB GDDR6', 'Windows 11 Home', 28.99, 25.49, '15.6\" FHD (1920 x 1080) IPS, 144Hz, Anti-Glare, 45% NTSC, 65% sRGB', '363.4 x 255 x 23.9 mm', 4, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 4, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-71vv_4671e13d89574fb99e37db9be1fdd633_master.png', 0),
(18, 'Laptop HP Victus 16-d0204TX', 'https://hangchinhhieu.vn/products/laptop-hp-victus-16-d0204tx-4r0u5pa-i5-11400h', '4R0U5PA', 'HP', 'Intel Core i5-11400H 2.7GHz up to 4.5GHz 12MB', '4GB DDR4', 'NVIDIA GeForce RTX 3050 4GB GDDR6', 'Windows 11 Home', 26.99, 24.49, '16.1\" FHD (1920 x 1080), 144Hz, IPS, micro-edge, Anti-Glare, 250nits, 45% NTSC', '37 x 26 x 2,35 cm', 4, 2, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 0, 0, 'https://product.hstatic.net/1000233206/product/hp-victus-16-d0204tx-4r0u5pa-i5-11400h_db7305379f8341beb100cab8edc07f0d_master.png', 0),
(19, 'Laptop HP Victus 16-e0175AX', 'https://hangchinhhieu.vn/products/laptop-hp-victus-16-e0175ax-4r0u8pa-r5-5600h', '4R0U8PA', 'HP', 'AMD Ryzen 5 5600H 3.3GHz up to 4.2GHz 16MB', '4GB DDR4', 'NVIDIA GeForce RTX 3050 4GB GDDR6', 'Windows 11 Home', 24.49, 20.99, '16.1\" FHD (1920 x 1080), 144 Hz, IPS, micro-edge, anti-glare, 250 nits, 45% NTSC', '37 x 26 x 2,35 cm', 4, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 2, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0175ax-4r0u8pa_48d317e08aea4bd195fe9b0cf09b6610_master.png', 0),
(20, 'Laptop HP Victus 16-e0170AX', 'https://hangchinhhieu.vn/products/laptop-hp-victus-16-e0170ax-4r0u7pa-r7-5800h', '4R0U7PA', 'HP', 'AMD Ryzen 7 5800H 3.2GHz up to 4.4GHz 16MB', '4GB DDR4', 'NVIDIA® GeForce RTX™ 3050 4GB GDDR6', 'Windows 11 Home', 28.19, 25.99, '16.1\" FHD (1920 x 1080), 144Hz, IPS, micro-edge, Anti-Glare, 250nits, 45% NTSC', '37 x 26 x 2,35 cm', 4, 5, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 0, 0, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0170ax-4r0u7pa-r7-5800h_cfd6622f3789416688233bd66f793fbc_master.png', 0),
(21, 'Laptop ASUS ZenBook 14X OLED UM5401QA-KN209W', 'https://hangchinhhieu.vn/products/laptop-asus-zenbook-14x-oled-um5401qa-kn209w-r5-5600h', 'UM5401QA-KN209W', 'ASUS', 'AMD Ryzen 5 5600H 3.3GHz up to 4.2GHz 16MB', '8GB LPDDR4X 4267MHz', 'AMD Radeon™ Graphics', 'Windows 11 Home', 27.99, 23.99, '14\" 2.8K (2880 x 1800) OLED 16:10 aspect ratio, LED Backlit, 0.2ms response time, 90Hz refresh rate, 550nits peak brightness, 100% DCI-P3 color gamut, 1,000,000:1, VESA CERTIFIED Display HDR True Black 500, 1.07 billion colors, PANTONE Validated, Glossy d', '31.12 x 22.11 x 1.59 (cm)', 3, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 0, 0, 'https://product.hstatic.net/1000233206/product/asus-zenbook-14x-oled-um5401qa-kn209w-r5-5600h_a7350e4f7647402bbd95cb12c1543ac8_master.png', 0),
(22, 'Laptop Gigabyte G7 MD-71S1123SO', 'https://hangchinhhieu.vn/products/laptop-gigabyte-g7-md-71s1123so-i7-11800h', 'G7 MD-71S1123SO', 'GIGABYTE', 'Intel Core i7-11800H 2.3GHz up to 4.6GHz 24MB', '4GB DDR4', 'NVIDIA GeForce RTX 3050Ti 4GB GDDR6 Boost Clock 1500 MHz, Maximum Graphics Power 75 W', 'Windows 11 Home', 31.99, 29.99, '17.3\" FHD (1920 x 1080) IPS, Anti-Glare with 72% NTSC, 100% sRGB, 144Hz, 3ms, 300nits', '395 x 262 x 25.9 (mm)', 4, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 0, 0, 'https://product.hstatic.net/1000233206/product/gigabyte-g7-md-71s1123so-i7-11800h_cb0ad385960c47be8628323b89f0c9f9_master.png', 0),
(23, 'Laptop Acer Aspire 7 A715-42G-R4XX', 'https://hangchinhhieu.vn/products/laptop-acer-aspire-7-a715-42g-r4xx-r5-5500u', 'A715-42G-R4XX', 'ACER', 'AMD Ryzen 5-5500U 2.1GHz up to 4.0GHz 8MB', '4GB DDR4', 'NVIDIA GeForce GTX 1650 4GB GDDR6 + AMD Radeon™ Graphics', 'Windows 11 Home', 19.99, 16.99, '15.6\" FHD (1920 x 1080) IPS 60Hz SlimBezel, Acer ComfyView™ IPS LED LCD', '395 x 262 x 25.9 (mm)', 4, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 3, 'https://product.hstatic.net/1000233206/product/acer-aspire-7-a715-42g-r4xx-1_1f63633eb8a048cf817f5f5c7e5a1790_master.png', 0),
(24, 'Laptop Acer Nitro 5 Tiger AN515-58-52SP', 'https://hangchinhhieu.vn/products/laptop-acer-nitro-5-tiger-an515-58-52sp-i5-12500h', 'AN515-58-52SP', 'ACER', 'Intel Core i5-12500H 3.3GHz up to 4.5GHz 18MB', '4GB DDR4', 'NVIDIA GeForce RTX™ 3050 4GB GDDR6', 'Windows 11 Home', 27.99, 25.99, '15.6\" FHD (1920 x 1080) IPS, 144Hz, Acer ComfyView LED-backlit TFT LCD, SlimBezel', '360.4 x 271.09 x 25.9 mm', 4, 3, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 14, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-tiger-an515-58-52sp-i5-12500h_21eec226f57c41a7865fdc18004a57c8_master.png', 0),
(25, 'Laptop ASUS TUF Dash F15 FX516PM-HN002W', 'https://hangchinhhieu.vn/products/laptop-asus-tuf-dash-f15-fx516pm-hn002w-i7-11370h', 'FX516PM-HN002W', 'ASUS', 'Intel Core i7-11370H 3.0GHz up to 4.8GHz 12MB', '4GB DDR4', 'NVIDIA GeForce  RTX™ 3060 6GB GDDR6 With ROG Boost up to 1525MHz at 80W (85W with Dynamic Boost)', 'Windows 11 Home', 32.99, 29.99, '15.6\" FHD (1920 x 1080) 16:9, anti-glare display, 62.5% sRGB, 144Hz, IPS, Adaptive-Sync', '36.0 x 25.2 x 1.99 cm', 4, 2, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 2, 'https://product.hstatic.net/1000233206/product/asus-tuf-dash-f15-fx516pm-hn002w_0f64729a570f4c91a8dc493c9aa264c7_master.png', 0),
(26, 'Laptop Acer Aspire Vero AV15-51R-541C', 'https://hangchinhhieu.vn/products/laptop-acer-aspire-vero-av15-51r-541c-i5-1155g7', 'AV15-51R-541C', 'ACER', 'Intel Core i5-1155G7 2.5GHz up to 4.5GHz 8MB', '4GB DDR4', 'Intel Iris Xe Graphics', 'Windows 11 Home', 99.99, 19.99, '14\" FHD (1920 x 1080) IPS, SlimBezel PCR, ComfyView™ LCD', '363.4 x 238.5 x 17.9 (mm)', 3, 0, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 0, 0, 'https://product.hstatic.net/1000233206/product/acer_aspire_vero_phien_ban_national_geographic_av15-51r-541c_64382f97d7604e02a5cbb3c5d5dc8464_master.png', 0),
(27, 'Laptop Acer Aspire 5 A514-54-59QK', 'https://hangchinhhieu.vn/products/laptop-acer-aspire-5-a514-54-59qk-i5-1135g7', 'A514-54-59QK', 'ACER', 'Intel Core i5-1135G7 2.4GHz up to 4.2GHz 8MB', '4GB DDR4', 'Intel Iris Xe Graphics', 'Windows 11 Home', 99.99, 0, '14\" FHD (1920 x 1080) IPS, Acer ComfyView LCD', '328 x 233 x 17.95 (mm)', 3, 4, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 2, 'https://product.hstatic.net/1000233206/product/acer-aspire-5-a514-54-59qk-i5-1135g7_8aabaa1c8fd34b24b85b2d275f4d55a5_master.png', 0),
(28, 'Laptop Acer Aspire 3 A315-56-38B1', 'https://hangchinhhieu.vn/products/laptop-acer-aspire-3-a315-56-38b1-i3-1005g1', 'A315-56-38B1', 'ACER', 'Intel Core i3-1005G1 1.2GHz up to 3.4GHz 4MB', '4GB DDR4', 'Intel UHD Graphics', 'Windows 11 Home', 12.99, 10.99, '15.6\" FHD (1920 x 1080) Acer ComfyView LCD, Anti-Glare', '363 x 247.5 x 19.9 (mm)', 2, 5, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 1, 'https://product.hstatic.net/1000233206/product/acer-aspire-3-a315-56-38b1-i3-1005g1_8381143191f9431ba8eb33bf3887833b_master.png', 0),
(29, 'Laptop ASUS TUF Gaming F15 FX506LH-HN188W', 'https://hangchinhhieu.vn/products/laptop-asus-tuf-gaming-f15-fx506lh-hn188w-i5-10300h', 'FX506LH-HN188W', 'ASUS', 'Intel Core i5-10300H 2.5GHz up to 4.5GHz 8MB', '4GB DDR4', 'NVIDIA GeForce GTX 1650 4GB GDDR6 + Intel® UHD Graphics', 'Windows 11 Home', 21.99, 18.99, '15.6\" FHD (1920 x 1080) IPS, 144Hz, Wide View, 250nits, Narrow Bezel, Non-Glare with 45% NTSC, 63% sRGB', '35.9 x 25.6 x 2.47 ~ 2.49 cm', 3, 3, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 5, 1, 'https://product.hstatic.net/1000233206/product/asus-tuf-gaming-f15-fx506lh-hn188w-i5-10300h_7b032cec13484888b599410a3cc8b3c7_master.png', 0),
(30, 'Laptop Acer TravelMate B3 TMB311-31-C2HB', 'https://hangchinhhieu.vn/products/laptop-acer-travelmate-b3-tmb311-31-c2hb-c-n4020', 'TMB311-31-C2HB', 'ACER', 'Intel® Celeron® C-N4020 1.1GHz up to 2.8GHz 4MB', '4GB DDR4 2400MHz Onboard', 'Intel® UHD Graphics 605', 'Windows 11 Home', 9.99, 7.99, '11.6\" HD (1366 x 768) Acer ComfyView LED-backlit TFT LCD', '395 x 262 x 25.9 (mm)', 3, 3, 'The metal chassis is built well and houses a comfortable keyboard and touchpad. Ports include USB-C, two USB-A, HDMI, 3.5mm audio, and an SD card reader. Wi-Fi 6 is included, but theres no Thunderbolt due to the AMD platform. Otherwise, this is a beautiful laptop thats available at a great price.', 0, 0, 'https://product.hstatic.net/1000233206/product/acer-travelmate-b3-tmb311-31-c2hb_0982a0fd828f4400b61fe5d86967e9e1_master.png', 0),
(32, 'test', 'tesst', 'test', 'test', 'test', 'test', 'test', 'test', 10, 10, 'test', 'test', 1, 1, 'test', 5, 10, 'test', 0);

-- --------------------------------------------------------

--
-- Table structure for table `product_image`
--

CREATE TABLE `product_image` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_image`
--

INSERT INTO `product_image` (`id`, `product_id`, `url`) VALUES
(1, 1, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax51a5-1_10ebeafae1d64bc5a00168a46e9db5b6_master.png'),
(2, 1, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax51a5-2_28a143359c51479bb89d4252dad842b1_master.png'),
(3, 1, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax51a5-3_03b1f2e7d7ed4fd18e2d52214563128b_master.png'),
(4, 1, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax51a5-4_25d72d460cd84e3983f7acfa138bdc78_master.png'),
(5, 1, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax51a5-5_c445e016edf74fe38a1e71e51df134b7_master.png'),
(6, 1, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax51a5_a2e71f3575f543d8940d22d64592e887_master.png'),
(7, 2, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah73a5-1_8da5c7050bf0484aa0d97b15576b5635_master.png'),
(8, 2, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah73a5-2_4c3d2b1214c5417080bc83a9a4d7e4a1_master.png'),
(9, 2, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah73a5-3_ff25507954dd41d5a4c3677c77d93de5_master.png'),
(10, 2, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah73a5-4_2e805f4b5f6b4cd4be72510dbc729944_master.png'),
(11, 2, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah73a5-5_d83dc6fc22fc42ed87f0c6c4e17718af_master.png'),
(12, 2, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah73a5_1022f07220d34034b8ca6da3ca669dea_master.png'),
(13, 3, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17zd90p-g.ax71a5-1_6e71a7ed27e844b08461082ff0713aec_master.png'),
(14, 3, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17zd90p-g.ax71a5-2_e149592385de466e81e9a70c430d8b79_master.png'),
(15, 3, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17zd90p-g.ax71a5-3_1a05187fe74d4600b2dd41a5e973477b_master.png'),
(16, 3, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17zd90p-g.ax71a5-4_2415f41d0ecd44879698901d6689e36b_master.png'),
(17, 3, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17zd90p-g.ax71a5-5_7839cb46392449ce8c79ab52abdfcb03_master.png'),
(18, 3, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17zd90p-g.ax71a5_40aab526d08649d89764e9934615febd_master.png'),
(19, 4, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-54mv-i5-11400h-1_bb93b3f6f3c546a2be0d8b4bd590470f_master.png'),
(20, 4, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-54mv-i5-11400h-2_986a76db0364476fb5a851ceb8c52530_master.png'),
(21, 4, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-54mv-i5-11400h-3_9245f807a89d49dcbc844f0fa6ae351c_master.png'),
(22, 4, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-54mv-i5-11400h-4_b120d4c2fb47405cb5a7b3a35c12399f_master.png'),
(23, 4, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-54mv-i5-11400h-5_c3c55a10bbd44300a0935a7c4bd37bcc_master.png'),
(24, 4, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-54mv-i5-11400h_b20e2a1a86f04fd7ae3921d1a60b1edd_master.png'),
(25, 5, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-720a-i7-11800h-1_4280e835b3b84ccfa67ef110785ba8f0_master.png'),
(26, 5, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-720a-i7-11800h-2_39329e00d6f14a4b86418e0b5eb1f2af_master.png'),
(27, 5, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-720a-i7-11800h-3_e076d4c6cb9a4fc68cf80e3c876d7ad6_master.png'),
(28, 5, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-720a-i7-11800h-4_62a550a8459444538cb635e110e557c2_master.png'),
(29, 5, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-720a-i7-11800h-5_0dc6b66241dc4194a8d1ee438775f42c_master.png'),
(30, 5, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-720a_ee7399d9507a49219d3da0f9bc3efa84_master.png'),
(31, 6, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-5669-5_f96892c43cfb4ebd9f22d3e8146d31a0_master.png'),
(32, 6, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-5669-i5-11400h-1_9e6ea0e45b214d398e41f927a9d6b4e2_master.png'),
(33, 6, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-5669-i5-11400h-2_0abace3a0e5342c1a11fc2682dc92bf4_master.png'),
(34, 6, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-5669-i5-11400h-3_0a3ab5dfb87648c490ef672ce3edc010_master.png'),
(35, 6, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-5669-i5-11400h-4_b869936750cc49eda27f8fa7754d6821_master.png'),
(36, 6, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-5669-i5-11400h_c8e0d7d294b14d64aef3bdbeef0f5eb0_master.png'),
(37, 7, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-an515-45-r6ev-r5-5600h-1_5684aa5a718e49cc8b2aec39c70180a0_master.png'),
(38, 7, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-an515-45-r6ev-r5-5600h-3_cb1558fcf56b4cad9a14c2167d59a49a_master.png'),
(39, 7, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-an515-45-r6ev-r5-5600h-4_ac4a19048b8d49f39b2768bb903f1b2a_master.png'),
(40, 7, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-an515-45-r6ev-r5-5600h_081c5fd05db540dfbfaa4ff3d93c7563_master.png'),
(41, 7, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-an515-45-r6ev_746d1fcd9db94270bb71085c13ec9b59_master.png'),
(42, 7, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-an515-45-r86d-r7-5800h-3_3bbda66436274ad9ad134d60d72488ec_master.png'),
(43, 8, 'https://product.hstatic.net/1000233206/product/msi-bravo-15-b5dd-276vn-r5-5600h-1_42ac9a732de74a83847dd554efa3cc3d_master.png'),
(44, 8, 'https://product.hstatic.net/1000233206/product/msi-bravo-15-b5dd-276vn-r5-5600h-2_c631fab63ba245b186334ea0b5a873a6_master.png'),
(45, 8, 'https://product.hstatic.net/1000233206/product/msi-bravo-15-b5dd-276vn-r5-5600h-3_437e10b8e7f34ce0914da0eacb55f8f4_master.png'),
(46, 8, 'https://product.hstatic.net/1000233206/product/msi-bravo-15-b5dd-276vn-r5-5600h-4_abdb30960fad4c77a223674b314414c5_master.png'),
(47, 8, 'https://product.hstatic.net/1000233206/product/msi-bravo-15-b5dd-276vn-r5-5600h_b1f030f36782439e8c7111b0358e695d_master.png'),
(48, 9, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0177ax-4r0u9pa-1_39d3f0e0035147de91fc722ee386f0e6_master.png'),
(49, 9, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0177ax-4r0u9pa-2_e9df765db4c34c31b2a9fa8f66e860e9_master.png'),
(50, 9, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0177ax-4r0u9pa-3_61150e35ce83465aa0e7871a14465494_master.png'),
(51, 9, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0177ax-4r0u9pa-4_e24282a2e6f545a09f8212eab6412af8_master.png'),
(52, 9, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0177ax-4r0u9pa_ee1239f3c6ab4d768fe53fe30262aab5_master.png'),
(53, 10, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16zd90p-g.ax54a5-1_9c244279095946fc8d6726897be49985_master.png'),
(54, 10, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16zd90p-g.ax54a5-2_fb2d0d4b706d4a94a0843cf4e8a5eb68_master.png'),
(55, 10, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16zd90p-g.ax54a5-3_da727b5818154dbbb37277455d141bc4_master.png'),
(56, 10, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16zd90p-g.ax54a5-4_1a6ecfe417964c3682348ded968c0981_master.png'),
(57, 10, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16zd90p-g.ax54a5-5_16f2d2c4c56c4c79993591c8dcddd6c3_master.png'),
(58, 10, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16zd90p-g.ax54a5_a6f0d976a3404efcb3074deef72e42da_master.png'),
(59, 11, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah76a5-1_408bf08b044443bf856acdfbaa17f76a_master.png'),
(60, 11, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah76a5-2_81af659c930844c1b53c2da61565c18b_master.png'),
(61, 11, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah76a5-3_a71c014f12904b8cb7ae5a5f4ba5e9ab_master.png'),
(62, 11, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah76a5-4_f32b289c2e04417dbdc4047157d0d79c_master.png'),
(63, 11, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah76a5-5_039bcef84aa34f92a045b27e9f7f9661_master.png'),
(64, 11, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah76a5_d3ed2a82c16b40dba4e6bb6f1ba16680_master.png'),
(65, 12, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah78a5-1_ab0b456777684cf3a37562b2b1f6587b_master.png'),
(66, 12, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah78a5-2_5e2f25644bbf4cfa9c3f908ddc5a0884_master.png'),
(67, 12, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah78a5-3_c221baca5bc84470906c76f8347e54c3_master.png'),
(68, 12, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah78a5-4_13ddec76b22748b295f5512df57b25c8_master.png'),
(69, 12, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah78a5-5_de5242c542c847188f11822d74a153a0_master.png'),
(70, 12, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_17z90p-g.ah78a5_380b5307c0ec4c00880473f1008bc26c_master.png'),
(71, 13, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_14z90p-g.ah75a5-1_1c5a725ec3ff4006b17be20830bc2943_master.png'),
(72, 13, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_14z90p-g.ah75a5-2_18d41c632d464d0ea9658b9c1a7a3476_master.png'),
(73, 13, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_14z90p-g.ah75a5-3_e2d610d9fc8549d4be97556adf5eea31_master.png'),
(74, 13, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_14z90p-g.ah75a5-4_f61182dd23a9423f99af70dc218f3aa0_master.png'),
(75, 13, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_14z90p-g.ah75a5-5_10aef12169ce4453b8711d0d9edfbaaf_master.png'),
(76, 13, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_14z90p-g.ah75a5_65b9a5140ca6490db2e77217f0ee142e_master.png'),
(77, 14, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah75a5-1_c90138c6dbe24d2aa48e96b4a1c45694_master.png'),
(78, 14, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah75a5-2_106385fc399040bd9950c894692647e0_master.png'),
(79, 14, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah75a5-3_e77ddc5ec58940b1a718666d54ae9c86_master.png'),
(80, 14, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah75a5-4_82195ca311464622a76198a68eaf3c01_master.png'),
(81, 14, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah75a5-5_df1d261184a94d348972c1c399424542_master.png'),
(82, 14, 'https://product.hstatic.net/1000233206/product/lg_gram_2021_16z90p-g.ah75a5_2c4cec86ac4b4970910719e71b8440ec_master.png'),
(83, 15, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax56a5-1_2c3c5cd63c944de3ba1782f3ca46b10f_master.png'),
(84, 15, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax56a5-2_51196e372bf7451195e99b359f3642b8_master.png'),
(85, 15, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax56a5-3_38ad150e6fc244f7ae1353b8d7e72300_master.png'),
(86, 15, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax56a5-4_5c35b17cfa4e4009ab4ef7bfb9db04b9_master.png'),
(87, 15, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax56a5-5_9fbbd744809440849ddede15ca43605c_master.png'),
(88, 15, 'https://product.hstatic.net/1000233206/product/lg-gram-2021-14zd90p-g-ax56a5_514e3b112baa48c88bf7a25c65dec831_master.png'),
(89, 16, 'https://product.hstatic.net/1000233206/product/asus-zenbook-flip-13-ux363ea-hp726w-1_2f3489bc011d4432a2b90fe3eaccf88f_master.png'),
(90, 16, 'https://product.hstatic.net/1000233206/product/asus-zenbook-flip-13-ux363ea-hp726w-2_ff40bfc95e804b45a09f425ed36d463c_master.png'),
(91, 16, 'https://product.hstatic.net/1000233206/product/asus-zenbook-flip-13-ux363ea-hp726w-3_3d57a6d558464733828f487b40f342e3_master.png'),
(92, 16, 'https://product.hstatic.net/1000233206/product/asus-zenbook-flip-13-ux363ea-hp726w-4_acca1bc1a3aa42688d9039ba562750fe_master.png'),
(93, 16, 'https://product.hstatic.net/1000233206/product/asus-zenbook-flip-13-ux363ea-hp726w-5_e33df0c7b23a416cb2d6e9e189a5c4ee_master.png'),
(94, 16, 'https://product.hstatic.net/1000233206/product/asus-zenbook-flip-13-ux363ea-hp726w-6_167d2c53105a4ec6a51bb5c4670a668f_master.png'),
(95, 16, 'https://product.hstatic.net/1000233206/product/asus-zenbook-flip-13-ux363ea-hp726w-7_47298bc61dc341ee80a121f1363f1fa9_master.png'),
(96, 16, 'https://product.hstatic.net/1000233206/product/asus-zenbook-flip-13-ux363ea-hp726w-8_0f72e0eadd20455e99c86f85e9400425_master.png'),
(98, 17, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-71vv-i7-11800h-1_91517bdc672c47ada270941d0735e381_master.png'),
(99, 17, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-71vv-i7-11800h-2_13c4d0d1bee94ae28d5bea2350c2be64_master.png'),
(100, 17, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-71vv-i7-11800h-3_565a11c6ceca4bd8ba2416c3a34c817f_master.png'),
(101, 17, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-71vv-i7-11800h-4_3e8960a28501477fb4537423ff2e3af5_master.png'),
(102, 17, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-71vv-i7-11800h-5_25d5b9f7858f42419c9786083b104609_master.png'),
(103, 17, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-eagle-an515-57-71vv_4671e13d89574fb99e37db9be1fdd633_master.png'),
(104, 18, 'https://product.hstatic.net/1000233206/product/hp-victus-16-d0204tx-4r0u5pa-i5-11400h-1_d01c1d03bd29466e8d523a15a8a90208_master.png'),
(105, 18, 'https://product.hstatic.net/1000233206/product/hp-victus-16-d0204tx-4r0u5pa-i5-11400h-2_c4c34385a9cf4a8199de591ead0538e4_master.png'),
(106, 18, 'https://product.hstatic.net/1000233206/product/hp-victus-16-d0204tx-4r0u5pa-i5-11400h-3_7afdcb7a448a4b84984e6a4ef4d757c6_master.png'),
(107, 18, 'https://product.hstatic.net/1000233206/product/hp-victus-16-d0204tx-4r0u5pa-i5-11400h-4_1d1a5e5537a74cb1970c83196ee12dc5_master.png'),
(108, 18, 'https://product.hstatic.net/1000233206/product/hp-victus-16-d0204tx-4r0u5pa-i5-11400h_db7305379f8341beb100cab8edc07f0d_master.png'),
(109, 19, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0175ax-4r0u8pa-1_f8c6cd3680714516a26869f50c1d26c1_master.png'),
(110, 19, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0175ax-4r0u8pa-2_8b847cdd8e1c4f43bc1173b2f819429e_master.png'),
(111, 19, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0175ax-4r0u8pa-3_fe1004b64bfd40a79b21c3c332b8cd75_master.png'),
(112, 19, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0175ax-4r0u8pa-4_6aeceb60ea3c4db4b9e0d213239c3053_master.png'),
(113, 19, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0175ax-4r0u8pa_48d317e08aea4bd195fe9b0cf09b6610_master.png'),
(114, 20, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0170ax-4r0u7pa-r7-5800h-1_d26bfc8b9ec94af99bed5259a27f9cbd_master.png'),
(115, 20, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0170ax-4r0u7pa-r7-5800h-2_a9bea9056fd94a4ca7067dc78ba2df29_master.png'),
(116, 20, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0170ax-4r0u7pa-r7-5800h-3_1798af1ec8354520b7b65df305bdf6a7_master.png'),
(117, 20, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0170ax-4r0u7pa-r7-5800h-4_8227883dd9fb4ced940bcc64ed35c2c8_master.png'),
(118, 20, 'https://product.hstatic.net/1000233206/product/hp-victus-16-e0170ax-4r0u7pa-r7-5800h_cfd6622f3789416688233bd66f793fbc_master.png'),
(119, 21, 'https://product.hstatic.net/1000233206/product/asus-zenbook-14x-oled-um5401qa-kn209w-r5-5600h-1_fffc4a6a84284dc98039ea610dacdd95_master.png'),
(120, 21, 'https://product.hstatic.net/1000233206/product/asus-zenbook-14x-oled-um5401qa-kn209w-r5-5600h-2_e1dc4c33c570489a88a29c3d6c868606_master.png'),
(121, 21, 'https://product.hstatic.net/1000233206/product/asus-zenbook-14x-oled-um5401qa-kn209w-r5-5600h-3_fdd5e8a3255d461f8cf28bf925738110_master.png'),
(122, 21, 'https://product.hstatic.net/1000233206/product/asus-zenbook-14x-oled-um5401qa-kn209w-r5-5600h-4_2957c8c9ee184289802cc3e232fc5da0_master.png'),
(123, 21, 'https://product.hstatic.net/1000233206/product/asus-zenbook-14x-oled-um5401qa-kn209w-r5-5600h_a7350e4f7647402bbd95cb12c1543ac8_master.png'),
(124, 22, 'https://product.hstatic.net/1000233206/product/gigabyte-g7-md-71s1123so-i7-11800h-1_cc3268a84c65403f8495c6019fbd9139_master.png'),
(125, 22, 'https://product.hstatic.net/1000233206/product/gigabyte-g7-md-71s1123so-i7-11800h-2_a486efd9d0124f03a84685d594eee4a5_master.png'),
(126, 22, 'https://product.hstatic.net/1000233206/product/gigabyte-g7-md-71s1123so-i7-11800h-3_cdc522bf689f4b68889c9b770dbca9eb_master.png'),
(127, 22, 'https://product.hstatic.net/1000233206/product/gigabyte-g7-md-71s1123so-i7-11800h_cb0ad385960c47be8628323b89f0c9f9_master.png'),
(128, 23, 'https://product.hstatic.net/1000233206/product/acer-aspire-7-a715-42g-r4xx-1_1f63633eb8a048cf817f5f5c7e5a1790_master.png'),
(129, 23, 'https://product.hstatic.net/1000233206/product/acer-aspire-7-a715-42g-r4xx-2_f6c8d99710e6470c919f8b8189d3a96c_master.png'),
(130, 23, 'https://product.hstatic.net/1000233206/product/acer-aspire-7-a715-42g-r4xx-3_f546f04afb8341518832e7b6f93c5410_master.png'),
(131, 23, 'https://product.hstatic.net/1000233206/product/acer-aspire-7-a715-42g-r4xx-4_8d349adff2f64e0db07bfc46da828602_master.png'),
(132, 23, 'https://product.hstatic.net/1000233206/product/acer-aspire-7-a715-42g-r4xx-5_b1532f6b4893432dbaffdf6e770c7f24_master.png'),
(133, 24, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-tiger-an515-58-52sp-i5-12500h-1_495cc96deb4a422486449aa2dd6a4499_master.png'),
(134, 24, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-tiger-an515-58-52sp-i5-12500h-2_1246b1da48a74ec5bb334ba865736f22_master.png'),
(135, 24, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-tiger-an515-58-52sp-i5-12500h-3_5bec7e6f7d614e22bc068cded6d505ea_master.png'),
(136, 24, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-tiger-an515-58-52sp-i5-12500h-4_64179678a2954c9e8cea64ec72945b3c_master.png'),
(137, 24, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-tiger-an515-58-52sp-i5-12500h-5_ebfe2769ba0040c59929f58641d85409_master.png'),
(138, 24, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-tiger-an515-58-52sp-i5-12500h-6_89e3c50335064d65b15e572f95612ed0_master.png'),
(139, 24, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-tiger-an515-58-52sp-i5-12500h-7_8eb671b00815405fb9b89d57fd75fcdb_master.png'),
(140, 24, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-tiger-an515-58-52sp-i5-12500h-8_e51e5cb6b4a84512b0be18cd1b491642_master.png'),
(141, 24, 'https://product.hstatic.net/1000233206/product/acer-nitro-5-tiger-an515-58-52sp-i5-12500h_21eec226f57c41a7865fdc18004a57c8_master.png'),
(142, 25, 'https://product.hstatic.net/1000233206/product/asus-tuf-dash-f15-fx516pm-hn002w-1_9441d30c24b948edb9353713e6a735b5_master.png'),
(143, 25, 'https://product.hstatic.net/1000233206/product/asus-tuf-dash-f15-fx516pm-hn002w-2_a7f89524d3044a4bb41e91fe39246e60_master.png'),
(144, 25, 'https://product.hstatic.net/1000233206/product/asus-tuf-dash-f15-fx516pm-hn002w-3_f981f413a2d6413db0debeca26165929_master.png'),
(145, 25, 'https://product.hstatic.net/1000233206/product/asus-tuf-dash-f15-fx516pm-hn002w-4_f5bf5ad165a840efb6bfd4bfa6eb9637_master.png'),
(146, 25, 'https://product.hstatic.net/1000233206/product/asus-tuf-dash-f15-fx516pm-hn002w-5_b4c59bdb99054650b155d34edffbf475_master.png'),
(147, 25, 'https://product.hstatic.net/1000233206/product/asus-tuf-dash-f15-fx516pm-hn002w-6_26f92251029e40249df817245cf753b8_master.png'),
(148, 25, 'https://product.hstatic.net/1000233206/product/asus-tuf-dash-f15-fx516pm-hn002w_0f64729a570f4c91a8dc493c9aa264c7_master.png'),
(149, 26, 'https://product.hstatic.net/1000233206/product/acer_aspire_vero_phien_ban_national_geographic_av15-51r-541c-1_f4d4aa32e27d4370b156530bd22ba585_master.png'),
(150, 26, 'https://product.hstatic.net/1000233206/product/acer_aspire_vero_phien_ban_national_geographic_av15-51r-541c-2_0d47741d22d643fb868e77185dd73d06_master.png'),
(151, 26, 'https://product.hstatic.net/1000233206/product/acer_aspire_vero_phien_ban_national_geographic_av15-51r-541c-3_938d438fa1d8430bb218f332d5271da9_master.png'),
(152, 26, 'https://product.hstatic.net/1000233206/product/acer_aspire_vero_phien_ban_national_geographic_av15-51r-541c-4_79648e994f68475384b3f08087117dc1_master.png'),
(153, 26, 'https://product.hstatic.net/1000233206/product/acer_aspire_vero_phien_ban_national_geographic_av15-51r-541c-5_c4b1f983e4a7486984ee51194676fe21_master.png'),
(154, 26, 'https://product.hstatic.net/1000233206/product/acer_aspire_vero_phien_ban_national_geographic_av15-51r-541c-6_4779a4a4e16641c4adf3611f27f425ff_master.png'),
(155, 26, 'https://product.hstatic.net/1000233206/product/acer_aspire_vero_phien_ban_national_geographic_av15-51r-541c-7_cb10d014e45e49ea8739a429de60d699_master.png'),
(156, 26, 'https://product.hstatic.net/1000233206/product/acer_aspire_vero_phien_ban_national_geographic_av15-51r-541c-8_6de57eedef724ddba9fd6ff306655f28_master.png'),
(157, 26, 'https://product.hstatic.net/1000233206/product/acer_aspire_vero_phien_ban_national_geographic_av15-51r-541c_64382f97d7604e02a5cbb3c5d5dc8464_master.png'),
(158, 27, 'https://product.hstatic.net/1000233206/product/acer-aspire-5-a514-54-59qk-i5-1135g7-1_2b13350a5f8344bf853f4fa3006a8085_master.png'),
(159, 27, 'https://product.hstatic.net/1000233206/product/acer-aspire-5-a514-54-59qk-i5-1135g7-2_d892b311f3cb4e72a025e011a48b5244_master.png'),
(160, 27, 'https://product.hstatic.net/1000233206/product/acer-aspire-5-a514-54-59qk-i5-1135g7-3_1e96c772068141b888d20f023017ae30_master.png'),
(161, 27, 'https://product.hstatic.net/1000233206/product/acer-aspire-5-a514-54-59qk-i5-1135g7-4_bbcc7ea6ed054998baee7518c26a348f_master.png'),
(162, 27, 'https://product.hstatic.net/1000233206/product/acer-aspire-5-a514-54-59qk-i5-1135g7-5_0cb7dc73616d44999ae414422df70e03_master.png'),
(163, 27, 'https://product.hstatic.net/1000233206/product/acer-aspire-5-a514-54-59qk-i5-1135g7-6_0c4502f27d564cf98a5b3d762492bbfb_master.png'),
(164, 27, 'https://product.hstatic.net/1000233206/product/acer-aspire-5-a514-54-59qk-i5-1135g7-7_6d54846af2334d929e76e42d48c41328_master.png'),
(165, 27, 'https://product.hstatic.net/1000233206/product/acer-aspire-5-a514-54-59qk-i5-1135g7_8aabaa1c8fd34b24b85b2d275f4d55a5_master.png'),
(166, 28, 'https://product.hstatic.net/1000233206/product/acer-aspire-3-a315-56-38b1-i3-1005g1-2_19605d11526f44368e297b62d799ea90_master.png'),
(167, 28, 'https://product.hstatic.net/1000233206/product/acer-aspire-3-a315-56-38b1-i3-1005g1-3_bd2db4787afa470ba264069da38e000d_master.png'),
(168, 28, 'https://product.hstatic.net/1000233206/product/acer-aspire-3-a315-56-38b1-i3-1005g1-4_373087c239774402a6329608eee21bf5_master.png'),
(169, 28, 'https://product.hstatic.net/1000233206/product/acer-aspire-3-a315-56-38b1-i3-1005g1-5_979634d3e3f34c70b39a7040b08ca791_master.png'),
(170, 28, 'https://product.hstatic.net/1000233206/product/acer-aspire-3-a315-56-38b1-i3-1005g1_8381143191f9431ba8eb33bf3887833b_master.png'),
(171, 29, 'https://product.hstatic.net/1000233206/product/asus-tuf-gaming-f15-fx506lh-hn188w-i5-10300h-1_e6fab1ea39334ef2a506dba9992f0680_master.png'),
(172, 29, 'https://product.hstatic.net/1000233206/product/asus-tuf-gaming-f15-fx506lh-hn188w-i5-10300h-2_edb17c6aa4974178b2607360d5eaa2ee_master.png'),
(173, 29, 'https://product.hstatic.net/1000233206/product/asus-tuf-gaming-f15-fx506lh-hn188w-i5-10300h-3_de67f8d09dd7491095dc947e384a6d7f_master.png'),
(174, 29, 'https://product.hstatic.net/1000233206/product/asus-tuf-gaming-f15-fx506lh-hn188w-i5-10300h-4_b007991c1a1d45bda60db3cf8214b6ee_master.png'),
(175, 29, 'https://product.hstatic.net/1000233206/product/asus-tuf-gaming-f15-fx506lh-hn188w-i5-10300h-5_fa9e5ef9e776452d85aa2b3626c81a60_master.png'),
(176, 29, 'https://product.hstatic.net/1000233206/product/asus-tuf-gaming-f15-fx506lh-hn188w-i5-10300h-6_fd9202b0ba03407cb479e9be048b4638_master.png'),
(177, 29, 'https://product.hstatic.net/1000233206/product/asus-tuf-gaming-f15-fx506lh-hn188w-i5-10300h_7b032cec13484888b599410a3cc8b3c7_master.png'),
(178, 30, 'https://product.hstatic.net/1000233206/product/acer-travelmate-b3-tmb311-31-c2hb-1_517e28121f9944af875175eeece50ae9_master.png'),
(179, 30, 'https://product.hstatic.net/1000233206/product/acer-travelmate-b3-tmb311-31-c2hb-2_fb32b9a4205a4e4898675b0ff5bc5990_master.png'),
(180, 30, 'https://product.hstatic.net/1000233206/product/acer-travelmate-b3-tmb311-31-c2hb-3_04cdbcc926d044b6ad75b588033abf97_master.png'),
(181, 30, 'https://product.hstatic.net/1000233206/product/acer-travelmate-b3-tmb311-31-c2hb-4_b6e9b66eb6af48639820caccbb9f0743_master.png'),
(182, 30, 'https://product.hstatic.net/1000233206/product/acer-travelmate-b3-tmb311-31-c2hb-5_33325b80880f4256b7768ddc109bd20f_master.png'),
(183, 30, 'https://product.hstatic.net/1000233206/product/acer-travelmate-b3-tmb311-31-c2hb_0982a0fd828f4400b61fe5d86967e9e1_master.png'),
(184, 30, 'https://product.hstatic.net/1000233206/product/acer-travelmate-b3-tmb311-31-c2hb_ab87fdffd34049a1b700722f1fa51ba4_master.png'),
(185, 32, 'test'),
(186, 32, 'test2'),
(187, 32, 'test3'),
(188, 32, 'test3'),
(190, 1, 'http://res.cloudinary.com/dd8b69mls/image/upload/v1654164360/wzfnacxqq6rvnclmlnxu.jpg'),
(191, 1, 'http://res.cloudinary.com/dd8b69mls/image/upload/v1654164392/tpr6qr38hcxqrdyjsglu.jpg'),
(192, 1, 'http://res.cloudinary.com/dd8b69mls/image/upload/v1654164439/prkk9yjvyvcgv4ti8z3w.png'),
(193, 1, 'http://res.cloudinary.com/dd8b69mls/image/upload/v1654171543/jq6ztjvsqcijtdnrnobr.jpg'),
(195, 1, 'http://res.cloudinary.com/dd8b69mls/image/upload/v1654171846/dtndg4nhtkslzyamsc1q.jpg');


--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`user_id`,`product_id`),
  ADD KEY `cart_ibfk_2` (`product_id`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_item`
--
ALTER TABLE `order_item`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `order_item_ibfk_2` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `product_code` (`product_code`);

--
-- Indexes for table `product_image`
--
ALTER TABLE `product_image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_image_ibfk_1` (`product_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `product_image`
--
ALTER TABLE `product_image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `order_item`
--
ALTER TABLE `order_item`
  ADD CONSTRAINT `order_item_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `product_image`
--
ALTER TABLE `product_image`
  ADD CONSTRAINT `product_image_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
