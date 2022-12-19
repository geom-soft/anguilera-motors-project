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

class Cliente extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('cliente_model');
    }

    public function id_get($id) {
        $respuesta = $this->cliente_model->obtener_cliente($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function todos_get() {
        $respuesta = $this->cliente_model->obtener_clientes();
        $this->response($respuesta, $respuesta['status']);
    }

    public function insertar_post() {
      $data = $this->post();

      $this->load->library('form_validation');
      $this->form_validation->set_data($data);

      if($this->form_validation->run('cliente_insert')){

          $obj = $this->cliente_model->llenar_datos($data, "insertar");
          $respuesta = $obj->nuevo_cliente();

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

      if($this->form_validation->run('cliente_update')){

          $obj = $this->cliente_model->llenar_datos($data, "actualizar");
          $respuesta = $obj->actualiza_cliente();

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

    public function eliminar_get($id) {
        $respuesta = $this->cliente_model->estatus_cliente($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function reset_get($id) {
        $respuesta = $this->cliente_model->restaurar_contrasena($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function perfil_post() {
      $data = $this->post();
      $respuesta = $this->cliente_model->actualiza_perfil($data);
      $this->response($respuesta, $respuesta['status']);
    }

    public function select2_get() {
        $respuesta = $this->cliente_model->select2_clientes();
        $this->response($respuesta, $respuesta['status']);
    }




    public function personal_get($id) {
        $respuesta = $this->cliente_model->obtener_personal($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function datos_persona_get($id) {
        $respuesta = $this->cliente_model->obtener_datos_persona($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function datos_persona_nomina_get($cliente, $nomina) {
        $respuesta = $this->cliente_model->obtener_datos_persona_nomina($cliente, $nomina);
        $this->response($respuesta, $respuesta['status']);
    }

    public function insertar_persona_post() {
      $data = $this->post();
      $respuesta = $this->cliente_model->insertar_persona($data);
      $this->response($respuesta, $respuesta['status']);
    }

    public function actualizar_persona_post() {
      $data = $this->post();
      $respuesta = $this->cliente_model->actualizar_persona($data);
      $this->response($respuesta, $respuesta['status']);
    }

    public function eliminar_persona_get($id) {
        $respuesta = $this->cliente_model->eliminar_persona($id);
        $this->response($respuesta, $respuesta['status']);
    }

}
