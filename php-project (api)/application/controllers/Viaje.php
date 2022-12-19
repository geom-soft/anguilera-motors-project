<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

setlocale(LC_ALL,"es_MX");
date_default_timezone_set('America/Mexico_City');
ini_set("date.timezone", "America/Mexico_City");

// error_reporting(E_ALL & ~E_NOTICE);
// ini_set('display_errors', 0);
// ini_set('log_errors', 1);

header('Access-Control-Allow-Origin: *');

class Viaje extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('viaje_model');
    }

    public function id_get($id) {
        $respuesta = $this->viaje_model->obtener_viaje($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function todos_get() {
        $respuesta = $this->viaje_model->obtener_todos();
        $this->response($respuesta, $respuesta['status']);
    }

    public function vigentes_get() {
        $respuesta = $this->viaje_model->obtener_vigentes();
        $this->response($respuesta, $respuesta['status']);
    }

    public function filtro_get($cliente, $estatus) {
        $respuesta = $this->viaje_model->obtener_filtro($cliente, $estatus);
        $this->response($respuesta, $respuesta['status']);
    }

    public function otros_get() {
        $respuesta = $this->viaje_model->obtener_otros();
        $this->response($respuesta, $respuesta['status']);
    }

    public function vigentes_cliente_get($id) {
        $respuesta = $this->viaje_model->obtener_vigentes_cliente($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function otros_cliente_get($id) {
        $respuesta = $this->viaje_model->obtener_otros_cliente($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function conductor_get($id) {
        $respuesta = $this->viaje_model->obtener_viajes_conductor($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function historial_post() {
        $data = $this->post();
        $respuesta = $this->viaje_model->obtener_historial_conductor($data);
        $this->response($respuesta, $respuesta['status']);
    }

    public function no_asignados_get() {
        $respuesta = $this->viaje_model->obtener_no_asignados();
        $this->response($respuesta, $respuesta['status']);
    }

    public function insertar_post() {
      $data = $this->post();

      $this->load->library('form_validation');
      $this->form_validation->set_data($data);

      if($this->form_validation->run('viaje_insert')){

          $obj = $this->viaje_model->llenar_datos($data, "insertar");
          $respuesta = $obj->nuevo_viaje();

      }else{
          $respuesta = array(
              "error" => TRUE,
              "message" => "Error de validación en campos de formulario",
              "status" => REST_Controller::HTTP_BAD_REQUEST,
              "data" => $this->form_validation->error_array()
          );
      }

      $this->response($respuesta, $respuesta['status']);
    }

    public function actualizar_post() {
      $data = $this->post();
      //$this->response($data, 200);exit;

      $this->load->library('form_validation');
      $this->form_validation->set_data($data);

      if($this->form_validation->run('viaje_update')){

          $obj = $this->viaje_model->llenar_datos($data, "actualizar");
          $respuesta = $obj->actualiza_viaje();

      }else{
          $respuesta = array(
              "error" => TRUE,
              "message" => "Error de validación en campos de formulario",
              "status" => REST_Controller::HTTP_BAD_REQUEST,
              "data" => $this->form_validation->error_array()
          );
      }

      $this->response($respuesta, $respuesta['status']);
    }

    public function cancelar_get($id) {
        $respuesta = $this->viaje_model->cancela_viaje($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function estatus_post() {
        $data = $this->post();
        $respuesta = $this->viaje_model->estatus_viaje($data);
        $this->response($respuesta, $respuesta['status']);
    }

    public function estatus_intermedio_post() {
        $data = $this->post();
        $respuesta = $this->viaje_model->estatus_viaje_intermedio($data);
        $this->response($respuesta, $respuesta['status']);
    }

    public function declinar_post() {
        $data = $this->post();
        $respuesta = $this->viaje_model->declinar_viaje($data);
        $this->response($respuesta, $respuesta['status']);
    }

    public function log_get ($id) {
      $respuesta = $this->viaje_model->obtiene_log($id);
      $this->response($respuesta, $respuesta['status']);
    }

    public function log_post () {
      $data = $this->post();
      $respuesta = $this->viaje_model->crea_log($data);
      $this->response($respuesta, $respuesta['status']);
    }

    public function eliminar_get($id) {
        $respuesta = $this->viaje_model->eliminar_viaje($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function asignar_post() {
        $data = $this->post();
        $respuesta = $this->viaje_model->asignar_viaje($data);
        $this->response($respuesta, $respuesta['status']);
    }

    public function today_get() {
        $respuesta = $this->viaje_model->today();
        $this->response($respuesta, $respuesta['status']);
    }


}
