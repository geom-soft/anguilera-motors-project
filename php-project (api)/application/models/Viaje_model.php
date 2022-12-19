<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Viaje_model extends CI_Model
{
  public $idreg;
  public $codigo_cliente;
  public $fecha_servicio;
  public $hora_entrada;
  public $hora_salida;
  public $nombre_ruta;
  public $tipo_servicio;

  public $estatus = "PENDIENTE";

  public $paradas;

  // public $estatus_entrada;
  // public $estatus_salida;

  // public $distancia;
  // public $codigo_conductor;
  // public $fecha_inicio;
  // public $fecha_termino;


  public function __construct() {
      parent::__construct();
      $this->load->database();
      $this->load->helper('push');
  }

  public function llenar_datos($data, $accion) {
      foreach ($data as $nombre_campo => $valor_campo) {
          if (property_exists('Viaje_model', $nombre_campo)) {
              $this->$nombre_campo = ($valor_campo == 'null') ? NULL : $valor_campo;
          }
      }

      return $this;
  }

  public function obtener_viaje($id) {
    $id = $this->db->escape($id);
    $query = $this->db->query("
        SELECT s.*, c.nombre_empresa, IF(s.codigo_conductor IS NULL, 'SIN ASIGNAR', CONCAT(d.nombres, ' ', d.apellidos)) nombre_conductor, NULL as paradas
        FROM servicio s
        LEFT JOIN cliente c ON s.codigo_cliente = c.codigo_cliente
        LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
        WHERE s.idreg = $id;
    ");

    $query2 = $this->db->query("
      SELECT * FROM rutas_servicio WHERE idservicio = $id;
    ");

    if ($query && $query2) {

      $paradas = json_encode($query2->result_array());
      $query->row(0)->paradas = $paradas;

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

  public function obtener_todos() {
      $query = $this->db->query("
        SELECT s.*, c.nombre_empresa, IF(s.codigo_conductor IS NULL, 'SIN ASIGNAR', CONCAT(d.nombres, ' ', d.apellidos)) nombre_conductor
        FROM servicio s
        LEFT JOIN cliente c ON s.codigo_cliente = c.codigo_cliente
        LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
        ORDER BY s.fecha_servicio ASC;
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

  public function obtener_vigentes() {
      $query = $this->db->query("
        SELECT s.*, c.nombre_empresa, IF(s.codigo_conductor IS NULL, 'SIN ASIGNAR', CONCAT(d.nombres, ' ', d.apellidos)) nombre_conductor
        FROM servicio s
        LEFT JOIN cliente c ON s.codigo_cliente = c.codigo_cliente
        LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
        WHERE (s.estatus != 'TERMINADO' AND s.estatus != 'CANCELADO')
        AND s.codigo_conductor IS NOT NULL
        ORDER BY s.fecha_servicio ASC;
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

  public function obtener_filtro($cliente, $estatus) {
      $id = $this->db->escape($cliente);
      $es = $this->db->escape($estatus);

      if ($cliente == 'TODOS') {
        $sqlCliente = "";
      } else {
        $sqlCliente = "AND s.codigo_cliente = $id";
      }

      if ($estatus == 'TODOS') {
        $sqlEstatus = "";
      } else {
        $sqlEstatus = "AND s.estatus = $es";
      }

      $query = $this->db->query("
        SELECT s.*, c.nombre_empresa, IF(s.codigo_conductor IS NULL, 'SIN ASIGNAR', CONCAT(d.nombres, ' ', d.apellidos)) nombre_conductor
        FROM servicio s
        LEFT JOIN cliente c ON s.codigo_cliente = c.codigo_cliente
        LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
        WHERE TRUE $sqlCliente $sqlEstatus
        ORDER BY s.fecha_servicio ASC;
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

  public function obtener_otros() {
      $now = date("Y-m-d H:i:s");
      $f1  = date("Y-m-d H:i:s", strtotime("-15 days", strtotime($now)));


      $query = $this->db->query("
        SELECT s.*, c.nombre_empresa, IF(s.codigo_conductor IS NULL, 'SIN ASIGNAR', CONCAT(d.nombres, ' ', d.apellidos)) nombre_conductor
        FROM servicio s
        LEFT JOIN cliente c ON s.codigo_cliente = c.codigo_cliente
        LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
        WHERE (s.estatus LIKE 'TERMINADO' OR s.estatus LIKE 'CANCELADO')
        AND s.fecha_termino BETWEEN '$f1' AND '$now'
        ORDER BY s.fecha_termino DESC;
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

  public function obtener_vigentes_cliente($id) {
      $id = $this->db->escape($id);
      $query = $this->db->query("
        SELECT s.*, c.nombre_empresa, IF(s.codigo_conductor IS NULL, 'SIN ASIGNAR', CONCAT(d.nombres, ' ', d.apellidos)) nombre_conductor
        FROM servicio s
        LEFT JOIN cliente c ON s.codigo_cliente = c.codigo_cliente
        LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
        WHERE s.codigo_cliente = $id
        AND (s.estatus != 'TERMINADO' AND s.estatus != 'CANCELADO')
        ORDER BY s.fecha_servicio ASC;
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

  public function obtener_otros_cliente($id) {
      $id = $this->db->escape($id);
      $now = date("Y-m-d H:i:s");
      $f1  = date("Y-m-d H:i:s", strtotime("-15 days", strtotime($now)));
      $query = $this->db->query("
        SELECT s.*, c.nombre_empresa, IF(s.codigo_conductor IS NULL, 'SIN ASIGNAR', CONCAT(d.nombres, ' ', d.apellidos)) nombre_conductor
        FROM servicio s
        LEFT JOIN cliente c ON s.codigo_cliente = c.codigo_cliente
        LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
        WHERE s.codigo_cliente = $id
        AND (s.estatus LIKE 'TERMINADO' OR s.estatus LIKE 'CANCELADO')
        AND s.fecha_termino BETWEEN '$f1' AND '$now'
        ORDER BY s.fecha_termino DESC;
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

  public function obtener_viajes_conductor($id) {
      $id = $this->db->escape($id);
      $query = $this->db->query("
        SELECT s.*, IFNULL(c.nombre_empresa, 'Cliente no disp.') nombre_empresa, COUNT(rs.idreg) rutas
        FROM servicio s
        LEFT JOIN cliente c ON s.codigo_cliente = c.codigo_cliente
        LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
        LEFT JOIN rutas_servicio rs ON s.idreg = rs.idservicio
        WHERE s.codigo_conductor = $id AND s.estatus != 'TERMINADO' AND s.estatus != 'CANCELADO'
        GROUP BY s.idreg
        ORDER BY FIELD(s.estatus, 'INICIADO', 'ACEPTADO', 'PENDIENTE'), s.fecha_servicio ASC;
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

  public function obtener_historial_conductor($data) {
      $codigo_conductor = $this->db->escape($data['code']);
      $fecha1 = $data['fecha1'];
      $fecha2 = $data['fecha2'];
      $query = $this->db->query("
        SELECT s.*, c.nombre_empresa
        FROM servicio s
        LEFT JOIN cliente c ON s.codigo_cliente = c.codigo_cliente
        LEFT JOIN conductor d ON s.codigo_conductor = d.codigo_conductor
        WHERE s.codigo_conductor = $codigo_conductor
        AND s.fecha_servicio BETWEEN '$fecha1 00:00:00' AND '$fecha2 23:59:00'
        AND s.estatus = 'TERMINADO'
        ORDER BY s.fecha_servicio ASC;
      ");

      if($query){
          $respuesta = array(
              "error" => FALSE,
              "message" => "Consulta correcta",
              "status" => REST_Controller::HTTP_OK,
              "data" => array(
                // "sql" => $this->db->last_query(),
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

  public function obtener_no_asignados() {
      $query = $this->db->query("
        SELECT s.*, c.nombre_empresa
        FROM servicio s
        LEFT JOIN cliente c ON s.codigo_cliente = c.codigo_cliente
        WHERE s.estatus = 'PENDIENTE'
        AND s.codigo_conductor IS  NULL
        ORDER BY s.fecha_servicio ASC;
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


  public function nuevo_viaje() {

      $objParadas = json_decode($this->paradas, TRUE);
      unset($this->paradas);

      unset($this->idreg);
      $nuevo = $this->db->insert('servicio', $this);

      $idserv = $this->db->insert_id();

      foreach($objParadas as $item) {

        if (strpos($item['tipo_parada'], 'ENTRADA') !== FALSE) {
          $this->db->query("UPDATE servicio SET estatus_entrada = 'PENDIENTE' WHERE idreg = '".$idserv."';");
        }
        if (strpos($item['tipo_parada'], 'SALIDA') !== FALSE) {
          $this->db->query("UPDATE servicio SET estatus_salida = 'PENDIENTE' WHERE idreg = '".$idserv."';");
        }

        $this->db->insert('rutas_servicio', array(
          "idservicio" => $idserv,
          "idnomina" => $item['idnomina'],
          "nombre_solicitante" => $item['nombre_solicitante'],
          "alias_lugar" => $item['alias_lugar'],
          "tipo_parada" => $item['tipo_parada'],
          "hora_recoleccion_entrada" => $item['hora_recoleccion_entrada'] ? $item['hora_recoleccion_entrada'] : null,
          "hora_recoleccion_salida" => $item['hora_recoleccion_salida'] ? $item['hora_recoleccion_salida'] : null
        ));
      }

      if($nuevo){

        // aqui se manda una notificacion push al conductor avisando Nuevo Servicio
        // $qNotify = $this->db->query("SELECT player_id FROM conductor WHERE codigo_conductor = '$this->codigo_conductor';");
        // sendPushPlayers('Nuevo servicio', 'Te han asignado un nuevo servicio.', [ $qNotify->row_array(0)['player_id'] ], $this->idreg);

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

  public function actualiza_viaje() {

    // aqui se valida si el codigo de conductor cambió para enviar notificacion al nuevo conductor de Nuevo Servicio
    $noty = FALSE;
    // $qNotify = $this->db->query("SELECT codigo_conductor FROM servicio WHERE idreg = '$this->idreg';");
    // if ($this->codigo_conductor != $qNotify->row_array(0)['codigo_conductor']) {
    //   $noty = TRUE;
    //   $qNotify = $this->db->query("SELECT player_id FROM conductor WHERE codigo_conductor = '$this->codigo_conductor';");
    //   sendPushPlayers('Nuevo servicio', 'Te han asignado un nuevo servicio.', [ $qNotify->row_array(0)['player_id'] ], $this->idreg);
    // }

      $this->db->where('idservicio', $this->idreg);
      $this->db->delete('rutas_servicio');
      $this->db->query("UPDATE servicio SET estatus_entrada = null, estatus_salida = null WHERE idreg = '".$this->idreg."';");

      $objParadas = json_decode($this->paradas, TRUE);
      unset($this->paradas);
      foreach($objParadas as $item) {

        if (strpos($item['tipo_parada'], 'ENTRADA') !== FALSE) {
          $this->db->query("UPDATE servicio SET estatus_entrada = 'PENDIENTE' WHERE idreg = '".$this->idreg."';");
        }
        if (strpos($item['tipo_parada'], 'SALIDA') !== FALSE) {
          $this->db->query("UPDATE servicio SET estatus_salida = 'PENDIENTE' WHERE idreg = '".$this->idreg."';");
        }

        $this->db->insert('rutas_servicio', array(
          "idservicio" => $this->idreg,
          "idnomina" => $item['idnomina'],
          "nombre_solicitante" => $item['nombre_solicitante'],
          "alias_lugar" => $item['alias_lugar'],
          "tipo_parada" => $item['tipo_parada'],
          "hora_recoleccion" => $item['hora_recoleccion']
        ));
      }


      $where = "idreg = ".$this->db->escape($this->idreg);
      $query = $this->db->update_string('servicio', $this, $where);
      $modifica = $this->db->query($query);

      if($modifica){
          $respuesta = array(
              "error" => FALSE,
              "message" => "El registro fue actualizado correctamente",
              "status" => REST_Controller::HTTP_OK,
              "data" => array(
                "results" => array(
                    "filas_afectadas" => $this->db->affected_rows(),
                    "notificado" => $noty
                )
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

  public function cancela_viaje($id) {
    $id = $this->db->escape($id);
    $query = $this->db->query("
        UPDATE servicio
        SET estatus = 'CANCELADO', fecha_inicio = NOW(), fecha_termino = NOW()
        WHERE idreg = $id;
    ");

    // Notifica al conductor
    $qNotify = $this->db->query("
      SELECT player_id
      FROM conductor
      WHERE codigo_conductor = (SELECT codigo_conductor FROM servicio WHERE idreg = $id);
    ");
    sendPushPlayers('Servicio cancelado', 'Se ha cancelado un servicio que tenías asignado.', [ $qNotify->row_array(0)['player_id'] ]);

    if ($query) {
      $respuesta = array(
          "error" => FALSE,
          "message" => "El registro fue cancelado correctamente",
          "status" => REST_Controller::HTTP_OK,
          "data" => array(
            "filas_afectadas" => $this->db->affected_rows()
          )
      );
    } else {
      $respuesta = array(
          "error" => TRUE,
          "message" => "Error al cancelado el registro",
          "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
          "data" => $this->db->error()
      );
    }
      return $respuesta;
  }

  public function estatus_viaje($data) {
    $id = $this->db->escape($data['idservicio']);
    $estatus = $this->db->escape($data['estatus']);

    $check = $this->db->query("SELECT estatus_entrada, estatus_salida FROM servicio WHERE idreg = $id;");
    $ee = $check->row_array(0)['estatus_entrada'];
    $es = $check->row_array(0)['estatus_salida'];

    // estatus iniciado y terminado guardan la hora en el registro
    switch ($data['estatus']) {
      case 'INICIADO':
        if ($ee == 'PENDIENTE') {
          $query = $this->db->query("UPDATE servicio SET estatus = $estatus, fecha_inicio = NOW(), estatus_entrada = 'EN PROCESO' WHERE idreg = $id;");
        } else {
          if ($es == 'PENDIENTE') {
            $query = $this->db->query("UPDATE servicio SET estatus = $estatus, fecha_inicio = NOW(), estatus_salida = 'EN PROCESO' WHERE idreg = $id;");
          }
        }
        break;
      case 'TERMINADO':
        if ($ee == 'EN PROCESO') {
          $query = $this->db->query("UPDATE servicio SET estatus = $estatus, fecha_termino = NOW(), estatus_entrada = 'TERMINADO' WHERE idreg = $id;");
        } else {
          $query = $this->db->query("UPDATE servicio SET estatus = $estatus, fecha_termino = NOW(), estatus_salida = 'TERMINADO' WHERE idreg = $id;");
        }
        break;
      default:            $query = $this->db->query("UPDATE servicio SET estatus = $estatus WHERE idreg = $id;"); break;
    }

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

  public function estatus_viaje_intermedio($data) {
    $id = $this->db->escape($data['idservicio']);
    $query = $this->db->query("UPDATE servicio SET estatus_entrada = 'TERMINADO', estatus_salida = 'EN PROCESO' WHERE idreg = $id;");
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

  public function declinar_viaje($data) {
    $id = $this->db->escape($data['idservicio']);
    $conductor = $this->db->escape($data['conductor']);
    $nuevo_conductor = $this->db->escape($data['nuevo_conductor']);

    $query = $this->db->query("
      UPDATE servicio
      SET estatus = 'ASIGNADO', codigo_conductor = $nuevo_conductor
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

  public function obtiene_log($id) {

    $id = $this->db->escape($id);
    $query = $this->db->query("
        SELECT ls.fecha_registro, ls.estatus, ls.notas, x.nombre
        FROM log_servicios ls
        LEFT JOIN (
          SELECT codigo_usuario codigo, CONCAT(nombres, ' ', apellidos) nombre FROM usuario
          UNION
          SELECT codigo_conductor codigo, CONCAT(nombres, ' ', apellidos) nombre FROM conductor
          UNION
          SELECT codigo_cliente codigo, nombre_empresa nombre FROM cliente
        ) as x ON ls.codigo_usuario = x.codigo
        WHERE idservicio = $id
        ORDER BY fecha_registro ASC;
    ");

    if ($query) {
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

  public function crea_log($data) {

    $insert = $this->db->insert('log_servicios', $data);

    if ($insert) {
      $respuesta = array(
          "error" => FALSE,
          "message" => "El log fue creado correctamente",
          "status" => REST_Controller::HTTP_OK,
          "data" => array(
            "results" => $this->db->insert_id()
          )
      );
    } else {
      $respuesta = array(
          "error" => TRUE,
          "message" => "Error al crear el log",
          "status" => REST_Controller::HTTP_INTERNAL_SERVER_ERROR,
          "data" => $this->db->error()
      );
    }
      return $respuesta;
  }

  public function eliminar_viaje($id) {
    $id = $this->db->escape($id);
    $query = $this->db->query("
        DELETE FROM servicio WHERE idreg = $id;
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

  public function asignar_viaje($data) {
    $id = $this->db->escape($data['idservicio']);
    $conductor = $this->db->escape($data['conductor']);

    $query = $this->db->query("
      UPDATE servicio
      SET codigo_conductor = $conductor, estatus = 'ASIGNADO'
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

  public function today() {
    $today = date("Y-m-d");
      $query = $this->db->query("
        SELECT r.*, ST_X(p.ubicacion) lng, ST_Y(p.ubicacion) lat
        FROM rutas_servicio r
        LEFT JOIN cat_personal_clientes p ON r.idnomina = p.numero_nomina
        LEFT JOIN servicio s ON r.idservicio = s.idreg
        WHERE p.ubicacion IS NOT NULL
        AND s.fecha_servicio = '$today';
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
