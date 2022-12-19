<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

setlocale(LC_ALL,"es_MX");
date_default_timezone_set('America/Mexico_City');
ini_set("date.timezone", "America/Mexico_City");

error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

header('Access-Control-Allow-Origin: *');

class Reporte extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('reporte_model');
    }

    public function listado_servicios_post() {
        $data = $this->post();
        $respuesta = $this->reporte_model->reporte_listado_servicios($data);
        $this->response($respuesta, $respuesta['status']);
    }

    public function servicios_conductores_post() {
        $data = $this->post();
        $respuesta = $this->reporte_model->reporte_servicios_conductores($data);
        $this->response($respuesta, $respuesta['status']);
    }

    public function servicios_clientes_post() {
        $data = $this->post();
        $respuesta = $this->reporte_model->reporte_servicios_clientes($data);
        $this->response($respuesta, $respuesta['status']);
    }



    public function rutas_conductor_post() {
      $data = $this->post();
      $respuesta = $this->reporte_model->lista_rutas_conductor($data);
      $this->response($respuesta, $respuesta['status']);
    }

    public function personalizado_post() {
      $data = $this->post();
      $respuesta = $this->reporte_model->reporte_personalizado($data);
      $this->response($respuesta, $respuesta['status']);
    }


}
