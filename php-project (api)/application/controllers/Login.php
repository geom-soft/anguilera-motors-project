<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

header('Access-Control-Allow-Origin: *');

setlocale(LC_ALL,"es_MX");
date_default_timezone_set('America/Mexico_City');
ini_set("date.timezone", "America/Mexico_City");

error_reporting(E_ALL & ~E_NOTICE);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

class Login extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('login_model');
    }

    public function index_post() {
      $data = $this->post();
      $respuesta = $this->login_model->iniciar_sesion($data);
      $this->response($respuesta, $respuesta['status']);
    }

    public function conductor_post() {
      $data = $this->post();
      $respuesta = $this->login_model->sesion_conductor($data);
      $this->response($respuesta, $respuesta['status']);
    }

}
