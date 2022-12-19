<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Ruta_model extends CI_Model
{
  public $idreg;
  public $idservicio;
  public $nombre_solicitante;
  public $telefono_solicitante;
  public $numero_nomina;
  public $lugar_parada;
  public $domicilio_parada;


  public function __construct() {
      parent::__construct();
      $this->load->database();
  }

  public function llenar_datos($data, $accion) {
      foreach ($data as $nombre_campo => $valor_campo) {
          if (property_exists('Ruta_model', $nombre_campo)) {
              $this->$nombre_campo = ($valor_campo == 'null') ? NULL : $valor_campo;
          }
      }
      return $this;
  }

  public function obtener_registro($id) {
    $id = $this->db->escape($id);
    $query = $this->db->query("
        SELECT *
        FROM rutas_servicio
        WHERE idreg = $id;
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

  public function obtener_registros($id) {
      $id = $this->db->escape($id);
      $query = $this->db->query("
          SELECT r.*, c.domicilio, ST_X(c.ubicacion) longitud, ST_Y(c.ubicacion) latitud
          FROM rutas_servicio r
          LEFT JOIN cat_personal_clientes c ON c.numero_nomina = r.idnomina
          WHERE r.idservicio = $id
          ORDER BY fecha_registro ASC;
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

  public function obtener_entradas($id) {
      $id = $this->db->escape($id);
      $query = $this->db->query("
          SELECT r.*, c.domicilio, ST_X(c.ubicacion) longitud, ST_Y(c.ubicacion) latitud
          FROM rutas_servicio r
          LEFT JOIN cat_personal_clientes c ON c.numero_nomina = r.idnomina
          WHERE r.idservicio = $id
          AND r.hora_recoleccion_entrada IS NOT NULL
          GROUP BY r.idnomina
          ORDER BY fecha_registro ASC;
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

  public function obtener_salidas($id) {
      $id = $this->db->escape($id);
      $query = $this->db->query("
          SELECT r.*, c.domicilio, ST_X(c.ubicacion) longitud, ST_Y(c.ubicacion) latitud
          FROM rutas_servicio r
          LEFT JOIN cat_personal_clientes c ON c.numero_nomina = r.idnomina
          WHERE r.idservicio = $id
          AND r.hora_recoleccion_salida IS NOT NULL
          GROUP BY r.idnomina
          ORDER BY fecha_registro ASC;
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

  public function nuevo_registro() {

      $nuevo = $this->db->insert('rutas_servicio', $this);
      if($nuevo){
          $respuesta = array(
              "error" => FALSE,
              "message" => "El registro fue insertado correctamente",
              "status" => REST_Controller::HTTP_OK,
              "data" => array(
                "results" => $this->db->insert_id()
              )
          );
      } else {
          $respuesta = array(
              "error" => TRUE,
              "message" => "Error al insertar el registro",
              "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
              "data" => $this->db->error()
          );
      }
      return $respuesta;
  }


  public function eliminar_registro($id) {
    $id = $this->db->escape($id);
    $query = $this->db->query("
        DELETE FROM rutas_servicio
        WHERE idreg = $id;
    ");

    if ($query) {
      $respuesta = array(
          "error" => FALSE,
          "message" => "El registro fue eliminado correctamente",
          "status" => REST_Controller::HTTP_OK,
          "data" => array(
            "filas_afectadas" => $this->db->affected_rows()
          )
      );
    } else {
      $respuesta = array(
          "error" => TRUE,
          "message" => "Error al eliminado el registro",
          "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
          "data" => $this->db->error()
      );
    }
      return $respuesta;
  }


  public function abordar_entrada($data) {
    $id = $this->db->escape($data['id']);
    $a =  $data['a'];
    $query = $this->db->query("
        UPDATE rutas_servicio
        SET abordo_entrada = $a
        WHERE idreg = $id;
    ");

    if ($query) {
      $respuesta = array(
          "error" => FALSE,
          "message" => "El registro fue actualizado correctamente",
          "status" => REST_Controller::HTTP_OK,
          "data" => array(
            "filas_afectadas" => $this->db->affected_rows()
          )
      );
    } else {
      $respuesta = array(
          "error" => TRUE,
          "message" => "Error al actualizar el registro",
          "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
          "data" => $this->db->error()
      );
    }
      return $respuesta;
  }

  public function abordar_salida($data) {
    $id = $this->db->escape($data['id']);
    $a =  $data['a'];
    $query = $this->db->query("
        UPDATE rutas_servicio
        SET abordo_salida = $a
        WHERE idreg = $id;
    ");

    if ($query) {
      $respuesta = array(
          "error" => FALSE,
          "message" => "El registro fue actualizado correctamente",
          "status" => REST_Controller::HTTP_OK,
          "data" => array(
            "filas_afectadas" => $this->db->affected_rows()
          )
      );
    } else {
      $respuesta = array(
          "error" => TRUE,
          "message" => "Error al actualizar el registro",
          "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
          "data" => $this->db->error()
      );
    }
      return $respuesta;
  }

}
