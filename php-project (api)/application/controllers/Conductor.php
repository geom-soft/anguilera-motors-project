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

class Conductor extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('conductor_model');
    }

    public function id_get($id) {
        $respuesta = $this->conductor_model->obtener_conductor($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function todos_get() {
        $respuesta = $this->conductor_model->obtener_conductores();
        $this->response($respuesta, $respuesta['status']);
    }

    public function insertar_post() {
      $data = $this->post();

      $this->load->library('form_validation');
      $this->form_validation->set_data($data);

      if($this->form_validation->run('conductor_insert')){

          $obj = $this->conductor_model->llenar_datos($data, "insertar");
          $respuesta = $obj->nuevo_conductor();

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

      if($this->form_validation->run('conductor_update')){

          $obj = $this->conductor_model->llenar_datos($data, "actualizar");
          $respuesta = $obj->actualiza_conductor();

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
        $respuesta = $this->conductor_model->estatus_conductor($id, 3);
        $this->response($respuesta, $respuesta['status']);
    }

    public function reset_get($id) {
        $respuesta = $this->conductor_model->restaurar_contrasena($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function perfil_post() {
      $data = $this->post();
      $respuesta = $this->conductor_model->actualiza_perfil($data);
      $this->response($respuesta, $respuesta['status']);
    }

    public function select2_get() {
        $respuesta = $this->conductor_model->select2_conductores();
        $this->response($respuesta, $respuesta['status']);
    }

    public function pid_post() {
      $data = $this->post();
      $respuesta = $this->conductor_model->actualiza_pid($data);
      $this->response($respuesta, $respuesta['status']);
    }

}
