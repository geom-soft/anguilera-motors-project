<?php
defined('BASEPATH') OR exit('No direct script access allowed');

setlocale(LC_ALL,"es_MX");
date_default_timezone_set('America/Mexico_City');
ini_set("date.timezone", "America/Mexico_City");

error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Access-Control-Allow-Origin: *');

class Auto extends CI_Controller {

	public function __construct() {
			parent::__construct();
			$this->load->database();
			$this->load->helper('push');
	}

	public function index() {
		echo "Autoprocesamiento...";
	}

	public function test() {

		if (sendTest()) {
			echo 'Se envió';
		} else {
			echo 'No se envió';
		}

	}

	// exec cada 30 min, en horario laboral
	public function reasigna() {
		/*********************************************************
			SERVICIOS PENDIENTES REASIGNADOS - A 1 HORA DEL SERVICIO
		**********************************************************/
		// $query = $this->db->query("
		// 	SELECT s.*,
		// 		IF(s.codigo_conductor IS NULL, null, CONCAT(d.nombres, ' ', d.apellidos)) nombre_conductor,
		// 		IF(s.codigo_conductor IS NULL, null, d.player_id) player_id
		// 	FROM servicio s
		// 	LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
		// 	WHERE s.estatus = 'PENDIENTE'
		// 	AND DATE_ADD(NOW(), INTERVAL 1 HOUR) > s.fecha_servicio
		// 	ORDER BY s.fecha_servicio ASC;
    // ");

		// if ($query->num_rows() > 0) {
		// 	$arr = [];
		// 	foreach ($query->result_array() as $row) {
		// 		if ($row['player_id']) {
		// 			array_push($arr, $row['player_id']);
		// 		}
		// 	}
		// 	sendPushPlayers('Confirma los pendientes', 'Tienes servicios pendientes por confirmar.', $arr);
		// }
	}


	// exec cada 30 min, en horario laboral
	public function notifica() {

		/*********************************************************
			SERVICIOS PENDIENTES PROXIMOS - A 2 HORAS DEL SERVICIO
		**********************************************************/
		$query = $this->db->query("
			SELECT s.*,
				IF(s.codigo_conductor IS NULL, null, CONCAT(d.nombres, ' ', d.apellidos)) nombre_conductor,
				IF(s.codigo_conductor IS NULL, null, d.player_id) player_id
			FROM servicio s
			LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
			WHERE s.estatus = 'PENDIENTE'
			AND DATE_ADD(NOW(), INTERVAL 2 HOUR) > s.fecha_servicio
			ORDER BY s.fecha_servicio ASC;
    ");

		if ($query->num_rows() > 0) {
			$arr = [];
			foreach ($query->result_array() as $row) {
				if ($row['player_id']) {
					array_push($arr, $row['player_id']);
				}
			}
			sendPushPlayers('Confirma los pendientes', 'Tienes servicios pendientes por confirmar.', $arr);
		}



		/*********************************************************
			RECORDATORIO SERVICIOS ACEPTADOS - A 1 HORA DEL SERVICIO
		**********************************************************/
		$query = $this->db->query("
			SELECT s.*,
				IF(s.codigo_conductor IS NULL, null, CONCAT(d.nombres, ' ', d.apellidos)) nombre_conductor,
				IF(s.codigo_conductor IS NULL, null, d.player_id) player_id
			FROM servicio s
			LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
			WHERE s.estatus = 'ACEPTADO'
			AND DATE_ADD(NOW(), INTERVAL 1 HOUR) > s.fecha_servicio
			ORDER BY s.fecha_servicio ASC;
		");

		if ($query->num_rows() > 0) {
			$arr = [];
			foreach ($query->result_array() as $row) {
				if ($row['player_id']) {
					array_push($arr, $row['player_id']);
				}
			}
			sendPushPlayers('¡Recordatorio!', 'Tienes servicios próximos a realizar.', $arr);
		}

	}


	// exec 1 vez por semana
	public function vigencia() {
		/*********************************************************
			RECORDATORIO VIGENCIA LICENCIAS - A 1 MES DE VIGENCIA
		**********************************************************/
		$query = $this->db->query("
			SELECT player_id
			FROM conductor
			WHERE estatus = 1
			AND (DATE_ADD(NOW(), INTERVAL 1 MONTH) > fecha_licencia
			OR  DATE_ADD(NOW(), INTERVAL 1 MONTH) > fecha_movilidad
			OR  DATE_ADD(NOW(), INTERVAL 1 MONTH) > fecha_poliza);
		");
		if ($query->num_rows() > 0) {
			$arr = [];
			foreach ($query->result_array() as $row) {
				if ($row['player_id']) {
					array_push($arr, $row['player_id']);
				}
			}
			sendPushPlayers('¡Vigencia próxima!', 'Verifica la vigencia de tus documentos. La licencia de conducir, registro de movilidad o póliza de seguro está próximo a vencer.', $arr);
		}
	}

}
