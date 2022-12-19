<?php
defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('sendPushAll'))
{
    function sendPushAll($title, $message) {

      // Accion especifica del push
      $params = array(
  			'action' => 'value'
  		);


      // Imagen existe
      $url_img = 'http://plataforma.aguileramotors.com/assets/images/aguilera_motors.png';
      if (!$fp = curl_init($url_img))
        $img = null;
      else
        $img = $url_img;


      //Arma la notificacion
    	$notificacion = array(
    		'app_id' => APP_ID,
    		'included_segments' => array('All'),
    		'headings' => array( 'en' => $title ),
    		'contents' => array( 'en' => $message ),
    		'data' => $params,
    		'small_icon' => 'ic_stat_onesignal_default',
    		'large_icon' => $img,
    		'android_accent_color' => '1B447D',
    		'android_led_color' => '1B447D'
      );

      $payload = json_encode($notificacion);

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
      curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json; charset=utf-8',
          'Authorization: Basic '.API_KEY
      ));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($ch, CURLOPT_HEADER, FALSE);
      curl_setopt($ch, CURLOPT_POST, TRUE);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

      $res = curl_exec($ch);
      curl_close($ch);

    	$res = json_decode($res, true);

      if (array_key_exists("errors", $res)) {
        // notificacion con errores no enviada
        return FALSE;
      } else {
        // notificacion enviada correctamente
        return TRUE;
      }

    }
}

if ( ! function_exists('sendPushPlayers'))
{
    function sendPushPlayers($title, $message, $arrPlayers = array()) {

      if (count($arrPlayers) == 0) {
        return FALSE;
      }

      // Accion especifica del push
      $params = array(
  			'action' => 'value'
  		);


      // Imagen existe
      $url_img = 'http://plataforma.aguileramotors.com/assets/images/aguilera_motors.png';
      if (!$fp = curl_init($url_img))
        $img = null;
      else
        $img = $url_img;


      //Arma la notificacion
    	$notificacion = array(
    		'app_id' => APP_ID,
    		'include_player_ids' => $arrPlayers,
    		'headings' => array( 'en' => $title ),
    		'contents' => array( 'en' => $message ),
    		'data' => $params,
    		'small_icon' => 'ic_stat_onesignal_default',
    		'large_icon' => $img,
    		'android_accent_color' => '1B447D',
    		'android_led_color' => '1B447D'
      );

      $payload = json_encode($notificacion);

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
      curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json; charset=utf-8',
          'Authorization: Basic '.API_KEY
      ));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($ch, CURLOPT_HEADER, FALSE);
      curl_setopt($ch, CURLOPT_POST, TRUE);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

      $res = curl_exec($ch);
      curl_close($ch);

    	$res = json_decode($res, true);

      if (array_key_exists("errors", $res)) {
        // notificacion con errores no enviada
        return FALSE;
      } else {
        // notificacion enviada correctamente
        return TRUE;
      }

    }
}

if ( ! function_exists('sendTest'))
{
    function sendTest() {

      // Accion especifica del push
      $params = array(
  			'action' => 'value'
  		);


      // Imagen existe
      $url_img = 'http://plataforma.aguileramotors.com/assets/images/aguilera_motors.png';
      if (!$fp = curl_init($url_img))
        $img = null;
      else
        $img = $url_img;


      //Arma la notificacion
    	$notificacion = array(
    		'app_id' => APP_ID,
    		'included_segments' => array('TEST'),
    		'headings' => array( 'en' => 'Notificación de prueba' ),
    		'contents' => array( 'en' => 'Este es un mensaje de prueba para los usuarios marcados como TEST USERS desde el dashboard del servidor.' ),
    		'data' => $params,
    		'small_icon' => 'ic_stat_onesignal_default',
    		'large_icon' => $img,
    		'android_accent_color' => '1B447D',
    		'android_led_color' => '1B447D'
      );

      $payload = json_encode($notificacion);

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
      curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'Content-Type: application/json; charset=utf-8',
          'Authorization: Basic '.API_KEY
      ));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
      curl_setopt($ch, CURLOPT_HEADER, FALSE);
      curl_setopt($ch, CURLOPT_POST, TRUE);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

      $res = curl_exec($ch);
      curl_close($ch);

    	$res = json_decode($res, true);

      if (array_key_exists("errors", $res)) {
        // notificacion con errores no enviada
        return FALSE;
      } else {
        // notificacion enviada correctamente
        return TRUE;
      }

    }
}
