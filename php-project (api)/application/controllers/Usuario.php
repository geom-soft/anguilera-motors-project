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

class Usuario extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('usuario_model');
    }

    public function id_get($id) {
        $respuesta = $this->usuario_model->obtener_usuario($id);
        $this->response($respuesta, $respuesta['status']);
    }

    public function todos_get() {
        $respuesta = $this->usuario_model->obtener_usuarios();
        $this->response($respuesta, $respuesta['status']);
    }

    public function insertar_post() {
      $data = $this->post();

      $this->load->library('form_validation');
      $this->form_validation->set_data($data);

      if($this->form_validation->run('usuario_insert')){

          $obj = $this->usuario_model->llenar_datos($data, "insertar");
          $respuesta = $obj->nuevo_usuario();

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

      if($this->form_validation->run('usuario_update')){

          $obj = $this->usuario_model->llenar_datos($data, "actualizar");
          $respuesta = $obj->actualiza_usuario();

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
        $respuesta = $this->usuario_model->estatus_usuario($id, 3);
        $this->response($respuesta, $respuesta['status']);
    }

    public function reset_get($id) {
        $respuesta = $this->usuario_model->restaurar_contrasena($id);
        $this->response($respuesta, $respuesta['status']);
    }

    // public function login_post() {
    //   $data = $this->post();
    //   $respuesta = $this->usuario_model->iniciar_sesion($data);
    //   $this->response($respuesta, $respuesta['status']);
    // }

    public function perfil_post() {
      $data = $this->post();
      $respuesta = $this->usuario_model->actualiza_perfil($data);
      $this->response($respuesta, $respuesta['status']);
    }

}
