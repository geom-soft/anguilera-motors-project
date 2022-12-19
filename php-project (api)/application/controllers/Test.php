<?php
defined('BASEPATH') OR exit('No direct script access allowed');

setlocale(LC_ALL,"es_MX");
date_default_timezone_set('America/Mexico_City');
ini_set("date.timezone", "America/Mexico_City");

class Test extends CI_Controller {

	public function index() {

		$fecha = date("d/m/Y h:i:s A");
		echo $fecha;

	}


	public function codigos() {
		exit("Procedimiento bloqueado!");
		$this->load->database();
		$this->load->helper('token');

		$query = $this->db->query("
			SELECT idreg FROM cliente;
		");

		foreach ($query->result_array() as $row) {
			$id = $row['idreg'];
			$codigo = generateCode(5);
			$update = $this->db->query("UPDATE cliente SET codigo_cliente = '$codigo' WHERE idreg = $id AND idreg > 842;");
		}

	}


}
