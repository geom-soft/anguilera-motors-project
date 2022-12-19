<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Reporte_model extends CI_Model
{

  public function __construct() {
      parent::__construct();
      $this->load->database();
  }

  public function reporte_listado_servicios($data) {

    $estatus = $this->db->escape($data['estatus']);
    $fecha1 = $this->db->escape($data['f1']." 00:00:00");
    $fecha2 = $this->db->escape($data['f2']." 23:59:59");

    if ($data['cliente'] == "TODOS") {
      $cliente = "";
    } else {
      $cliente = "AND s.codigo_cliente = '".$data['cliente']."'";
    }

    if ($data['conductor'] == "TODOS") {
      $conductor = "";
    } else if ($data['conductor'] == "SA") {
      $conductor = "AND s.codigo_conductor IS NULL";
    } else {
      $conductor = "AND s.codigo_conductor = '".$data['conductor']."'";
    }

    $query = $this->db->query("
      SELECT s.idreg, s.fecha_servicio fecha, u.nombre_empresa cliente, CONCAT(d.nombres, ' ', d.apellidos) conductor,
              s.estatus, s.fecha_inicio inicio, s.fecha_termino termino
      FROM servicio s
      LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
      LEFT JOIN cliente u ON s.codigo_cliente = u.codigo_cliente $cliente
      WHERE s.fecha_servicio BETWEEN $fecha1 AND $fecha2
      AND s.estatus = $estatus
      $conductor
      $cliente
      ORDER BY s.fecha_servicio DESC;
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

  public function reporte_servicios_conductores($data) {

    $fecha1 = $this->db->escape($data['f1']." 00:00:00");
    $fecha2 = $this->db->escape($data['f2']." 23:59:59");

    $query = $this->db->query("
      SELECT d.codigo_conductor, CONCAT(d.nombres, ' ', d.apellidos) conductor, COUNT(p.idreg) pendiente, COUNT(f.idreg) finalizado, COUNT(c.idreg) cancelado
      FROM servicio s
      LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
      LEFT JOIN cliente u ON s.codigo_cliente = u.codigo_cliente
      LEFT JOIN servicio p ON s.idreg = p.idreg AND p.estatus = 'ASIGNADO'
      LEFT JOIN servicio f ON s.idreg = f.idreg AND f.estatus = 'TERMINADO'
      LEFT JOIN servicio c ON s.idreg = c.idreg AND c.estatus = 'CANCELADO'
      WHERE s.fecha_servicio BETWEEN $fecha1 AND $fecha2
      GROUP BY d.codigo_conductor
      ORDER BY d.nombres ASC;
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


  public function reporte_servicios_clientes($data) {

    $fecha1 = $this->db->escape($data['f1']." 00:00:00");
    $fecha2 = $this->db->escape($data['f2']." 23:59:59");

    $query = $this->db->query("
      SELECT u.nombre_empresa, COUNT(p.idreg) pendiente, COUNT(f.idreg) finalizado, COUNT(c.idreg) cancelado
      FROM servicio s
      LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
      LEFT JOIN cliente u ON s.codigo_cliente = u.codigo_cliente
      LEFT JOIN servicio p ON s.idreg = p.idreg AND (p.estatus = 'PROGRAMADO' OR p.estatus = 'ASIGNADO' OR p.estatus = 'ACEPTADO')
      LEFT JOIN servicio f ON s.idreg = f.idreg AND f.estatus = 'TERMINADO'
      LEFT JOIN servicio c ON s.idreg = c.idreg AND c.estatus = 'CANCELADO'
      WHERE s.fecha_servicio BETWEEN $fecha1 AND $fecha2
      GROUP BY u.codigo_cliente
      ORDER BY u.nombre_empresa ASC;
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




  public function lista_rutas_conductor($data) {
    if ($data['codigo'] == "null") {
      $conductor = "codigo_conductor IS NULL";
    } else {
      $conductor = "codigo_conductor = ".$this->db->escape($data['codigo']);
    }
    $fecha1 = $this->db->escape($data['f1']." 00:00:00");
    $fecha2 = $this->db->escape($data['f2']." 23:59:59");

    $query = $this->db->query("
      SELECT idreg, fecha_servicio, estatus
      FROM servicio
      WHERE fecha_servicio BETWEEN $fecha1 AND $fecha2
      AND $conductor
      AND estatus IN ('PROGRAMADO', 'TERMINADO', 'CANCELADO')
      ORDER BY fecha_servicio ASC;
    ");

    $obj = [];

    if($query){

        foreach ($query->result_array() as $row) {
          $ids = $row['idreg'];
          $query2 = $this->db->query("SELECT alias_lugar FROM rutas_servicio WHERE idservicio = '$ids';");
          array_push($obj, array(
            "servicio" => $ids,
            "fecha" => $row['fecha_servicio'],
            "estatus" => $row['estatus'],
            "rutas" => $query2->result_array()
          ));
        }

        $respuesta = array(
            "error" => FALSE,
            "message" => "Consulta correcta",
            "status" => REST_Controller::HTTP_OK,
            "data" => array(
              "fields" => $query->num_fields(),
              "rows" => $query->num_rows(),
              "results" => $obj
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


  public function reporte_personalizado($data) {
    $cliente = $this->db->escape($data['cliente']);
    $fecha1 = $this->db->escape($data['f1']." 00:00:00");
    $fecha2 = $this->db->escape($data['f2']." 23:59:59");

    $query = $this->db->query("
        (SELECT s.idreg, s.fecha_servicio, CONCAT(c.nombres, ' ', c.apellidos) conductor, 'ENTRADA' as leyenda, s.hora_entrada as hora,
          GROUP_CONCAT(r.alias_lugar SEPARATOR ' - ') as ruta
        FROM servicio s
        LEFT JOIN conductor c ON s.codigo_conductor = c.codigo_conductor
        LEFT JOIN rutas_servicio r ON s.idreg = r.idservicio
        WHERE s.estatus = 'TERMINADO'
        AND s.codigo_cliente = $cliente
        AND s.fecha_servicio BETWEEN $fecha1 AND $fecha2
        AND r.tipo_parada LIKE '%ENTRADA%'
        GROUP BY s.idreg)


        UNION

        (SELECT s.idreg, s.fecha_servicio, CONCAT(c.nombres, ' ', c.apellidos) conductor, 'SALIDA' as leyenda, s.hora_salida as hora,
          GROUP_CONCAT(r.alias_lugar SEPARATOR ' - ') as ruta
        FROM servicio s
        LEFT JOIN conductor c ON s.codigo_conductor = c.codigo_conductor
        LEFT JOIN rutas_servicio r ON s.idreg = r.idservicio
        WHERE s.estatus = 'TERMINADO'
        AND s.codigo_cliente = $cliente
        AND s.fecha_servicio BETWEEN $fecha1 AND $fecha2
        AND r.tipo_parada LIKE '%SALIDA%'
        GROUP BY s.idreg)

        ORDER BY leyenda ASC, fecha_servicio ASC;
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
