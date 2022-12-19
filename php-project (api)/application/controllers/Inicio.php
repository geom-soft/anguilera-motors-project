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

class Inicio extends REST_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('inicio_model');
    }

    public function ventas_get() {
        $respuesta = $this->inicio_model->obtener_ventas_mes();
        $this->response($respuesta, $respuesta['status']);
    }

    public function clientes_get() {
        $respuesta = $this->inicio_model->obtener_clientes_total();
        $this->response($respuesta, $respuesta['status']);
    }

    public function vendedores_get() {
        $respuesta = $this->inicio_model->obtener_vendedores_total();
        $this->response($respuesta, $respuesta['status']);
    }

    public function ventas_dia_get() {
        $respuesta = $this->inicio_model->obtener_ventas_dia();
        $this->response($respuesta, $respuesta['status']);
    }

}
