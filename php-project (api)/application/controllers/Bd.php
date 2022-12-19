<?php
defined('BASEPATH') OR exit('No direct script access allowed');

setlocale(LC_ALL,"es_MX");
date_default_timezone_set('America/Mexico_City');
ini_set("date.timezone", "America/Mexico_City");

error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Access-Control-Allow-Origin: *');

class Bd extends CI_Controller {

  public function __construct() {
      parent::__construct();
      // Load the DB utility class
      $this->load->dbutil();
      // Load the download helper and send the file to your desktop
      $this->load->helper('download');
  }

  public function backup() {

    $name = 'backup_'.date('Y-m-d').'.zip';

    // Options
    $prefs = array(
      'format'        => 'zip',
      'filename'      => 'backup.sql',
      'foreign_key_checks' => TRUE
    );

    // Backup your entire database and assign it to a variable
    $backup = $this->dbutil->backup($prefs);

    // Load the file helper and write the file to your server
    $this->load->helper('file');
    write_file('assets/'.$name, $backup);

    force_download($name, $backup);
  }


  public function clientes() {
    $query = $this->db->query("
      SELECT codigo_cliente, nombre_negocio, nombre_titular, tipo_establecimiento, tipo_cliente,
              tipo_actividad, nombre_calle, numero_exterior, numero_interior, fraccionamiento,
              codigo_postal, m.municipio, m.entidad, zona, telefono, correo_electronico, estatus,
              ST_X(shape) longitud, ST_Y(shape) latitud, rfc, razon_social, fecha_registro,
              comentarios_generales
      FROM cliente
      LEFT JOIN catalogo_municipios m ON estado = m.codigo_entidad AND ciudad = m.codigo_municipio
      WHERE eliminado = 0
      ORDER BY fecha_registro DESC;
    ");
    $data = $this->dbutil->csv_from_result($query);
    force_download('puntos_de_venta.csv', $data);
  }

  public function vendedores() {
    $query = $this->db->query("
      SELECT *
      FROM vendedor
      ORDER BY fecha_registro DESC;
    ");
    $data = $this->dbutil->csv_from_result($query);
    force_download('vendedores.csv', $data);
  }

  public function interacciones() {
    $query = $this->db->query("
      SELECT i.idreg, i.codigo_vendedor, CONCAT(v.nombres, ' ' ,v.apellidos) nombre_vendedor, i.codigo_cliente, c.nombre_negocio,
              c.nombre_titular, i.tipo_interaccion, i.inventario_actual_limon, i.inventario_actual_toronja, i.lote_limon, i.lote_toronja,
              i.fecha_caducidad_limon, i.fecha_caducidad_toronja, i.pop_buen_estado, i.latas_vendidas_limon, i.latas_vendidas_toronja,
              i.latas_regalo_limon, i.latas_regalo_toronja, i.motivo_rechazo, i.comentarios_cliente, i.observaciones_vendedor,
              ST_X(i.ubicacion) longitud, ST_Y(i.ubicacion) latitud, i.fecha_registro
      FROM interaccion i
      LEFT JOIN vendedor v ON i.codigo_vendedor = v.codigo_vendedor
      LEFT JOIN cliente c ON i.codigo_cliente = c.codigo_cliente
      ORDER BY i.fecha_registro DESC, i.codigo_vendedor ASC;
    ");
    $data = $this->dbutil->csv_from_result($query);
    force_download('visitas.csv', $data);
  }

  public function usuarios() {
    $query = $this->db->query("
      SELECT *, NULL as contrasena
      FROM usuario
      ORDER BY idreg ASC;
    ");
    $data = $this->dbutil->csv_from_result($query);
    force_download('usuarios.csv', $data);
  }


}
