-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 01-11-2022 a las 11:28:11
-- Versión del servidor: 5.6.51-cll-lve
-- Versión de PHP: 7.3.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aguilera_dbtransporte`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_personal_clientes`
--

CREATE TABLE `cat_personal_clientes` (
  `idreg` int(11) NOT NULL,
  `codigo_cliente` varchar(12) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre_solicitante` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono_solicitante` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `numero_nomina` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `ubicacion` geometry NOT NULL,
  `alias_lugar` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `domicilio` varchar(200) COLLATE utf8_spanish2_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `cat_personal_clientes`
--

INSERT INTO `cat_personal_clientes` (`idreg`, `codigo_cliente`, `nombre_solicitante`, `telefono_solicitante`, `numero_nomina`, `ubicacion`, `alias_lugar`, `domicilio`) VALUES
(10, 'VsBLnr37eNb1', 'DIANA HERRADA', '4491011390', '1', 0x0000000001010000004d77e805e99359c060a8685144df3540, 'HOTEL POSADA LA FUENTE', 'AV. CONVENCION DE 1914 PTE #1117'),
(11, 'VsBLnr37eNb1', 'ANGELICA GUERRERO', '4491011390', '2', 0x0000000001010000001839b0c1e79359c03073709f0be53540, 'INTERCERAMIC', 'AV. CONVENCION DE 1914 PTE #2013 MIRAVALLE'),
(12, 'VsBLnr37eNb1', 'MIRIAM', '4491011390', '3', 0x000000000101000000ceb2ddf3b29259c0455156c2c9e63540, 'CC ROMO', 'AGUASCALIENTES - SAN FCO DE LOS ROMOS , MORELOS'),
(13, 'VsBLnr37eNb1', 'ROGELIO', '4491011390', '4', 0x000000000101000000ceb2ddf3b29259c0455156c2c9e63540, 'CC ROMO', 'AGUASCALIENTES - SAN FCO DE LOS ROMOS , MORELOS'),
(14, 'VsBLnr37eNb1', 'REBECA', '4491011390', '5', 0x000000000101000000e0281ebc9b9259c09d2f5118efee3540, 'GASERA DURA GAS', 'BULEVARD A ZAC KM 6.5'),
(15, 'VsBLnr37eNb1', 'ALEJANDRO', '4491011390', '6', 0x000000000101000000e828acf9969259c01e58e949f4f13540, 'SALIDA ZAC ESQ 3ER ANILLO', 'SALDA ZAC ESQ 3ER ANILLO'),
(16, 'VsBLnr37eNb1', 'SAHIRA', '4491011390', '7', 0x000000000101000000719ea003818f59c00aeaa5738f003640, 'LORETITO', 'VENUSTIANO CARRANZA ESQ BENITO JUAREZ'),
(35, '0jA48CcnBavR', 'CECY', '4491011390', '1', 0x000000000101000000bc9e9e2dd69359c0214e716605da3540, 'INSURGENTES', 'AV CONVENCION ESQ EUGENIO AGUIRRE EN EL OXXO'),
(36, '0jA48CcnBavR', 'ADLAY', '4491011390', '2', 0x000000000101000000bc9e9e2dd69359c0214e716605da3540, 'INSURGENTES', 'AV CONVENCION ESQ EUGENIO AGUIRRE EN EL OXXO'),
(37, '0jA48CcnBavR', 'RENE', '4491011390', '3', 0x000000000101000000a7f397cce79259c0e6b22cf3b1e43540, 'INDUSTRIAL', 'NORBERTO GOMEZ ESQ INDEPENDENCIA EN EL OXXO'),
(38, '0jA48CcnBavR', 'ANGELA', '4491011390', '4', 0x0000000001010000001c599eacbd8f59c04d6c996780e83540, 'MIRADORES', 'CULTURA OTOMI ESQ CULTURA CHICHIMECA'),
(39, '0jA48CcnBavR', 'MONY', '4491011390', '5', 0x000000000101000000000080ad2c7acec1309287cfe7d73540, 'LOMAS DE VISTA BELLA', 'VISTA DE LAS ESTRELLAS ESQ AJEDREVISTAS'),
(40, 'DvGGyH4sVtxX', 'ALBERTO NIÑO', '4491011390', '1', 0x000000000101000000bc9e9e2dd69359c0214e716605da3540, 'INSURGENTES', 'AV CONVENCION ESQ EUGENIO AGUIRRE EN EL OXXO'),
(41, 'DvGGyH4sVtxX', 'MARTHA', '4491011390', '2', 0x0000000001010000002ed85768319359c0ddc6b0d4c4d83540, 'PILAR BLANCO', 'ESCUELA PRIMARIA QUETZALCOATL'),
(42, 'DvGGyH4sVtxX', 'NATALIA', '4491011390', '3', 0x00000000010100000093ce763b319059c0638dc41561d83540, 'LOMAS DEL AJEDRES', 'DIAGONAL ADFIL ESQ DEL REY EN EL TEMPLO'),
(43, 'DiMR8Y7duiIh', 'EDUARDO', '4491011390', '1', 0x00000000010100000058a8da13499559c0d3e92faafbe03540, 'SALEDAD', 'MELAQUE 210'),
(44, 'DiMR8Y7duiIh', 'JONATHAN', '4491011390', '2', 0x00000000010100000035eb3136999359c04464fd0ba9dd3540, 'SANTA ELANA', 'MONTE VIDEO 311'),
(45, 'DiMR8Y7duiIh', 'HUGO', '4491011390', '3', 0x00000000010100000007962364a09159c0e2067c7e18db3540, 'CASA BLANCA', 'CASA BLANCA 808'),
(55, 'NxuCYCYhr1qo', 'BONILLA NERI OSWALDO', '4491234567', '105031', 0x000000000101000000389c033c3e9359c022ac92010af83540, 'PASEOS DE AGUASCALIENTES ', 'PASEOS DE LA PUNTA, ESQUINA PASEOS DE AGUASCALIENTES'),
(56, 'NxuCYCYhr1qo', 'LOPEZ RUVALCAVA OSCAR', '4491234567', '118600', 0x00000000010100000087f4d1667b9359c04fa5d04c96e33540, 'COL DEL CARMEN ', 'AV FUNDICION ESQ ALAMAN'),
(57, 'NxuCYCYhr1qo', 'PALACIOS REYES JOSE', '4491234567', '101875', 0x000000000101000000604330b5999059c010d01010a8e43540, 'FIDEL VELAZQUEZ', 'ENTRADA EN CAMION SOLO SALIDA'),
(58, 'NxuCYCYhr1qo', 'RAMIREZ TENORIO JOSE', '4491234567', '103627', 0x00000000010100000094741cd75d9059c0f8241800c6dc3540, 'INFONAVIT MORELOS', 'ENTRADA EN CAMION SOLO SALIDA'),
(59, 'NxuCYCYhr1qo', 'MORENO ASUNA URBANO', '4491234567', '144134', 0x0000000001010000000fd62384948e59c06c09b7b489e13540, 'AMBROSIA', 'ARCOS DE VILLAS DE LAS NORIAS'),
(60, 'NxuCYCYhr1qo', 'LOERA DE AVILA JOSE', '4491234567', '104501', 0x0000000001010000005abd23daa78e59c0e8a0a09960e13540, 'VILLA DE LAS NORIAS ', 'ARCOS DE VILLAS DE LAS NORIAS'),
(61, 'NxuCYCYhr1qo', 'MTZ RODRIGUEZ EDGAR', '4491234567', '104479', 0x00000000010100000062e92366858e59c0a3df3c2594e13540, 'VILLA DE LAS NORIAS', 'ARCOS DE VILLAS DE LAS NORIAS'),
(62, 'NxuCYCYhr1qo', 'SANTOYO CORPUS LUIS', '4491234567', '164692', 0x0000000001010000007d4598a0109059c00820041d22e33540, 'HACIENDAS DE AGUASCALIENTES ', 'ENTRADA EN CAMION SOLO SALIDA'),
(63, 'NxuCYCYhr1qo', 'RANGEL REGALADO JOSE', '4491234567', '104236', 0x00000000010100000063d8af9e6c8f59c0d2d485cf3de53540, 'VISTAS DE LAS CUMBRES', 'EN EL OXXO DE TERRANOVA');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `idreg` int(11) NOT NULL,
  `codigo_cliente` varchar(12) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre_empresa` varchar(300) COLLATE utf8_spanish2_ci NOT NULL,
  `nombre_titular` varchar(250) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `domicilio` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `usuario_acceso` varchar(30) COLLATE utf8_spanish2_ci NOT NULL,
  `contrasena` varchar(100) COLLATE utf8_spanish2_ci NOT NULL,
  `eliminado` tinyint(4) NOT NULL DEFAULT '0',
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idreg`, `codigo_cliente`, `nombre_empresa`, `nombre_titular`, `telefono`, `domicilio`, `usuario_acceso`, `contrasena`, `eliminado`, `fecha_registro`) VALUES
(1, 'bGt5Y6uJz9Lk', 'Empresa Demo', 'Juan Pérez', '4491234567', 'Av. Lopez Mateos No. 123-A Zona Centro', 'edemo', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2020-06-17 13:40:29'),
(2, '3hRfnGqAfJE5', 'GEOM', 'David Gomez', '4498789098', 'Lopez Mateos', 'geom', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2022-06-15 06:28:30'),
(3, 'M7FGJ7be1r9T', 'NISSAN 1', 'Ricardo Villa', '5559093445', 'Nissan', 'RICARDO.VILLA', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2022-06-15 08:16:26'),
(4, 'y7yjzKSuLV0v', 'SANOH', 'Areli Trancoso', '4495528900', 'Cto Aguascalientes Oriente, No. 130 PIVA', 'S001', '81dc9bdb52d04dc20036dbd8313ed055', 0, '2022-06-15 09:28:39'),
(5, '0jA48CcnBavR', 'FORMELD QCC', 'Veronica Guzman', '8442774989', 'Av Aguascalientes Sur 2729, Col, Jardines de las Fuentes, 20278 Aguascalientes, Ags.', 'FV001', 'd41d8cd98f00b204e9800998ecf8427e', 0, '2022-06-15 09:30:58'),
(6, '1Yt57gdWQoUh', 'FORMELD VESTA', 'Veronica Guzman', '2228129335', 'Av Aguascalientes Sur 2729, Col, Jardines de las Fuentes, 20278 Aguascalientes, Ags.', 'FO001', 'd41d8cd98f00b204e9800998ecf8427e', 0, '2022-06-15 09:31:50'),
(7, 'DvGGyH4sVtxX', 'FORMELD CONTINENTAL', 'Josue  ', '2228129335', 'Av Aguascalientes Sur 2729, Col, Jardines de las Fuentes, 20278 Aguascalientes, Ags.', 'FO001', '81dc9bdb52d04dc20036dbd8313ed055', 0, '2022-06-15 09:32:52'),
(8, 'DiMR8Y7duiIh', 'FORMELD DAIMLER', 'Omar Lujan', '2228129335', 'Av Aguascalientes Sur 2729, Col, Jardines de las Fuentes, 20278 Aguascalientes, Ags.', 'FO001', 'd41d8cd98f00b204e9800998ecf8427e', 0, '2022-06-15 09:33:40'),
(9, 'hPDMgbECbQcu', 'MASWER VESTA', 'Mariana Maldonado', '2224367007', 'Carretera Panamericana Sur Km. 11 Ejido, 20349 Peñuelas, Ags.', 'MM001', 'd41d8cd98f00b204e9800998ecf8427e', 0, '2022-06-15 09:35:50'),
(10, 'ac7e8I7UGPRY', 'MASWER HARMAN', 'Mariana Maldonado', '2224367907', 'Carretera Panamericana Sur Km. 11 Ejido, 20349 Peñuelas, Ags.', 'MM001', 'd41d8cd98f00b204e9800998ecf8427e', 0, '2022-06-15 09:36:21'),
(11, 'VsBLnr37eNb1', 'BARTLETT', 'REBECA', '4493521592', '', 'BARTLETT1', '81dc9bdb52d04dc20036dbd8313ed055', 0, '2022-08-12 09:39:50'),
(12, 'eBAjDWTToL0d', 'GEOM', 'Luis Felipe Campos Romo', '4498908934', 'Lopez Mateos', 'geom', '81dc9bdb52d04dc20036dbd8313ed055', 0, '2022-09-05 09:21:25'),
(13, 'NxuCYCYhr1qo', 'NIKE', 'Jorge Gonzalez', '23456', 'Av. Lopez Mateos', 'nike', '81dc9bdb52d04dc20036dbd8313ed055', 0, '2022-10-20 08:07:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `conductor`
--

CREATE TABLE `conductor` (
  `idreg` int(11) NOT NULL,
  `codigo_conductor` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `nombres` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `apellidos` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `correo_electronico` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `contrasena` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `descripcion_vehiculo` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `placas_vehiculo` varchar(10) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fecha_licencia` date NOT NULL COMMENT 'fecha de vencimiento de licencia del conductor',
  `fecha_movilidad` date NOT NULL COMMENT 'fecha de vencimiento de registro de movilidad',
  `fecha_poliza` date NOT NULL COMMENT 'fecha de vencimiento de la poliza de seguro',
  `estatus` tinyint(4) NOT NULL DEFAULT '1',
  `player_id` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `conductor`
--

INSERT INTO `conductor` (`idreg`, `codigo_conductor`, `nombres`, `apellidos`, `telefono`, `correo_electronico`, `contrasena`, `descripcion_vehiculo`, `placas_vehiculo`, `fecha_licencia`, `fecha_movilidad`, `fecha_poliza`, `estatus`, `player_id`, `fecha_registro`) VALUES
(1, 'I2cKdAcTOP', 'PRUEBA', 'PRUEBA', '', 'aguileramotorsmx@gmail.com', 'b59c67bf196a4758191e42f76670ceba', 'PRUEBA', '', '0000-00-00', '0000-00-00', '0000-00-00', 3, NULL, '2022-06-14 10:04:24'),
(2, 'xF8W3YDGWZ', 'Luis Felipe ', 'Campos Romo', '+524498908934', 'lfcamposr@gmail.com', 'b59c67bf196a4758191e42f76670ceba', '', '', '2023-12-31', '2023-12-31', '2023-12-30', 3, NULL, '2022-06-15 06:50:48'),
(3, 'ROk2prGZLl', 'Jonathan', 'Salmeron', '4492438043', 'jonathan1993mtz@hotmail.com', 'b59c67bf196a4758191e42f76670ceba', 'MG Negra', '', '2025-12-01', '2025-12-01', '2025-12-15', 3, NULL, '2022-06-15 08:14:46'),
(4, '1Q4UMeSOY5', 'Rafael', 'Villaseñor', NULL, 'leonardo.perez@aguileramotors.com', '81dc9bdb52d04dc20036dbd8313ed055', 'wdewds', 'edfsdcs', '2022-06-16', '2022-06-17', '2022-06-17', 3, NULL, '2022-06-15 10:06:55'),
(5, 'BWlHqA4hMc', 'Griselda Ahydee', 'Hernandez Ledesma', '449 370 6715', 'griselda.hernandez1@gmail.com', 'ec99dd0bbd9458bc47d4b550b55aa1b2', 'Nissan Versa', 'AFA906A', '2025-08-27', '2021-03-31', '2022-09-23', 1, NULL, '2022-06-17 08:48:08'),
(6, 'R8fC4413Fe', 'CARLOS ALBERTO ', 'MORALES JAUREGUI', '449 124 49 68', 'carlos.alberto1@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'NISSAN VERSA', 'ABC043B', '2023-04-23', '2021-03-31', '2022-07-15', 1, NULL, '2022-06-17 09:06:37'),
(7, 'oQfb2WIby5', 'JORGE ALBERTO ', 'OLIVARES FLORES', '449 285 3118', 'jorge.alberto1@gmail.com', 'ec0805f013b5bb2f8231160d0ac06b48', 'NISSAN VERSA', 'AEF679B', '2023-10-08', '2021-03-31', '2022-07-21', 1, NULL, '2022-06-17 09:12:46'),
(8, 'ZQdxKkMK6n', 'ELIZABETH MONTSERRAT', 'MERCADO CAMARILLO', '449 279 0778', 'elizabeth.mercado1@gmail.com', 'af0a59d77edf6e178ec25cb090df864b', 'RENAULT KWID', 'ADU515C', '2022-11-20', '2021-11-12', '2022-05-21', 1, NULL, '2022-06-17 09:17:45'),
(9, 'w5m0Bd7xAj', 'JUAN MANUEL ', 'HERMOSILLO ANDA', '449 494 9667', 'juan.hermosillo1@gmail.com', '4ea6a546c19499318091a9df40a13181', 'NISSAN MARCH', 'AFM921A', '2023-01-26', '2022-03-31', '2022-10-15', 1, NULL, '2022-06-17 09:24:36'),
(10, 'tzuK0fXvNn', 'RAYMUNDO', 'ROMERO MARTINEZ', '449 126 1342', 'raymundo.romero1@gmail.com', 'f02a8fde79ddf5b978cd9ae9d408b7c1', 'NISSAN MARCH', 'ACX658A', '0001-01-01', '2022-03-31', '2022-09-23', 1, NULL, '2022-06-17 10:06:42'),
(11, 'Gb1Gl8mq1h', 'GUADALUPE', 'RODRIGUEZ PINEDA', '449 115 8403', 'guadalupe.rodriguez1@gmail.com', 'e7d4c8d4fe04d9b4539a075d809c6d01', 'NISSAN MARCH', 'ABR326C', '2023-11-09', '2021-03-31', '2022-10-07', 1, NULL, '2022-06-17 10:43:40'),
(12, 'jcri7xXuSf', 'JUAN MANUEL', 'LEDEZMA VAZQUEZ', '449 117 85 74', 'juan.ledezma1@gmail.com', '6eb6e75fddec0218351dc5c0c8464104', 'RENAULT LOGAN', 'AAP690C', '2022-07-27', '2020-03-31', '2022-09-17', 1, NULL, '2022-06-17 10:46:57'),
(13, '2yhcqmaPqm', 'ROBERTO', 'ESCOBAR ESPARZA', '449 120 72 04', 'roberto.escobar1@gmail.com', 'd41d8cd98f00b204e9800998ecf8427e', 'CHEVROLET BEAT', 'AAH886A', '2025-01-22', '2021-07-20', '2022-12-06', 1, NULL, '2022-06-17 10:49:41'),
(14, 'HqlNBDHQ55', 'CARLOS ', 'ANDRADE ROJAS', '449 605 56 52', 'carlos.andrade1@gmail.com', 'c4ef9c39b300931b69a36fb3dbb8d60e', 'NISSAN SENTRA', 'ADH567C', '2023-07-16', '2022-03-31', '2022-11-06', 1, NULL, '2022-06-17 11:10:07'),
(15, 'Lgp44DNQVC', 'PRUEBA', 'PRUEBA', '1234567890', 'prueba.prueba@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', '', 'qwert', '0000-00-00', '0000-00-00', '0000-00-00', 1, NULL, '2022-06-21 09:12:31'),
(16, 'AYaTN5dtKX', 'J. REFUGIO ', 'LOMELI VAZQUEZ', '449 667 90 58', 'j.refugiolomeli@gmail.com', 'e2c4c0b38669387a2a842e1fe391d233', 'NISSAN MARCH', 'ADK781C', '2023-08-23', '2021-08-13', '2022-09-24', 1, NULL, '2022-06-22 09:28:10'),
(17, 'YpraZbLULN', 'OSCAR', 'MARTINEZ ZACARIAS', '449 102 3382', 'oscar.martinez1@gmail.com', '0d5bd023a3ee11c7abca5b42a93c4866', 'VOLKSWAGEN VENTO', 'AAF417C', '2023-04-14', '2022-03-31', '2022-09-10', 1, NULL, '2022-06-22 09:36:16'),
(18, 'UeNEWBjEg9', 'NADIA SELENE', 'MENDEZ SILVA', '449 193 16 05', 'nadia.mendez@gmail.com', '9c779f56f336b3c812343434f57b6a0e', 'CHEVROLET AVEO', 'ABT488A', '2022-06-08', '2022-03-31', '2022-09-24', 1, NULL, '2022-06-22 09:42:40'),
(19, 'WmezD0QVSX', 'ANGEL ', 'RIOS MUÑOZ', '449 352 57 86', 'angel.rios1@gmail.com', '9b7da66eb5bb0e80c82e88fd2bfde5ce', 'CHEVROLET AVEO', 'ZFT850C', '2023-05-28', '2022-03-31', '2022-08-11', 1, NULL, '2022-06-22 09:56:54'),
(20, '8nLdCVmPhx', 'RUBEN - LUCIA MARIA', 'JUAREZ ARANDA - BUSTOS CHAVEZ', '449 553 6098', 'ruben.juarez1@gmail.com', 'd41d8cd98f00b204e9800998ecf8427e', 'NISSAN VERSA ', 'ADM318C', '2027-06-26', '2023-09-03', '2022-11-04', 1, NULL, '2022-06-22 10:03:19'),
(21, 'y2mnk2W4lD', 'JUAN ANTONIO', 'GARCIA HERNANDEZ', '449 211 93 48', 'juan.garcia1@gmail.com', '083b65c888b720c920dcaead304c5989', 'NISSAN SENTRA', 'AFF711B', '2027-11-17', '2021-11-16', '2022-11-23', 1, NULL, '2022-06-22 10:14:17'),
(22, '7J63DkhUu6', 'LUIS FERNANDO ', 'MUÑOZ URZUA', '449 201 3256', 'luis.urzua1@gmail.com', '918f5cd5a5c0d48671d4d4fc54bab2e9', 'VOLKSWAGEN VENTO', 'VENTO', '2022-05-24', '2021-12-10', '2022-07-07', 1, NULL, '2022-06-22 10:46:00'),
(23, 'KuLXo9Eisf', 'MARIA TERESA ANGELICA', 'CONTRERAS MEDRANO', '449 265 0262', 'maria.contreras@gmail.com', '21be9a4bd4f81549a9d1d241981cec3c', 'NISSAN XTRAIL', 'ACP596C', '2025-01-11', '2022-03-31', '2022-07-08', 1, NULL, '2022-06-22 10:50:05'),
(24, 'bvQxooaHMn', 'ALFONSO', 'MIRANDA CASTAÑEDA', '449 217 6169', 'alfonso.miranda1@gmail.com', '8fb134f258b1f7865a6ab2d935a897c9', 'NISSAN VERSA', 'ADU555B', '2023-03-05', '2022-03-31', '0001-01-01', 1, NULL, '2022-06-22 10:55:10'),
(25, '0ZfyaLnJod', 'HUGO ', 'SILVESTRE GARCIA', '449 212 0643', 'hugo.silvestre@gmail.com', '080c993fb3b58e26c1d2265bf9da0af3', 'TOYOTA YARIS', 'AEN0550B', '2023-01-20', '2022-03-31', '2022-08-01', 1, NULL, '2022-06-22 11:24:37'),
(26, 'LHAWl3IcDg', 'CECILIA', 'DENA BRAVO', '449 111 7342', 'cecilia.dena1@gmail.com', 'd41d8cd98f00b204e9800998ecf8427e', 'VOLKSWAGEN POLO', 'ADV668B', '2024-02-03', '2022-03-31', '0001-01-01', 1, NULL, '2022-06-22 11:29:35'),
(27, 'tee513t8Zh', 'ALFONSO FRANCISCO', 'ALCANTARA GONZALEZ', '449 185 02 81', 'alfonso.alcantara1@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'RENAULT LOGAN', 'AFD702B', '2022-08-01', '2022-03-31', '2022-09-17', 1, NULL, '2022-06-22 11:51:38'),
(28, '3bYJZ4Y0WL', 'RAFAEL', 'VILLASEÑOR EGUIA', '449 592 63 28', 'rafael.eguia1@gmail.com', '2afc4dfb14e55c6face649a1d0c1025b', 'VOLKSWAGEN VENTO', 'AAU821C', '2022-05-25', '2022-03-31', '2022-10-05', 1, NULL, '2022-06-22 11:54:38'),
(29, 'IHjM5S7Fa6', 'MAXIMILIANO', 'GARCIA GARCIA', '449 464 43 70 ', 'maximiliano.garcia1@gmail.com', '29daf9442f3c0b60642b14c081b4a556', 'NISSAN VERSA', 'ABD734B', '2022-07-29', '2022-01-12', '2022-10-22', 1, NULL, '2022-06-23 08:59:19'),
(30, 'TQxoinHHab', 'HECTOR ALFREDO', 'FLORES ALVARADO', '449 104 92 65', 'hector.flores1@gmail.com', '0b1ec366924b26fc98fa7b71a9c249cf', 'NISSAN MARCH', 'AFH680B', '2027-09-20', '2022-03-31', '2022-11-10', 1, NULL, '2022-06-23 09:04:48'),
(31, 'MKbgjbeNrK', 'JOSE ARTURO ', 'ORTIZ ALVAREZ', '449 548 10 17', 'jose.ortiz1@gmail.com', '70fc5f043205720a49d973d280eb83e7', 'NISSAN VERSA ', 'ADW368C', '2023-08-06', '2022-04-19', '2022-12-20', 1, NULL, '2022-06-23 09:20:35'),
(32, 'KPs458IYXj', 'ARMANDO ALEJANDRO', 'ROMERO GONZALEZ', '333 394 11 16', 'armando.romero1@gmail.com', 'b571ecea16a9824023ee1af16897a582', 'NISSAN VERSA', 'ACX502B', '2021-09-12', '2023-03-30', '0001-01-01', 1, NULL, '2022-06-23 11:29:06'),
(33, 'TnRgNewGty', 'JESUS', 'LAGUNAS CORONA', '449 525 29 74', 'jesus.lagunas1@gmail.com', '30192e936ba11d0a202097fed8f44b2d', 'NISSAN VERSA', 'ADH995C', '2027-08-05', '2023-03-11', '0001-01-01', 1, NULL, '2022-06-23 11:39:59'),
(34, 'jFcBhxgfL7', 'OSCAR ALBERTO', 'LONGORIA VALDIVIA', '449 111 41 49', 'oscar.longoria1@gmail.com', '5cbba2d075f0d1648e0851e1467ba79f', 'VOLSKSWAGEN VENTO', 'AEN127C', '2024-06-18', '2023-06-17', '0001-01-01', 1, NULL, '2022-06-23 11:45:17'),
(35, 'lXLrHRS3MO', 'JULIO CESAR', 'CORONADO LANDELL', '449 433 77 87', 'julio.coronado1@gmail.com', '25766f01628f3d34b93a36a2301dffc9', 'CHRYSLER MITSUBISHI', 'EMX4977', '2024-05-25', '2023-01-10', '0001-01-01', 1, NULL, '2022-06-23 11:49:18'),
(36, '15zVpA6tTC', 'Jonathan Armando ', 'Martinez Salmeron', '4491011390', 'jonathan1993mtz@hotmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'MG 2022', 'AEH712B', '2023-10-10', '2023-10-10', '2023-10-10', 1, NULL, '2022-08-11 17:01:01'),
(37, 'NVPsMwBuUg', 'María de los Ángeles ', 'Salazar', '4492104689', 'angeles.1@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'Versa blanco ', '', '2022-08-12', '2022-08-12', '2022-08-12', 1, NULL, '2022-08-12 13:31:34'),
(38, 'fH3gpzX8CF', 'Pedro', 'Romo', '5556789', 'pedro@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 'NISSAN', 'A2345AS', '2023-01-20', '2023-02-20', '2023-03-20', 1, NULL, '2022-10-20 08:00:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_servicios`
--

CREATE TABLE `log_servicios` (
  `idreg` int(11) NOT NULL,
  `idservicio` int(11) NOT NULL,
  `estatus` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `codigo_usuario` varchar(12) COLLATE utf8_spanish2_ci NOT NULL,
  `tipo_usuario` varchar(20) COLLATE utf8_spanish2_ci NOT NULL,
  `notas` varchar(500) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rutas_servicio`
--

CREATE TABLE `rutas_servicio` (
  `idreg` int(11) NOT NULL,
  `idservicio` int(11) NOT NULL,
  `idnomina` varchar(50) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `nombre_solicitante` varchar(150) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `alias_lugar` varchar(100) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `tipo_parada` varchar(20) COLLATE utf8_spanish2_ci NOT NULL COMMENT 'ENTRADA, SALIDA, ENTRADA Y SALIDA',
  `hora_recoleccion_entrada` time DEFAULT NULL,
  `hora_recoleccion_salida` time DEFAULT NULL,
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `abordo_entrada` tinyint(4) DEFAULT NULL COMMENT '0 - NO,\r\n1 - SI',
  `abordo_salida` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `rutas_servicio`
--

INSERT INTO `rutas_servicio` (`idreg`, `idservicio`, `idnomina`, `nombre_solicitante`, `alias_lugar`, `tipo_parada`, `hora_recoleccion_entrada`, `hora_recoleccion_salida`, `fecha_registro`, `abordo_entrada`, `abordo_salida`) VALUES
(1, 5, '105031', 'BONILLA NERI OSWALDO', 'PASEOS DE AGUASCALIENTES ', 'ENTRADA Y SALIDA', '05:10:00', '16:00:00', '2022-11-01 10:20:47', NULL, NULL),
(2, 5, '118600', 'LOPEZ RUVALCAVA OSCAR', 'COL DEL CARMEN ', 'ENTRADA Y SALIDA', '05:30:00', '16:00:00', '2022-11-01 10:20:47', NULL, NULL),
(3, 6, '101875', 'PALACIOS REYES JOSE', 'FIDEL VELAZQUEZ', 'SALIDA', NULL, '16:00:00', '2022-11-01 10:20:47', NULL, 1),
(4, 6, '103627', 'RAMIREZ TENORIO JOSE', 'INFONAVIT MORELOS', 'SALIDA', NULL, '16:00:00', '2022-11-01 10:20:47', NULL, 1),
(5, 7, '144134', 'MORENO ASUNA URBANO', 'AMBROSIA', 'ENTRADA', '05:30:00', NULL, '2022-11-01 10:20:47', NULL, NULL),
(6, 7, '104501', 'LOERA DE AVILA JOSE', 'VILLA DE LAS NORIAS ', 'ENTRADA Y SALIDA', '05:30:00', '16:00:00', '2022-11-01 10:20:47', NULL, NULL),
(7, 7, '104479', 'MTZ RODRIGUEZ EDGAR', 'VILLA DE LAS NORIAS', 'SALIDA', NULL, '16:00:00', '2022-11-01 10:20:47', NULL, NULL),
(8, 8, '164692', 'SANTOYO CORPUS LUIS', 'HACIENDAS DE AGUASCALIENTES ', 'ENTRADA', '05:30:00', NULL, '2022-11-01 10:20:47', NULL, NULL),
(9, 8, '104236', 'RANGEL REGALADO JOSE', 'VISTAS DE LAS CUMBRES', 'ENTRADA', '05:30:00', NULL, '2022-11-01 10:20:47', NULL, NULL),
(10, 9, '1', 'DIANA HERRADA', 'HOTEL POSADA LA FUENTE', 'ENTRADA Y SALIDA', '05:10:00', '16:00:00', '2022-11-01 10:26:32', NULL, NULL),
(11, 9, '2', 'ANGELICA GUERRERO', 'INTERCERAMIC', 'ENTRADA Y SALIDA', '05:30:00', '16:00:00', '2022-11-01 10:26:32', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicio`
--

CREATE TABLE `servicio` (
  `idreg` int(11) NOT NULL,
  `codigo_cliente` varchar(12) COLLATE utf8_spanish2_ci NOT NULL,
  `fecha_servicio` date NOT NULL,
  `hora_entrada` time NOT NULL,
  `hora_salida` time NOT NULL,
  `nombre_ruta` varchar(50) COLLATE utf8_spanish2_ci NOT NULL,
  `tipo_servicio` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'SENCILLO, REGULAR, COMPUESTO',
  `distancia` decimal(12,2) DEFAULT NULL COMMENT 'kilometraje recorrido',
  `codigo_conductor` varchar(10) COLLATE utf8_spanish2_ci DEFAULT NULL,
  `fecha_inicio` datetime DEFAULT NULL,
  `fecha_termino` datetime DEFAULT NULL,
  `estatus` varchar(20) COLLATE utf8_spanish2_ci NOT NULL DEFAULT 'PROGRAMADO' COMMENT 'PROGRAMADO, ASIGNADO, ACEPTADO, RECHAZADO, INICIADO, TERMINADO, CANCELADO',
  `estatus_entrada` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'PENDIENTE, EN PROCESO, TERMINADO O NULL',
  `estatus_salida` varchar(20) COLLATE utf8_spanish2_ci DEFAULT NULL COMMENT 'PENDIENTE, EN PROCESO, TERMINADO O NULL',
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `servicio`
--

INSERT INTO `servicio` (`idreg`, `codigo_cliente`, `fecha_servicio`, `hora_entrada`, `hora_salida`, `nombre_ruta`, `tipo_servicio`, `distancia`, `codigo_conductor`, `fecha_inicio`, `fecha_termino`, `estatus`, `estatus_entrada`, `estatus_salida`, `fecha_registro`) VALUES
(5, 'NxuCYCYhr1qo', '2022-11-01', '06:30:00', '16:00:00', 'R1', NULL, NULL, 'fH3gpzX8CF', '2022-11-01 10:21:54', NULL, 'INICIADO', 'EN PROCESO', 'PENDIENTE', '2022-11-01 10:20:47'),
(6, 'NxuCYCYhr1qo', '2022-11-01', '06:30:00', '16:00:00', 'R2', NULL, NULL, '15zVpA6tTC', '2022-11-01 10:22:13', '2022-11-01 10:27:03', 'TERMINADO', NULL, 'TERMINADO', '2022-11-01 10:20:47'),
(7, 'NxuCYCYhr1qo', '2022-11-01', '06:30:00', '16:00:00', 'R3', NULL, NULL, NULL, NULL, NULL, 'PROGRAMADO', 'PENDIENTE', 'PENDIENTE', '2022-11-01 10:20:47'),
(8, 'NxuCYCYhr1qo', '2022-11-01', '06:30:00', '16:00:00', 'R4', NULL, NULL, NULL, NULL, NULL, 'PROGRAMADO', 'PENDIENTE', NULL, '2022-11-01 10:20:47'),
(9, 'VsBLnr37eNb1', '2022-11-01', '06:30:00', '16:00:00', 'R1', NULL, NULL, '15zVpA6tTC', NULL, NULL, 'ASIGNADO', 'PENDIENTE', 'PENDIENTE', '2022-11-01 10:26:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idreg` int(11) NOT NULL,
  `codigo_usuario` varchar(10) COLLATE utf8_spanish2_ci NOT NULL,
  `nombres` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `apellidos` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `correo_electronico` varchar(150) COLLATE utf8_spanish2_ci NOT NULL,
  `contrasena` varchar(200) COLLATE utf8_spanish2_ci NOT NULL,
  `estatus` tinyint(4) NOT NULL DEFAULT '1' COMMENT '	1. habilitado, 2. inabilitado, 3. eliminado	',
  `fecha_registro` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idreg`, `codigo_usuario`, `nombres`, `apellidos`, `correo_electronico`, `contrasena`, `estatus`, `fecha_registro`) VALUES
(1, '2aLc8D', 'GEOMSoft', 'Administrador', 'geom.informacion@gmail.com', 'b59c67bf196a4758191e42f76670ceba', 1, '2020-06-15 11:14:12'),
(2, '9bFciiBgiT', 'Leonardo', 'Pérez', 'ventas@aguileramotors.com', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2022-06-13 11:43:15'),
(3, 'M58FKdqe1N', 'Luis Felipe ', 'Campos', 'lfcamposr@gmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 3, '2022-06-15 06:25:07'),
(4, 'oxS318f1xH', 'Elias', 'Gómez ', 'direccion@aguileramotors.com', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2022-06-15 08:11:31'),
(5, 'GPfMdFaNZX', 'Jonathan', 'Martinez', 'jonathan1993mtz@hotmail.com', '81dc9bdb52d04dc20036dbd8313ed055', 1, '2022-06-15 10:38:31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cat_personal_clientes`
--
ALTER TABLE `cat_personal_clientes`
  ADD PRIMARY KEY (`idreg`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idreg`);

--
-- Indices de la tabla `conductor`
--
ALTER TABLE `conductor`
  ADD PRIMARY KEY (`idreg`);

--
-- Indices de la tabla `log_servicios`
--
ALTER TABLE `log_servicios`
  ADD PRIMARY KEY (`idreg`);

--
-- Indices de la tabla `rutas_servicio`
--
ALTER TABLE `rutas_servicio`
  ADD PRIMARY KEY (`idreg`);

--
-- Indices de la tabla `servicio`
--
ALTER TABLE `servicio`
  ADD PRIMARY KEY (`idreg`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idreg`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cat_personal_clientes`
--
ALTER TABLE `cat_personal_clientes`
  MODIFY `idreg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `idreg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `conductor`
--
ALTER TABLE `conductor`
  MODIFY `idreg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT de la tabla `log_servicios`
--
ALTER TABLE `log_servicios`
  MODIFY `idreg` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rutas_servicio`
--
ALTER TABLE `rutas_servicio`
  MODIFY `idreg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `servicio`
--
ALTER TABLE `servicio`
  MODIFY `idreg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idreg` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
