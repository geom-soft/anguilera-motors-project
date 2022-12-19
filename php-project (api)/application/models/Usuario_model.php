<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Usuario_model extends CI_Model
{
  //public $idreg;
  public $codigo_usuario;
  public $nombres;
  public $apellidos;
  public $correo_electronico = "ND";
  public $contrasena;
  public $estatus;

  public function __construct() {
      parent::__construct();
      $this->load->database();
  }

  public function llenar_datos($data, $accion) {
      foreach ($data as $nombre_campo => $valor_campo) {
          if (property_exists('Usuario_model', $nombre_campo)) {
              $this->$nombre_campo = ($valor_campo == 'null') ? NULL : $valor_campo;
          }
      }

      // bloque genera codigos
      $this->load->helper('token');
      $this->codigo_usuario = ($accion == "insertar") ? generateToken(10) : $this->codigo_usuario;
      if ($this->codigo_usuario == null) {
          unset($this->codigo_usuario);
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

  public function obtener_usuario($id) {
    $id = $this->db->escape($id);
    $query = $this->db->query("
        SELECT *
        FROM usuario
        WHERE codigo_usuario = $id;
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

  public function obtener_usuarios() {
    // estatus 1, usuario activo
    // estatus 2, usuario inhabilitado
    // estatus 3, usuario eliminado del sistema
      $query = $this->db->query("
        SELECT codigo_usuario, nombres, apellidos, correo_electronico, estatus
        FROM usuario
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

  public function nuevo_usuario() {
      $nuevo = $this->db->insert('usuario', $this);
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

  public function actualiza_usuario() {
      $where = "codigo_usuario = ".$this->db->escape($this->codigo_usuario);
      $query = $this->db->update_string('usuario', $this, $where);
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

  public function estatus_usuario($id, $estatus) {
    // simula la eliminacion de un registro actualizando el estatus 3
    $id = $this->db->escape($id);
    $estatus = $this->db->escape($estatus);
    $query = $this->db->query("
        UPDATE usuario
        SET estatus = $estatus
        WHERE codigo_usuario = $id;
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
        UPDATE usuario
        SET contrasena = MD5('1234')
        WHERE codigo_usuario = $id;
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

  // public function iniciar_sesion($data) {
  //   $codigo_usuario = $this->db->escape($data['codigo_usuario']);
  //   $nip = $this->db->escape(md5($data['nip']));
  //   $query = $this->db->query("
  //     SELECT codigo_usuario, nombres, apellidos
  //     FROM usuario
  //     WHERE codigo_usuario=$codigo_usuario
  //     AND contrasena=$nip
  //     AND estatus = 1;
  //   ");
  //
  //   if ($query) {
  //       $respuesta = array(
  //           "error" => FALSE,
  //           "message" => "Consulta correcta",
  //           "status" => REST_Controller::HTTP_OK,
  //           "data" => array(
  //               "fields" => $query->num_fields(),
  //               "rows" => $query->num_rows(),
  //               "results" => $query->row_array(0)
  //               )
  //       );
  //   } else {
  //       $respuesta = array(
  //           "error" => TRUE,
  //           "message" => "Consulta incorrecta",
  //           "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
  //           "data" => $this->db->error()
  //       );
  //   }
  //
  //   return $respuesta;
  // }

  public function actualiza_perfil($data) {
    $codigo_usuario = $this->db->escape($data['codigo_usuario']);
    $nip = $this->db->escape(md5($data['contrasena']));
    $query = $this->db->query("
        UPDATE usuario
        SET contrasena = $nip
        WHERE codigo_usuario = $codigo_usuario;
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

}
