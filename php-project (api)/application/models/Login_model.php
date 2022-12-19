<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Login_model extends CI_Model
{

  public function __construct() {
      parent::__construct();
      $this->load->database();
  }

  public function iniciar_sesion($data) {

    $acceso = $this->db->escape($data['acceso']);
    $nip = $this->db->escape(md5($data['nip']));

    $query = $this->db->query("
      SELECT codigo_usuario codigo, CONCAT(nombres, ' ', apellidos) nombre, 'ADMIN' as tipo
      FROM usuario
      WHERE correo_electronico=$acceso
      AND contrasena=$nip
      AND estatus = 1;
    ");

    if ($query->num_rows() == 0) {
      $query = $this->db->query("
        SELECT codigo_cliente codigo, nombre_empresa nombre, 'CLIENTE' as tipo
        FROM cliente
        WHERE usuario_acceso=$acceso
        AND contrasena=$nip
        AND eliminado = 0;
      ");
    }

    if ($query) {
        $respuesta = array(
            "error" => FALSE,
            "message" => "Consulta correcta",
            "status" => REST_Controller::HTTP_OK,
            "data" => array(
              "fields" => $query->num_fields(),
              "rows" => $query->num_rows(),
              "results" => $query->row_array(0)
            )
        );
    } else {
        $respuesta = array(
            "error" => TRUE,
            "message" => "Consulta incorrecta",
            "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
            "data" => $this->db->error()
        );
    }

    return $respuesta;
  }

  public function sesion_conductor($data) {

    $acceso = $this->db->escape($data['user']);
    $nip = $this->db->escape(md5($data['nip']));

    $query = $this->db->query("
      SELECT codigo_conductor codigo, CONCAT(nombres, ' ', apellidos) nombre
      FROM conductor
      WHERE correo_electronico=$acceso
      AND contrasena=$nip
      AND estatus = 1;
    ");

    if ($query) {
        $respuesta = array(
            "error" => FALSE,
            "message" => "Consulta correcta",
            "status" => REST_Controller::HTTP_OK,
            "data" => array(
              "fields" => $query->num_fields(),
              "rows" => $query->num_rows(),
              "results" => $query->row_array(0)
            )
        );
    } else {
        $respuesta = array(
            "error" => TRUE,
            "message" => "Consulta incorrecta",
            "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
            "data" => $this->db->error()
        );
    }

    return $respuesta;
  }

}
