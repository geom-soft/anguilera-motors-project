<?php
defined('BASEPATH') OR exit('No direct script access allowed');

setlocale(LC_ALL,"es_MX");
date_default_timezone_set('America/Mexico_City');
ini_set("date.timezone", "America/Mexico_City");

// error_reporting(E_ALL & ~E_NOTICE);
// ini_set('display_errors', 0);
// ini_set('log_errors', 1);

header('Access-Control-Allow-Origin: *');

require APPPATH.'/libraries/REST_Controller.php';

class Importar extends REST_Controller {

	public function __construct() {
			parent::__construct();
			$this->load->database();
	}

	public function excel_post($codigo_cliente, $codigo_usuario = NULL) {

    //Configura el Upload
    $config['upload_path']          = './uploads/';
    $config['allowed_types']        = 'xlsx';
    $config['max_size']             = 2048; //Kb
    $config['multi']                = 'all';

    $this->load->library('upload', $config);

    //Ejecuta la carga y valida
    if (!$this->upload->do_upload('files')) {
        $respuesta = array(
            "error" => TRUE,
            "message" => "El archivo no se ha cargado correctamente",
            "status" => 200, //manda 200 y no 404 para que valide el ajax el error
            "data" => array(
              "reporte" => $this->upload->display_errors(),
              "archivo" => "N/D"
            )
        );
    } else {
      $archivo = $this->upload->data()['file_name'];
      $ruta = $config['upload_path'].$archivo;


      // aqui extrae los registros del archivo  - helper xlsx
      $this->load->helper('xlsx');
      $excel = extraeRegistros($ruta);

      //Borra el archivo despues de leer
      unlink($ruta);

      // validaciones
      if($excel == FALSE) {

        $respuesta = array(
          "error" => TRUE,
          "message" => "El archivo no se ha podido leer, es posible que esté dañado o no tenga el formato correspondiente.",
          "status" => 200, //manda 200 y no 404 para que valide el ajax el error
          "data" => NULL
        );

      } else {

        // Inserta los registros a la BD
        $tot = 0;
        foreach ($excel as $service) {
          $tot++;
          $nuevo = $this->db->insert('servicio', array(
            "codigo_cliente" => $codigo_cliente,
            "fecha_servicio" => $service['fecha']
          ));
          $id_serv = $this->db->insert_id();
          foreach ($service['rutas'] as $ruta) {
            $insert = $this->db->insert('rutas_servicio', array(
              "idservicio" => $id_serv,
              "nombre_solicitante" => $ruta['nombre'],
              "telefono_solicitante" => $ruta['telefono'],
              "numero_nomina" => $ruta['nomina'],
              "lugar_parada" => $ruta['lugar'],
              "domicilio_parada" => $ruta['domicilio']
            ));
          }
					// crea log del servicio agregado
					if ($codigo_usuario == NULL) {
						$tipo = 'CLIENTE';
						$codigo = $codigo_cliente;
					} else {
						$tipo = 'ADMIN';
						$codigo = $codigo_usuario;
					}
					$log = $this->db->insert('log_servicios', array(
						"idservicio" => $id_serv,
						"estatus" => 'PENDIENTE',
						"codigo_usuario" => $codigo,
						"tipo_usuario" => $tipo,
						"notas" => 'CREADO CORRECTAMENTE'
					));
        }

        $respuesta = array(
          "error" => FALSE,
          "message" => "Los servicios fueron importados correctamente",
          "status" => 200, //manda 200 y no 404 para que valide el ajax el error
          "data" => array(
            "total" => $tot
          )
        );

      }
    }

    $this->response($respuesta, $respuesta['status']);

	}



	public function servicios_post($codigo_cliente) {

    //Configura el Upload
    $config['upload_path']          = './uploads/';
    $config['allowed_types']        = 'xlsx';
    $config['max_size']             = 2048; //Kb
    $config['multi']                = 'all';

    $this->load->library('upload', $config);

    //Ejecuta la carga y valida
    if (!$this->upload->do_upload('files')) {
        $respuesta = array(
            "error" => TRUE,
            "message" => "El archivo no se ha cargado correctamente",
            "status" => 200, //manda 200 y no 404 para que valide el ajax el error
            "data" => array(
              "reporte" => $this->upload->display_errors(),
              "archivo" => "N/D"
            )
        );
    } else {
      $archivo = $this->upload->data()['file_name'];
      $ruta = $config['upload_path'].$archivo;


      // aqui extrae los registros del archivo  - helper xlsx
      $this->load->helper('xlsx');
      $excel = extraeServicios($ruta);

			// $excel = imprimeValoresPrueba($ruta);
			// return;

			// print_r($excel);
			// return;

      //Borra el archivo despues de leer
      unlink($ruta);

      // validaciones
      if($excel == FALSE) {

        $respuesta = array(
          "error" => TRUE,
          "message" => "El archivo no se ha podido leer, es posible que esté dañado o no tenga el formato correspondiente.",
          "status" => 200, //manda 200 y no 404 para que valide el ajax el error
          "data" => NULL
        );

      } else {

        // Inserta los registros a la BD
        $tot = 0;
        foreach ($excel as $row) {
          $tot++;
          $nuevo = $this->db->insert('servicio', array(
            "codigo_cliente" => $codigo_cliente,
            "fecha_servicio" => $row['fecha_servicio'],
						"hora_entrada" => $row['hora_entrada'],
						"hora_salida" => $row['hora_salida'],
						"nombre_ruta" => $row['nombre_ruta']
          ));
          $id_serv = $this->db->insert_id();
          foreach ($row['paradas'] as $parada) {

						if (strpos($parada['tipo_parada'], 'ENTRADA') !== FALSE) {
		          $this->db->query("UPDATE servicio SET estatus_entrada = 'PENDIENTE' WHERE idreg = '".$id_serv."';");
		        }
						if (strpos($parada['tipo_parada'], 'SALIDA') !== FALSE) {
		          $this->db->query("UPDATE servicio SET estatus_salida = 'PENDIENTE' WHERE idreg = '".$id_serv."';");
		        }

						$qSQL = $this->db->query("SELECT nombre_solicitante, alias_lugar FROM cat_personal_clientes WHERE codigo_cliente = '".$codigo_cliente."' AND numero_nomina = '".$parada['idnomina']."';");

						if ($qSQL && $qSQL->num_rows() > 0) {
							$insert = $this->db->insert('rutas_servicio', array(
								"idservicio" => $id_serv,
	              "nombre_solicitante" => $qSQL->row_array(0)['nombre_solicitante'],
	              "idnomina" => $parada['idnomina'],
	              "alias_lugar" => $qSQL->row_array(0)['alias_lugar'],
								"tipo_parada" => $parada['tipo_parada'],
	              "hora_recoleccion_entrada" => $parada['hora_recoleccion_entrada'],
								"hora_recoleccion_salida" => $parada['hora_recoleccion_salida']
	            ));
						}
          }
					// crea log del servicio agregado
					// if ($codigo_usuario == NULL) {
					// 	$tipo = 'CLIENTE';
					// 	$codigo = $codigo_cliente;
					// } else {
					// 	$tipo = 'ADMIN';
					// 	$codigo = $codigo_usuario;
					// }
					// $log = $this->db->insert('log_servicios', array(
					// 	"idservicio" => $id_serv,
					// 	"estatus" => 'PENDIENTE',
					// 	"codigo_usuario" => $codigo,
					// 	"tipo_usuario" => $tipo,
					// 	"notas" => 'CREADO CORRECTAMENTE'
					// ));
        }

        $respuesta = array(
          "error" => FALSE,
          "message" => "Los servicios fueron importados correctamente",
          "status" => 200, //manda 200 y no 404 para que valide el ajax el error
          "data" => array(
            "total" => $tot
          )
        );

      }
    }

    $this->response($respuesta, $respuesta['status']);

	}








	public function empleados_post($codigo_cliente) {

    //Configura el Upload
    $config['upload_path']          = './uploads/';
    $config['allowed_types']        = 'xlsx';
    $config['max_size']             = 2048; //Kb
    $config['multi']                = 'all';

    $this->load->library('upload', $config);

    //Ejecuta la carga y valida
    if (!$this->upload->do_upload('files')) {
        $respuesta = array(
            "error" => TRUE,
            "message" => "El archivo no se ha cargado correctamente",
            "status" => 200, //manda 200 y no 404 para que valide el ajax el error
            "data" => array(
              "reporte" => $this->upload->display_errors(),
              "archivo" => "N/D"
            )
        );
    } else {
      $archivo = $this->upload->data()['file_name'];
      $ruta = $config['upload_path'].$archivo;


      // aqui extrae los registros del archivo  - helper xlsx
      $this->load->helper('xlsx');
      $excel = extraeEmpleados($ruta);

      //Borra el archivo despues de leer
      unlink($ruta);

      // validaciones
      if($excel == FALSE) {

        $respuesta = array(
          "error" => TRUE,
          "message" => "El archivo no se ha podido leer, es posible que esté dañado o no tenga el formato correspondiente.",
          "status" => 200, //manda 200 y no 404 para que valide el ajax el error
          "data" => NULL
        );

      } else {

        // Inserta los registros a la BD
        $tot = 0;
        foreach ($excel as $row) {
          $tot++;
					$coords = explode(",", $row['ubicacion']);
					$geometry = "GeometryFromText('POINT(".$coords[1]." ".$coords[0].")')";
					$nuevo = $this->db->query("
						INSERT INTO cat_personal_clientes(codigo_cliente, nombre_solicitante, numero_nomina, alias_lugar, telefono_solicitante, domicilio, ubicacion)
						VALUES(
							'$codigo_cliente',
							'".$row['nombre_solicitante']."',
							'".$row['numero_nomina']."',
							'".$row['alias_lugar']."',
							'".$row['telefono']."',
							'".$row['domicilio']."',
							".$geometry."
						);
					");
					// crea log del servicio agregado
					// if ($codigo_usuario == NULL) {
					// 	$tipo = 'CLIENTE';
					// 	$codigo = $codigo_cliente;
					// } else {
					// 	$tipo = 'ADMIN';
					// 	$codigo = $codigo_usuario;
					// }
					// $log = $this->db->insert('log_servicios', array(
					// 	"idservicio" => $id_serv,
					// 	"estatus" => 'PENDIENTE',
					// 	"codigo_usuario" => $codigo,
					// 	"tipo_usuario" => $tipo,
					// 	"notas" => 'CREADO CORRECTAMENTE'
					// ));
        }

        $respuesta = array(
          "error" => FALSE,
          "message" => "Los servicios fueron importados correctamente",
          "status" => 200, //manda 200 y no 404 para que valide el ajax el error
          "data" => array(
            "total" => $tot
          )
        );

      }
    }

    $this->response($respuesta, $respuesta['status']);

	}

}
