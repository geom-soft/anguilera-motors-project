<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Cliente_model extends CI_Model
{
  //public $idreg;
  public $codigo_cliente;
  public $nombre_empresa;
  public $nombre_titular = "No proporcionado";
  public $telefono;
  public $domicilio;
  public $usuario_acceso;
  public $contrasena;
  public $eliminado = 0;


  public function __construct() {
      parent::__construct();
      $this->load->database();
  }

  public function llenar_datos($data, $accion) {
      foreach ($data as $nombre_campo => $valor_campo) {
          if (property_exists('Cliente_model', $nombre_campo)) {
              $this->$nombre_campo = ($valor_campo == 'null') ? NULL : $valor_campo;
          }
      }

      // bloque asigna codigos
      $this->load->helper('token');
      $this->codigo_cliente = ($accion == "insertar") ? generateToken(12) : $this->codigo_cliente;
      if ($this->codigo_cliente == null) {
          unset($this->codigo_cliente);
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

  public function obtener_cliente($id) {
    $id = $this->db->escape($id);
    $query = $this->db->query("
        SELECT *
        FROM cliente c
        WHERE c.codigo_cliente = $id;
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

  public function obtener_clientes() {
      $query = $this->db->query("
        SELECT c.codigo_cliente, c.nombre_empresa, c.nombre_titular, c.telefono
        FROM cliente c
        WHERE c.eliminado = 0
        ORDER BY c.nombre_empresa ASC;
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


  public function nuevo_cliente() {

      $nuevo = $this->db->insert('cliente', $this);
      if($nuevo){
          $respuesta = array(
              "error" => FALSE,
              "message" => "El registro fue insertado correctamente",
              "status" => REST_Controller::HTTP_OK,
              "data" => array(
                "results" => $this->codigo_cliente
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

  public function actualiza_cliente() {

      $where = "codigo_cliente = ".$this->db->escape($this->codigo_cliente);
      $query = $this->db->update_string('cliente', $this, $where);
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

  public function estatus_cliente($id) {
    // simula la eliminacion de un registro actualizando el estatus eliminado a 1
    $id = $this->db->escape($id);
    $query = $this->db->query("
        UPDATE cliente
        SET eliminado = 1
        WHERE codigo_cliente = $id;
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
        UPDATE cliente
        SET contrasena = MD5('1234')
        WHERE codigo_cliente = $id;
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
    $codigo_conductor = $this->db->escape($data['codigo_cliente']);
    $nip = $this->db->escape(md5($data['contrasena']));
    $query = $this->db->query("
        UPDATE cliente
        SET contrasena = $nip
        WHERE codigo_cliente = $codigo_conductor;
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

  public function select2_clientes() {
      $query = $this->db->query("
        SELECT codigo_cliente as id, nombre_empresa as text
        FROM cliente
        WHERE eliminado = 0
        ORDER BY nombre_empresa ASC;
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

  public function obtener_personal($id) {
      $id = $this->db->escape($id);
      $query = $this->db->query("
        SELECT *, idreg as id, nombre_solicitante as text, null as ubicacion
        FROM cat_personal_clientes
        WHERE codigo_cliente = $id
        ORDER BY nombre_solicitante ASC;
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

  public function obtener_datos_persona($id) {
      $id = $this->db->escape($id);
      $query = $this->db->query("
        SELECT *, null as ubicacion, ST_X(ubicacion) longitud, ST_Y(ubicacion) latitud
        FROM cat_personal_clientes
        WHERE idreg = $id;
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

  public function obtener_datos_persona_nomina($cliente, $nomina) {
      $cliente = $this->db->escape($cliente);
      $nomina = $this->db->escape($nomina);
      $query = $this->db->query("
        SELECT *, null as ubicacion, ST_X(ubicacion) longitud, ST_Y(ubicacion) latitud
        FROM cat_personal_clientes
        WHERE codigo_cliente = $cliente AND numero_nomina = $nomina;
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

  public function insertar_persona($data) {

    $data['ubicacion'] = "GeometryFromText('POINT(".$data['longitud']." ".$data['latitud'].")')";
    unset($data['longitud']);
    unset($data['latitud']);

    $nuevo = $this->db->query("
      INSERT INTO cat_personal_clientes(codigo_cliente, nombre_solicitante, telefono_solicitante, numero_nomina, ubicacion, alias_lugar, domicilio)
      VALUES ('".$data['codigo_cliente']."', '".$data['nombre_solicitante']."', '".$data['telefono_solicitante']."', '".$data['numero_nomina']."', ".$data['ubicacion'].", '".$data['alias_lugar']."', '".$data['domicilio']."');
    ");

    if ($nuevo) {
      $respuesta = array(
          "error" => FALSE,
          "message" => "El registro se insertó correctamente",
          "status" => REST_Controller::HTTP_OK,
          "data" => array(
            "filas_afectadas" => $this->db->affected_rows()
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

  public function actualizar_persona($data) {

      $data['ubicacion'] = "GeometryFromText('POINT(".$data['longitud']." ".$data['latitud'].")')";
      unset($data['longitud']);
      unset($data['latitud']);

      $modifica = $this->db->query("
        UPDATE cat_personal_clientes
        SET nombre_solicitante = '".$data['nombre_solicitante']."',
            telefono_solicitante = '".$data['telefono_solicitante']."',
            numero_nomina = '".$data['numero_nomina']."',
            ubicacion = ".$data['ubicacion'].",
            alias_lugar = '".$data['alias_lugar']."',
            domicilio = '".$data['domicilio']."'
        WHERE idreg = '".$data['idreg']."';
      ");

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

  public function eliminar_persona($id) {
    $id = $this->db->escape($id);
    $query = $this->db->query("
        DELETE FROM cat_personal_clientes
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
          "message" => "Error al eliminar el registro",
          "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
          "data" => $this->db->error()
      );
    }
      return $respuesta;
  }

}
