<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Inicio_model extends CI_Model
{

  public function __construct() {
      parent::__construct();
      $this->load->database();
  }

  public function obtener_ventas_mes() {

      $inicio = date("Y-m-01")." 00:00:00";
      $fin = date("Y-m-t", strtotime(date("Y-m-d")))." 23:59:00";

      $query = $this->db->query("
        SELECT COUNT(*) total
        FROM interaccion
        WHERE tipo_interaccion = 'PEDIDO'
        AND   fecha_registro BETWEEN '$inicio' AND '$fin';
      ");

      if($query){
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

  public function obtener_clientes_total() {

      $query = $this->db->query("
        SELECT COUNT(c.idreg) total, COUNT(a.idreg) activos
        FROM cliente c
        LEFT JOIN cliente a ON c.idreg = a.idreg AND a.estatus = 1
        WHERE c.estatus != 3;
      ");

      if($query){
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

  public function obtener_vendedores_total() {

      $query = $this->db->query("
        SELECT COUNT(*) total
        FROM vendedor
        WHERE estatus = 1;
      ");

      if($query){
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

  public function obtener_ventas_dia() {

      $inicio = date("Y-m-01")." 00:00:00";
      $fin = date("Y-m-t", strtotime(date("Y-m-d")))." 23:59:00";

      $query = $this->db->query("
        SELECT DATE_FORMAT(i.fecha_registro, '%Y-%m-%d') as fecha, COUNT(v.idreg) total
        FROM interaccion i
        LEFT JOIN interaccion v ON i.idreg = v.idreg AND DATE(i.fecha_registro) = DATE(v.fecha_registro) AND v.tipo_interaccion = 'PEDIDO'
        WHERE i.fecha_registro BETWEEN '$inicio' AND '$fin'
        GROUP BY fecha
        ORDER BY STR_TO_DATE(fecha, '%Y-%m-%d') ASC;
      ");

      if($query){
          $respuesta = array(
              "error" => FALSE,
              "message" => "Consulta correcta",
              "status" => REST_Controller::HTTP_OK,
              "data" => array(
                "fields" => $query->num_fields(),
                "rows" => $query->num_rows(),
                "results" => $query->result()
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
