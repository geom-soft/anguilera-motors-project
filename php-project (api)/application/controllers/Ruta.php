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

class Ruta extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('ruta_model');
    }

    public function id_get($id) {
        $respuesta = $this->ruta_model->obtener_registro($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function todos_get($id) {
        $respuesta = $this->ruta_model->obtener_registros($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function entrada_get($id) {
        $respuesta = $this->ruta_model->obtener_entradas($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function salida_get($id) {
        $respuesta = $this->ruta_model->obtener_salidas($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function insertar_post() {
      $data = $this->post();
      $obj = $this->ruta_model->llenar_datos($data, "insertar");
      $respuesta = $obj->nuevo_registro();
      $this->response($respuesta, $respuesta['status']);
    }

    public function eliminar_get($id) {
        $respuesta = $this->ruta_model->eliminar_registro($id);
        $this->response($respuesta, $respuesta['status']);
    }



    public function abordar_entrada_post() {
      $data = $this->post();
      $respuesta = $this->ruta_model->abordar_entrada($data);
      $this->response($respuesta, $respuesta['status']);
    }

    public function abordar_salida_post() {
      $data = $this->post();
      $respuesta = $this->ruta_model->abordar_salida($data);
      $this->response($respuesta, $respuesta['status']);
    }


}
