<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Conductor_model extends CI_Model
{
  //public $idreg;
  public $codigo_conductor;
  public $nombres;
  public $apellidos;
  public $correo_electronico = "ND";
  public $telefono;
  public $descripcion_vehiculo;
  public $placas_vehiculo;
  public $fecha_licencia;
  public $fecha_movilidad;
  public $fecha_poliza;
  public $contrasena;
  public $estatus;

  public function __construct() {
      parent::__construct();
      $this->load->database();
  }

  public function llenar_datos($data, $accion) {
      foreach ($data as $nombre_campo => $valor_campo) {
          if (property_exists('Conductor_model', $nombre_campo)) {
              $this->$nombre_campo = ($valor_campo == 'null') ? NULL : $valor_campo;
          }
      }

      // bloque genera codigos
      $this->load->helper('token');
      $this->codigo_conductor = ($accion == "insertar") ? generateToken(10) : $this->codigo_conductor;
      if ($this->codigo_conductor == null) {
          unset($this->codigo_conductor);
      }

      // bloque encripta y valida contraseñas
      if ($accion == "insertar") {
          $this->contrasena = md5($this->contrasena);
      } else {
        //valida si la cadena ya es md5 y la deja igual
        if (preg_match('/^[a-f0-9]{32}$/', $this->contrasena)) {
            $this->contrasena = ($this->contrasena);
        } else {
            $this->contrasena = md5($this->contrasena);
        }
      }

      return $this;
  }

  public function obtener_conductor($id) {
    $id = $this->db->escape($id);
    $query = $this->db->query("
        SELECT *, null as contrasena
        FROM conductor
        WHERE codigo_conductor = $id;
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

  public function obtener_conductores() {
    // estatus 1, conductor activo
    // estatus 2, conductor inhabilitado
    // estatus 3, conductor eliminado del sistema
      $query = $this->db->query("
        SELECT codigo_conductor, nombres, apellidos, correo_electronico, telefono, estatus
        FROM conductor
        WHERE estatus != 3
        ORDER BY nombres ASC;
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

  public function nuevo_conductor() {
      $nuevo = $this->db->insert('conductor', $this);
      if($nuevo){
          $respuesta = array(
              "error" => FALSE,
              "message" => "El registro fue insertado correctamente",
              "status" => REST_Controller::HTTP_OK,
              "data" => NULL
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

  public function actualiza_conductor() {
      $where = "codigo_conductor = ".$this->db->escape($this->codigo_conductor);
      $query = $this->db->update_string('conductor', $this, $where);
      $modifica = $this->db->query($query);
      if($modifica){
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

  public function estatus_conductor($id, $estatus) {
    // simula la eliminacion de un registro actualizando el estatus 3
    $id = $this->db->escape($id);
    $estatus = $this->db->escape($estatus);
    $query = $this->db->query("
        UPDATE conductor
        SET estatus = $estatus
        WHERE codigo_conductor = $id;
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
          "message" => "Error al eliminar el registro",
          "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
          "data" => $this->db->error()
      );
    }
      return $respuesta;
  }

  public function restaurar_contrasena($id) {
    $id = $this->db->escape($id);
    $query = $this->db->query("
        UPDATE conductor
        SET contrasena = MD5('1234')
        WHERE codigo_conductor = $id;
    ");

    if ($query) {
      $respuesta = array(
          "error" => FALSE,
          "message" => "El NIP se restauró correctamente",
          "status" => REST_Controller::HTTP_OK,
          "data" => array(
            "filas_afectadas" => $this->db->affected_rows()
          )
      );
    } else {
      $respuesta = array(
          "error" => TRUE,
          "message" => "Error al restaurar el NIP",
          "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
          "data" => $this->db->error()
      );
    }
      return $respuesta;
  }

  public function actualiza_perfil($data) {
    $codigo_conductor = $this->db->escape($data['codigo_conductor']);
    $nip = $this->db->escape(md5($data['contrasena']));
    $query = $this->db->query("
        UPDATE conductor
        SET contrasena = $nip
        WHERE codigo_conductor = $codigo_conductor;
    ");

    if ($query) {
      $respuesta = array(
          "error" => FALSE,
          "message" => "El NIP se restauró correctamente",
          "status" => REST_Controller::HTTP_OK,
          "data" => array(
            "filas_afectadas" => $this->db->affected_rows()
          )
      );
    } else {
      $respuesta = array(
          "error" => TRUE,
          "message" => "Error al restaurar el NIP",
          "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
          "data" => $this->db->error()
      );
    }
      return $respuesta;
  }

  public function select2_conductores() {
      $query = $this->db->query("
        SELECT codigo_conductor as id, CONCAT(nombres, ' ', apellidos) as text
        FROM conductor
        WHERE estatus = 1
        ORDER BY nombres ASC;
      ");

      // $result = array();
      //
      // foreach ($query->result_array() as $row) {
      //   array_push($result, array(
      //     "id" => $row['codigo_conductor'],
      //     "text" => $row['nombre']
      //   ));
      // }

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

  public function actualiza_pid($data) {
    $codigo_conductor = $this->db->escape($data['codigo_conductor']);
    $pid = $this->db->escape($data['pid']);
    $query = $this->db->query("
        UPDATE conductor
        SET player_id = $pid
        WHERE codigo_conductor = $codigo_conductor;
    ");

    if ($query) {
      $respuesta = array(
          "error" => FALSE,
          "message" => "El PID se actualizó correctamente",
          "status" => REST_Controller::HTTP_OK,
          "data" => array(
            "filas_afectadas" => $this->db->affected_rows()
          )
      );
    } else {
      $respuesta = array(
          "error" => TRUE,
          "message" => "Error al actualizar el PID",
          "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
          "data" => $this->db->error()
      );
    }
      return $respuesta;
  }

}
