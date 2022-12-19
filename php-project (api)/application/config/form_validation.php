<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$config = array(

        'usuario_insert' => array(
          //array('field' => 'idreg', 'label' => 'ID', 'rules' => 'required|integer'),
          //array('field' => 'codigo_usuario', 'label' => 'CODE', 'rules' => 'required'),
          array('field' => 'nombres', 'label' => 'nombres', 'rules' => 'required'),
          array('field' => 'apellidos', 'label' => 'apellidos', 'rules' => 'required'),
          array('field' => 'correo_electronico', 'label' => 'correo', 'rules' => 'required'),
          array('field' => 'contrasena', 'label' => 'contraseña', 'rules' => 'required'),
          array('field' => 'estatus', 'label' => 'estatus', 'rules' => 'required'),
        ),
        'usuario_update' => array(
          //array('field' => 'idreg', 'label' => 'ID', 'rules' => 'required|integer'),
          array('field' => 'codigo_usuario', 'label' => 'CODE', 'rules' => 'required'),
          array('field' => 'nombres', 'label' => 'nombres', 'rules' => 'required'),
          array('field' => 'apellidos', 'label' => 'apellidos', 'rules' => 'required'),
          array('field' => 'correo_electronico', 'label' => 'correo', 'rules' => 'required'),
          array('field' => 'contrasena', 'label' => 'contraseña', 'rules' => 'required'),
          array('field' => 'estatus', 'label' => 'estatus', 'rules' => 'required'),
        ),

        'conductor_insert' => array(
          //array('field' => 'idreg', 'label' => 'ID', 'rules' => 'required|integer'),
          //array('field' => 'codigo_conductor', 'label' => 'CODE', 'rules' => 'required'),
          array('field' => 'nombres', 'label' => 'nombres', 'rules' => 'required'),
          array('field' => 'apellidos', 'label' => 'apellidos', 'rules' => 'required'),
          array('field' => 'correo_electronico', 'label' => 'correo', 'rules' => 'required'),
          array('field' => 'contrasena', 'label' => 'contraseña', 'rules' => 'required'),
          array('field' => 'estatus', 'label' => 'estatus', 'rules' => 'required'),
          array('field' => 'fecha_licencia', 'label' => 'licencia', 'rules' => 'required'),
          array('field' => 'fecha_movilidad', 'label' => 'movilidad', 'rules' => 'required'),
          array('field' => 'fecha_poliza', 'label' => 'poliza', 'rules' => 'required'),
        ),
        'conductor_update' => array(
          //array('field' => 'idreg', 'label' => 'ID', 'rules' => 'required|integer'),
          array('field' => 'codigo_conductor', 'label' => 'CODE', 'rules' => 'required'),
          array('field' => 'nombres', 'label' => 'nombres', 'rules' => 'required'),
          array('field' => 'apellidos', 'label' => 'apellidos', 'rules' => 'required'),
          array('field' => 'correo_electronico', 'label' => 'correo', 'rules' => 'required'),
          array('field' => 'estatus', 'label' => 'estatus', 'rules' => 'required'),
          array('field' => 'fecha_licencia', 'label' => 'licencia', 'rules' => 'required'),
          array('field' => 'fecha_movilidad', 'label' => 'movilidad', 'rules' => 'required'),
          array('field' => 'fecha_poliza', 'label' => 'poliza', 'rules' => 'required'),
        ),

        'cliente_insert' => array(
          //array('field' => 'idreg', 'label' => 'ID', 'rules' => 'required|integer'),
          //array('field' => 'codigo_cliente', 'label' => 'CODE', 'rules' => 'required'),
          array('field' => 'nombre_empresa', 'label' => 'empresa', 'rules' => 'required'),
          array('field' => 'usuario_acceso', 'label' => 'usuario', 'rules' => 'required'),
          array('field' => 'contrasena', 'label' => 'contrasena', 'rules' => 'required'),
        ),
        'cliente_update' => array(
          //array('field' => 'idreg', 'label' => 'ID', 'rules' => 'required|integer'),
          array('field' => 'codigo_cliente', 'label' => 'CODE', 'rules' => 'required'),
          array('field' => 'nombre_empresa', 'label' => 'empresa', 'rules' => 'required'),
          array('field' => 'usuario_acceso', 'label' => 'usuario', 'rules' => 'required'),
          array('field' => 'contrasena', 'label' => 'contrasena', 'rules' => 'required'),
        ),

        'viaje_insert' => array(
          //array('field' => 'idreg', 'label' => 'ID', 'rules' => 'required|integer'),
          array('field' => 'codigo_cliente', 'label' => 'cliente', 'rules' => 'required'),
          array('field' => 'fecha_servicio', 'label' => 'fecha', 'rules' => 'required'),
          array('field' => 'hora_entrada', 'label' => 'hora entrada', 'rules' => 'required'),
          array('field' => 'hora_salida', 'label' => 'hora salida', 'rules' => 'required'),
          array('field' => 'nombre_ruta', 'label' => 'ruta', 'rules' => 'required'),
        ),
        'viaje_update' => array(
          array('field' => 'idreg', 'label' => 'ID', 'rules' => 'required|integer'),
          array('field' => 'codigo_cliente', 'label' => 'cliente', 'rules' => 'required'),
          array('field' => 'fecha_servicio', 'label' => 'fecha', 'rules' => 'required'),
          array('field' => 'hora_entrada', 'label' => 'hora entrada', 'rules' => 'required'),
          array('field' => 'hora_salida', 'label' => 'hora salida', 'rules' => 'required'),
          array('field' => 'nombre_ruta', 'label' => 'ruta', 'rules' => 'required'),
        ),


);
